import { act, renderHook } from "@testing-library/react";
import { useFileReaderWithAction } from '@/hooks/useFileReaderWithAction';
import { toast } from 'react-toastify';
import React from "react";

// `toast` のモック化
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('useFileReaderWithAction', () => {
  const mockHandleAction: jest.Mock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('handleChange: 正常にファイルを読み込み', async () => {

    // useRefをモック化して、inputRefがmockInputRefを返すようにする
    const file = new Blob(['file content'], { type: 'image/png' });
    const mockInputRef = {
      current: {
        files: [file]
      }
    };
    jest.spyOn(React, 'useRef').mockReturnValue(mockInputRef);

    // `FileReader` をモック化
    const mockFileReader = {
      readAsDataURL: jest.fn(() => {
        mockFileReader.onload();
      }),
      result: 'data:image/png;base64,testdata',
      onload: jest.fn(),
    };
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

    const { result } = renderHook(() =>
      useFileReaderWithAction({
        handleAction: mockHandleAction,
        id: '123',
      })
    );

    // `handleChange` を呼び出し
    await act(async () => {
      result.current.handleChange();
    });

    // `FileReader.readAsDataURL` が呼ばれたことを確認
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);

    // `handleAction` が呼ばれたことを確認
    expect(mockHandleAction).toHaveBeenCalledWith(
      'data:image/png;base64,testdata',
      '123',
    );

    // `isSubmitting` が完了後に `false` に戻ることを確認
    expect(result.current.isSubmitting).toBe(false);
  });


  test('handleChange: ファイルが選択されていない', async () => {

    const mockInputRef = {
      current: {
        files: []
      }
    };
    jest.spyOn(React, 'useRef').mockReturnValue(mockInputRef);

    const { result } = renderHook(() =>
      useFileReaderWithAction({
        handleAction: mockHandleAction,
        id: '123',
      })
    );

    // `handleChange` を呼び出し
    await act(async () => {
      result.current.handleChange();
    });

    // `handleAction` が呼ばれていないことを確認
    expect(mockHandleAction).not.toHaveBeenCalled();

    // `isSubmitting` が false に戻っていることを確認
    expect(result.current.isSubmitting).toBe(false);
  });


  test('handleChange: ファイルは選択して FileReader の読み込み失敗', async () => {

    // useRefをモック化して、inputRefがmockInputRefを返すようにする
    const file = new Blob(['file content'], { type: 'image/png' });
    const mockInputRef = {
      current: {
        files: [file]
      }
    };
    jest.spyOn(React, 'useRef').mockReturnValue(mockInputRef);

    // `FileReader` をモック化し、`result` を `null` にする
    const mockFileReader = {
      readAsDataURL: jest.fn(() => {
        mockFileReader.onload();
      }),
      result: null,
      onload: jest.fn(),
    };
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

    const { result } = renderHook(() =>
      useFileReaderWithAction({
        handleAction: mockHandleAction,
        id: '123',
      })
    );

    // `handleChange` を呼び出し
    await act(async () => {
      result.current.handleChange();
    });

    // エラートーストが呼ばれたことを確認
    expect(toast.error).toHaveBeenCalledWith('ファイルの読み込みに失敗しました。');

    // `isSubmitting` が false に戻っていることを確認
    expect(result.current.isSubmitting).toBe(false);
  });
});