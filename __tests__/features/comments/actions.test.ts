import {
  updateComment,
  deleteComment,
  createComment,
} from '@/features/comments/actions';  // コメント関連のアクションファイルをインポート
import { fetchDelete, fetchPatch, fetchPost } from '@/util/fetch/methods';  // fetchメソッドをモック化
import { CommentSchemaType } from '@/features/comments/schema';
import { ActionState } from '@/types/actionType';

// モック化
jest.mock('@/util/fetch/methods', () => ({
  fetchDelete: jest.fn(),
  fetchPatch: jest.fn(),
  fetchPost: jest.fn(),
}));

describe('Comment actions test', () => {
  const prevState: ActionState = { state: 'pending', message: '' };

  beforeEach(() => {
    jest.clearAllMocks();  // 各テストの前にモックをリセット
  });

  describe('updateComment', () => {
    test('updateComment: resolved', async () => {
      // fetchPatchが成功した場合の設定
      (fetchPatch as jest.Mock).mockResolvedValue(undefined);
      
      // テストデータ
      const inputValues: CommentSchemaType = { text: 'Updated Comment' };
      const commentId = '123';
      
      // updateCommentの実行
      const result = await updateComment(prevState, inputValues, commentId);
      
      // fetchPatchが正しく呼ばれているか確認
      expect(fetchPatch).toHaveBeenCalledWith({
        url: '/tms/comments/123/',
        hasToken: true,
        params: { text: 'Updated Comment' },
      });
      
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('updateComment: rejected', async () => {
      // fetchPatchが失敗した場合の設定
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Patch failed'));
      
      // テストデータ
      const inputValues: CommentSchemaType = { text: 'Updated Comment' };
      const commentId = '123';
      
      // updateCommentの実行
      const result = await updateComment(prevState, inputValues, commentId);
      
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Patch failed');
    });
  });

  describe('deleteComment', () => {
    test('deleteComment: resolved', async () => {
      // fetchDeleteが成功した場合の設定
      (fetchDelete as jest.Mock).mockResolvedValue(undefined);
      
      // テストデータ
      const commentId = 'comment-1';
      
      // deleteCommentの実行
      const result = await deleteComment(prevState, commentId);
      
      // fetchDeleteが正しく呼ばれているか確認
      expect(fetchDelete).toHaveBeenCalledWith({
        url: '/tms/comments/comment-1/',
        hasToken: true,
        params: undefined,
      });
      
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('deleteComment: rejected', async () => {
      // fetchDeleteが失敗した場合の設定
      (fetchDelete as jest.Mock).mockRejectedValue(new Error('Delete failed'));
      
      // テストデータ
      const commentId = 'comment-1';
      
      // deleteCommentの実行
      const result = await deleteComment(prevState, commentId);
      
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Delete failed');
    });
  });

  describe('createComment', () => {
    test('createComment: resolved', async () => {
      // fetchPostが成功した場合の設定
      (fetchPost as jest.Mock).mockResolvedValue({});
      
      // テストデータ
      const inputValues: CommentSchemaType = { text: 'New Comment' };
      const ticketId = 'ticket-1';
      
      // createCommentの実行
      const result = await createComment(prevState, inputValues, ticketId);
      
      // fetchPostが正しく呼ばれているか確認
      expect(fetchPost).toHaveBeenCalledWith({
        url: '/tms/comments/',
        hasToken: true,
        params: { text: 'New Comment', ticket: 'ticket-1' },
      });
      
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('createComment: rejected', async () => {
      // fetchPostが失敗した場合の設定
      (fetchPost as jest.Mock).mockRejectedValue(new Error('Post failed'));
      
      // テストデータ
      const inputValues: CommentSchemaType = { text: 'New Comment' };
      const ticketId = 'ticket-1';
      
      // createCommentの実行
      const result = await createComment(prevState, inputValues, ticketId);
      
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Post failed');
    });
  });
});