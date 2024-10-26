import { getUser, updateUser, updateUserAvatar } from '@/features/user/actions';
import { fetchGet, fetchPatch } from '@/util/fetch/methods';
import { uploadImage } from '@/lib/cloudinary/actions';
import { ActionState } from '@/types/actionType';

// 必要なモックを作成
jest.mock('@/util/fetch/methods', () => ({
  fetchGet: jest.fn(),
  fetchPatch: jest.fn(),
}));

jest.mock('@/lib/cloudinary/actions', () => ({
  uploadImage: jest.fn(),
}));

describe('User actions tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe('updateUser', () => {
    const prevState = { state: 'pending', message: '' } as ActionState;
    const inputValues = { email: 'new@example.com', name: 'New Name' };

    test('[fetch: PATCH] resolved', async () => {

      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateUser(prevState, inputValues);

      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: '/auth/user/',
        hasToken: true,
        params: {
          email: inputValues.email,
          name: inputValues.name,
        },
      });
      expect(result.state).toBe('resolved');
    });

    test('[fetch: PATCH] rejected', async () => {
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Update failed'));

      const result = await updateUser(prevState, inputValues);

      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Update failed');
    });
  });


  describe('updateUserAvatar', () => {
    const prevState = { state: 'pending', message: '' } as ActionState;
    const userId = 'user-id';
    const fileData = 'data:image/png;base64,...';
    const mockUploadResults = { secure_url: 'https://cloudinary.com/image.png' };

    test('updateUserAvatar: resolved', async () => {
      (uploadImage as jest.Mock).mockResolvedValue(mockUploadResults);
      (fetchPatch as jest.Mock).mockResolvedValue(undefined);

      const result = await updateUserAvatar(prevState, fileData, userId);

      expect(uploadImage as jest.Mock).toHaveBeenCalledWith(fileData, userId);
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: '/auth/user/',
        hasToken: true,
        params: {
          image_url: mockUploadResults.secure_url,
        },
      });
      expect(result.state).toBe('resolved');
    });

    test('updateUserAvatar: rejected', async () => {
      (uploadImage as jest.Mock).mockResolvedValue(mockUploadResults);
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Failed to update avatar'));

      const result = await updateUserAvatar(prevState, fileData, userId);

      expect(uploadImage as jest.Mock).toHaveBeenCalled();
      expect(fetchPatch as jest.Mock).toHaveBeenCalled();
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Failed to update avatar');
    });
  });


  describe('getUser', () => {
    test('getUser: success', async () => {
      // fetchGet のモックを成功パターンに設定
      const mockUserData = { id: 'user-id', email: 'test@example.com' };
      (fetchGet as jest.Mock).mockResolvedValue(mockUserData);

      const result = await getUser();

      expect(fetchGet as jest.Mock).toHaveBeenCalledWith({
        url: '/auth/user/',
        hasToken: true,
      });
      expect(result).toEqual(mockUserData);
    });

    test('getUser: error', async () => {
      // fetchGet のモックを失敗パターンに設定
      (fetchGet as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

      // コンソールエラーが発生しないようにスパイ
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // getTicketNestedDataの実行
      const result = await getUser();
      // エラーハンドリングが正しくされているか確認
      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(new Error('Failed to fetch'));
      consoleSpy.mockRestore();
    });
  });
});