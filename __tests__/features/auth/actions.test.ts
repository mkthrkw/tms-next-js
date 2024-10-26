import { login, refreshLogin, logout, redirectToNextPath } from '@/features/auth/actions';
import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/util/cookies/token';
import { getNextPath, removeNextPath } from '@/util/cookies/next-path';
import { fetchPost } from '@/util/fetch/methods';
import { redirect } from 'next/navigation';
import { ActionState } from '@/features/auth/type';
import { AuthSchemaType } from '@/features/auth/schema';

jest.mock('@/util/fetch/methods', () => ({
  fetchPost: jest.fn(),
}));

jest.mock('@/util/cookies/token', () => ({
  setToken: jest.fn(),
  setRefreshToken: jest.fn(),
  removeToken: jest.fn(),
  removeRefreshToken: jest.fn(),
}));

jest.mock('@/util/cookies/next-path', () => ({
  getNextPath: jest.fn(),
  removeNextPath: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/util/fetch/error-message', () => ({
  getLoginCustomErrorMessage: jest.fn(() => ({
    400:'custom error message'
  })),
}));

describe('Auth actions tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const prevState: ActionState = { state: 'pending', message: '' };
    const data: AuthSchemaType = { email: 'test@example.com', password: 'password123', rememberMe: true };

    test('ログイン成功時にトークンがセットされる', async () => {
      (fetchPost as jest.Mock).mockResolvedValue({ access: 'access-token', refresh: 'refresh-token' });

      const result = await login(prevState, data);

      expect(fetchPost).toHaveBeenCalledWith({
        url: '/auth/token/',
        params: { email: data.email, password: data.password },
        customErrorMessage: {400:'custom error message'},
      });
      expect(setToken).toHaveBeenCalledWith('access-token');
      expect(setRefreshToken).toHaveBeenCalledWith('refresh-token');
      expect(result.state).toBe('resolved');
    });

    test('rememberMeがfalseの時はリフレッシュトークンはセットされない', async () => {
      (fetchPost as jest.Mock).mockResolvedValue({ access: 'access-token', refresh: 'refresh-token' });
      data['rememberMe'] = false;
      const result = await login(prevState, data);
      expect(setToken).toHaveBeenCalledWith('access-token');
      expect(setRefreshToken).not.toHaveBeenCalled();
      expect(result.state).toBe('resolved');
    });

    test('ログインエラーが発生した場合にエラーメッセージが返される', async () => {
      const error = new Error('Login failed');
      (fetchPost as jest.Mock).mockRejectedValue(error);

      const result = await login(prevState, data);

      expect(fetchPost).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Login failed');
    });
  });

  describe('refreshLogin', () => {
    const refreshToken = 'refresh-token';

    test('リフレッシュログイン成功時にレスポンスが返される', async () => {
      const newToken = { access: 'new-access-token', refresh: 'new-refresh-token' };
      (fetchPost as jest.Mock).mockResolvedValue(newToken);

      const response = await refreshLogin(refreshToken);

      expect(fetchPost).toHaveBeenCalledWith({
        url: '/auth/token/refresh/',
        params: { refresh: refreshToken },
      });
      expect(response).toEqual(newToken);
    });

    test('リフレッシュログイン失敗時はfalseを返す', async () => {
      (fetchPost as jest.Mock).mockRejectedValue(new Error('Refresh failed'));

      const response = await refreshLogin(refreshToken);

      expect(fetchPost).toHaveBeenCalled();
      expect(response).toEqual(false);
    });
  });

  describe('logout', () => {
    const prevState: ActionState = { state: 'pending', message: '' };

    test('ログアウト時にトークンが削除されてリダイレクトされる', async () => {
      await logout(prevState);

      expect(removeToken).toHaveBeenCalled();
      expect(removeRefreshToken).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('/login');
    });
  });

  describe('redirectToNextPath', () => {
    test('nextPathが存在する場合にリダイレクトされる', async () => {
      (getNextPath as jest.Mock).mockReturnValue('/dashboard');

      await redirectToNextPath();

      expect(getNextPath).toHaveBeenCalled();
      expect(removeNextPath).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('/dashboard');
    });

    test('nextPathがない場合はデフォルトパスにリダイレクトされる', async () => {
      (getNextPath as jest.Mock).mockReturnValue(undefined);

      await redirectToNextPath();

      expect(getNextPath).toHaveBeenCalled();
      expect(removeNextPath).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('/nextodo');
    });
  });
});