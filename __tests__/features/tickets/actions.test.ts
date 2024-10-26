import {
  updateTicket,
  updateTicketCompleted,
  deleteTicket,
  createTicket,
  getTicketNestedData
} from '@/features/tickets/actions';
import { fetchDelete, fetchPatch, fetchPost, fetchGet } from '@/util/fetch/methods';
import { TicketSchemaType } from '@/features/tickets/schema';
import { ActionState } from '@/types/actionType';

// モック化
jest.mock('@/util/fetch/methods', () => ({
  fetchDelete: jest.fn(),
  fetchPatch: jest.fn(),
  fetchPost: jest.fn(),
  fetchGet: jest.fn(),
}));

describe('Ticket actions test', () => {
  const prevState: ActionState = { state: 'pending', message: '' };

  beforeEach(() => {
    jest.clearAllMocks();  // テスト間でモックをリセット
  });

  describe('updateTicket', () => {
    test('updateTicket: resolved', async () => {
      // モックの設定
      (fetchPatch as jest.Mock).mockResolvedValue(undefined);
      // テストデータ
      const inputValues: Partial<TicketSchemaType> = { title: 'Updated Title' };
      const ticketId = '123';
      // updateTicketの実行
      const result = await updateTicket(prevState, inputValues, ticketId);
      // fetchPatchが正しく呼ばれているか確認
      expect(fetchPatch as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/tickets/123/',
        hasToken: true,
        params: { title: 'Updated Title' },
      });
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('updateTicket: rejected', async () => {
      // モックでエラー返却設定
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Patch failed'));
      // テストデータ
      const inputValues: Partial<TicketSchemaType> = { title: 'Updated Title' };
      const ticketId = '123';
      // updateTicketの実行
      const result = await updateTicket(prevState, inputValues, ticketId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Patch failed');
    });
  });

  describe('updateTicketCompleted', () => {
    test('updateTicketCompleted: resolved', async () => {
      // モックの設定
      (fetchPatch as jest.Mock).mockResolvedValue(undefined);
      // テストデータ
      const completed = true;
      const ticketId = '123';
      // updateTicketCompletedの実行
      const result = await updateTicketCompleted(prevState, completed, ticketId);
      // fetchPatchが正しく呼ばれているか確認
      expect(fetchPatch).toHaveBeenCalledWith({
        url: '/tms/tickets/123/',
        hasToken: true,
        params: { completed: true },
      });
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('updateTicketCompleted: rejected', async () => {
      // モックでエラー返却設定
      (fetchPatch as jest.Mock).mockRejectedValue(new Error('Patch failed'));
      // テストデータ
      const completed = true;
      const ticketId = '123';
      // updateTicketCompletedの実行
      const result = await updateTicketCompleted(prevState, completed, ticketId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Patch failed');
    });
  });

  describe('deleteTicket', () => {
    test('deleteTicket: resolved', async () => {
      // モックの設定
      (fetchDelete as jest.Mock).mockResolvedValue({});
      // テストデータ
      const ticketId = 'ticket-1';
      // deleteTicketの実行
      const result = await deleteTicket(prevState, ticketId);
      // fetchDeleteが正しく呼ばれているか確認
      expect(fetchDelete as jest.Mock).toHaveBeenCalledWith({
        url: '/tms/tickets/ticket-1/',
        hasToken: true,
        params: undefined,
      });
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('deleteTicket: rejected', async () => {
      // モックでエラー返却設定
      (fetchDelete as jest.Mock).mockRejectedValue(new Error('Delete failed'));
      // テストデータ
      const ticketId = 'ticket-1';
      // deleteTicketの実行
      const result = await deleteTicket(prevState, ticketId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Delete failed');
    });
  });

  describe('createTicket', () => {
    test('createTicket: resolved', async () => {
      // モックの設定
      (fetchPost as jest.Mock).mockResolvedValue({});
      // テストデータ
      const inputValues: TicketSchemaType = { title: 'New Ticket' };
      const listId = 'list-1';
      // createTicketの実行
      const result = await createTicket(prevState, inputValues, listId);
      // fetchPostが正しく呼ばれているか確認
      expect(fetchPost).toHaveBeenCalledWith({
        url: '/tms/tickets/',
        hasToken: true,
        params: { title: 'New Ticket', list: 'list-1' },
      });
      // prevStateがresolvedに変更されているか確認
      expect(result.state).toBe('resolved');
    });

    test('createTicket: rejected', async () => {
      // モックでエラー返却設定
      (fetchPost as jest.Mock).mockRejectedValue(new Error('Post failed'));
      // テストデータ
      const inputValues: TicketSchemaType = { title: 'New Ticket' };
      const listId = 'list-1';
      // createTicketの実行
      const result = await createTicket(prevState, inputValues, listId);
      // エラーハンドリングが正しくされているか確認
      expect(result.state).toBe('rejected');
      expect(result.message).toBe('Post failed');
    });
  });

  describe('getTicketNestedData', () => {
    test('getTicketNestedData: resolved', async () => {
      // モックの設定
      const mockNestedData = { comments: [{ id: 1 }, { id: 2 }, { id: 3 }] };
      (fetchGet as jest.Mock).mockResolvedValue(mockNestedData);
      // テストデータ
      const ticketId = 'ticket-1';
      // getTicketNestedDataの実行
      const result = await getTicketNestedData(ticketId);
      // fetchGetが正しく呼ばれているか確認
      expect(fetchGet).toHaveBeenCalledWith({
        url: '/tms/tickets/ticket-1/',
        hasToken: true,
      });
      // コメントが逆順になっているか確認
      expect(result.comments).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);
    });

    test('getTicketNestedData: rejected', async () => {
      // モックでエラー返却設定
      (fetchGet as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
      // テストデータ
      const ticketId = 'ticket-1';
      // コンソールエラーが発生しないようにスパイ
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // getTicketNestedDataの実行
      await getTicketNestedData(ticketId);
      // エラーハンドリングが正しくされているか確認
      expect(consoleSpy).toHaveBeenCalledWith(new Error('Fetch failed'));
      consoleSpy.mockRestore();
    });
  });
});