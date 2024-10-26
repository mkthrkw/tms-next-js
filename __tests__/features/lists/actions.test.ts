import { updateList, createList, deleteList } from '@/features/lists/actions';
import { fetchDelete, fetchPatch, fetchPost } from '@/util/fetch/methods';
import { ListSchemaType } from '@/features/lists/schema';
import { ActionState } from '@/types/actionType';

// モック化
jest.mock('@/util/fetch/methods', () => ({
  fetchDelete: jest.fn(),
  fetchPatch: jest.fn(),
  fetchPost: jest.fn(),
}));

describe('List actions test', () => {
  const prevState: ActionState = { state: 'pending', message: '' };

  beforeEach(() => {
    jest.clearAllMocks();  // テスト間でモックをリセット
  });

  describe('updateList', () => {
    test('updateList: resolved', async () => {
      // モックの設定
      (fetchPatch as jest.Mock).mockResolvedValue(undefined);
      // テストデータ
      const inputValues: ListSchemaType = { title: 'New Title', color: 'blue' };
      const listId = '123';
      // updateListの実行
      const result = await updateList(prevState, inputValues, listId);
      // fetchPatchが正しく呼ばれているか確認
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/lists/123/',
        hasToken: true,
        params: { title: 'New Title', color: 'blue' },
      });
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('updateList: rejected', async () => {
      // モックでエラー返却設定
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Patch failed'));
      // テストデータ
      const inputValues: ListSchemaType = { title: 'New Title', color: 'blue' };
      const listId = '123';
      // updateListの実行
      const result = await updateList(prevState, inputValues, listId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Patch failed');
    });
  });

  describe('createList', () => {
    test('createList: resolved', async () => {
      // モックの設定
      (fetchPost as jest.Mock).mockResolvedValue({});
      // テストデータ
      const inputValues: ListSchemaType = { title: 'New List', color: 'red' };
      const projectId = 'project-1';
      // createListの実行
      const result = await createList(prevState, inputValues, projectId);
      // fetchPostが正しく呼ばれているか確認
      expect(fetchPost as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/lists/',
        hasToken: true,
        params: { title: 'New List', color: 'red', project: 'project-1' },
      });
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });
  
    test('createList: rejected', async () => {
      // モックでエラー返却設定
      (fetchPost as jest.Mock).mockRejectedValue(new Error('Post failed'));
      // テストデータ
      const inputValues: ListSchemaType = { title: 'New List', color: 'red' };
      const projectId = 'project-1';
      // createListの実行
      const result = await createList(prevState, inputValues, projectId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Post failed');
    });
  });

  describe('deleteList', () => {
    test('deleteList: resolved', async () => {
      // モックの設定
      (fetchDelete as jest.Mock).mockResolvedValue({});
      // テストデータ
      const listId = 'list-1';
      // deleteListの実行
      const result = await deleteList(prevState, listId);
  
      // fetchDeleteが正しく呼ばれているか確認
      expect(fetchDelete as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/lists/list-1',
        hasToken: true,
        params: undefined,
      });
  
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('deleteList: rejected', async () => {
      // モックでエラー返却設定
      (fetchDelete as jest.Mock).mockRejectedValue(new Error('Delete failed'));
      // テストデータ
      const listId = 'list-1';
      // deleteListの実行
      const result = await deleteList(prevState, listId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Delete failed');
    });
  });
});