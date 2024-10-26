import { act, renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import { useActionHandler } from "@/hooks/useActionHandler";

// toastをモック化
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useActionHandler', () => {
  const mockAction: jest.Mock = jest.fn();
  const mockOnSuccess: jest.Mock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handleAction with id: resolved', async () => {
    mockAction.mockResolvedValue({ state: 'resolved' });

    const { result } = renderHook(() =>
      useActionHandler({
        action: mockAction,
        onSuccess: mockOnSuccess,
        onSuccessMessage: 'Action successful',
      })
    );

    // handleActionを実行
    await act(async () => {
      await result.current.handleAction({ key: 'value' }, '123');
    });

    // isSubmittingが実行後に元に戻っているか確認
    expect(result.current.isSubmitting).toBe(false);
    // actionが呼ばれたか確認
    expect(mockAction).toHaveBeenCalledWith(
      { state: 'pending', message: '' },
      { key: 'value' },
      '123'
    );
    // onSuccessが呼ばれたか確認
    expect(mockOnSuccess).toHaveBeenCalled();
    // toastの成功メッセージが表示されるか確認
    expect(toast.success).toHaveBeenCalledWith('Action successful');
  });

  test('handleAction without id: resolved', async () => {
    mockAction.mockResolvedValue({ state: 'resolved' });

    const { result } = renderHook(() =>
      useActionHandler({
        action: mockAction,
        onSuccess: mockOnSuccess,
        onSuccessMessage: 'Action successful',
      })
    );

    // handleActionを実行
    await act(async () => {
      await result.current.handleAction({ key: 'value' });
    });

    // actionが呼ばれたか確認
    expect(mockAction).toHaveBeenCalledWith(
      { state: 'pending', message: '' },
      { key: 'value' },
    );
  });

  test('handleAction: rejected', async () => {
    // 失敗時の結果をモック化
    mockAction.mockResolvedValue({ state: 'rejected', message: 'Action failed' });

    const { result } = renderHook(() =>
      useActionHandler({
        action: mockAction,
      })
    );

    // handleActionを実行
    await act(async () => {
      await result.current.handleAction({});
    });

    // isSubmittingが実行後に元に戻っているか確認
    expect(result.current.isSubmitting).toBe(false);
    // エラーメッセージが表示されるか確認
    expect(toast.error).toHaveBeenCalledWith('Action failed', { autoClose: 3000 });
  });

  test('handleAction: unexpected errors', async () => {
    // 例外が投げられた場合をモック化
    mockAction.mockRejectedValue(new Error('Unexpected error'));

    const { result } = renderHook(() =>
      useActionHandler({
        action: mockAction,
      })
    );

    // handleActionを実行
    await act(async () => {
      await result.current.handleAction({});
    });
    // isSubmittingが実行後に元に戻っているか確認
    expect(result.current.isSubmitting).toBe(false);
    // エラーメッセージが表示されるか確認
    expect(toast.error).toHaveBeenCalledWith('Unexpected error occurred', { autoClose: 3000 });
  });

  test('isSubmitting test', async () => {
      // Promiseの解決を遅らせる
      let resolveAction: (value?: unknown) => void;
      const actionPromise = new Promise((resolve) => {
        resolveAction = resolve;  // resolveActionでPromiseを後で解決できるようにする
      });
      // モック関数がPromiseを返すように設定
      mockAction.mockReturnValue(actionPromise);
    
      const { result } = renderHook(() =>
        useActionHandler({
          action: mockAction,
        })
      );
    
      // handleActionを実行し、途中でisSubmittingがtrueになるか確認
      act(() => {
        result.current.handleAction({});
      });
    
      // handleAction実行中はisSubmittingがtrueになっていることを確認
      expect(result.current.isSubmitting).toBe(true);
    
      // Promiseを手動で解決し、処理が完了する
      await act(async () => {
        resolveAction();  // モックされたactionを解決
      });
    
      // handleActionが完了した後、isSubmittingがfalseになっているか確認
      expect(result.current.isSubmitting).toBe(false);
  });

});