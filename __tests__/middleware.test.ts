import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '@/middleware';
import { getToken, getRefreshToken, getTokenSetProps, getRefreshTokenSetProps } from '@/util/cookies/token';
import { getNextPathSetProps } from '@/util/cookies/next-path';
import { refreshLogin } from '@/features/auth/actions';

jest.mock('@/util/cookies/token', () => ({
  getToken: jest.fn(),
  getRefreshToken: jest.fn(),
  getTokenSetProps: jest.fn(),
  getRefreshTokenSetProps: jest.fn(),
}));

jest.mock('@/util/cookies/next-path', () => ({
  getNextPathSetProps: jest.fn(),
}));

jest.mock('@/features/auth/actions', () => ({
  refreshLogin: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({ cookies: { set: jest.fn() } })),
    redirect: jest.fn(() => ({ cookies: { set: jest.fn() } })),
  },
}));

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // 各テスト後にモックをリセット
  });

  test('トークンが存在する場合、次のミドルウェアに進む', async () => {
    (getToken as jest.Mock).mockReturnValue('valid-token');

    const request = {} as NextRequest;
    const response = await middleware(request);

    expect(getToken).toHaveBeenCalled();
    expect(NextResponse.next).toHaveBeenCalled();
    expect(response).toStrictEqual({ cookies: { set: expect.any(Function) } });
  });

  test('リフレッシュトークンがある場合、トークンを再取得してセットする', async () => {
    (getToken as jest.Mock).mockReturnValue(null);  // トークンは無い
    (getRefreshToken as jest.Mock).mockReturnValue('refresh-token');
    (refreshLogin as jest.Mock).mockResolvedValue({ access: 'new-access-token', refresh: 'new-refresh-token' });

    const request = {} as NextRequest;
    const response = await middleware(request);

    expect(getRefreshToken).toHaveBeenCalled();
    expect(refreshLogin).toHaveBeenCalledWith('refresh-token');
    expect(NextResponse.next).toHaveBeenCalled();
    expect(response.cookies.set).toHaveBeenCalledWith(getTokenSetProps('new-access-token'));
    expect(response.cookies.set).toHaveBeenCalledWith(getRefreshTokenSetProps('new-refresh-token'));
  });

  test('トークンもリフレッシュトークンも無い場合、ログイン画面へリダイレクト', async () => {
    (getToken as jest.Mock).mockReturnValue(null);
    (getRefreshToken as jest.Mock).mockReturnValue(null);

    const request = {
      nextUrl: { pathname: '/nextodo/test' },
      url: 'http://localhost/nextodo/test'
    } as NextRequest;
    const response = await middleware(request);

    expect(getToken).toHaveBeenCalled();
    expect(getRefreshToken).toHaveBeenCalled();
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', request.url));
    expect(response.cookies.set).toHaveBeenCalledWith(getNextPathSetProps('/nextodo/tasks'));
  });
});