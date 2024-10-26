import { fetchGet, fetchPost, fetchPatch, fetchDelete } from '@/util/fetch/methods'; // テスト対象
import { getToken } from '@/util/cookies/token'; // getTokenのモック対象

// getTokenをモック化
jest.mock('@/util/cookies/token', () => ({
  getToken: jest.fn(),
}));


describe('Test fetch functions', () => {

  const mockFetch = jest.fn(); // fetchのモックを作成
  beforeEach(() => {
    global.fetch = mockFetch; // 各テスト前にfetchをモック化
  });
  afterEach(() => {
    jest.clearAllMocks();  // 各テスト後にモックをリセット
  });

  test('[fetch]GET: Tokenなし', async () => {
    // fetchのモックレスポンス
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: '[fetch]GET: without token' }),
      body: true,
    });

    const result = await fetchGet({
      url: '/test-url',
      hasToken: false,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      process.env.BACKEND_API_SERVER_URL + '/test-url',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    expect(result).toEqual({ data: '[fetch]GET: without token' });
  });

  test('[fetch]GET: Tokenあり', async () => {
    (getToken as jest.Mock).mockReturnValue('mock-token'); // トークンのモック

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: '[fetch]GET: with token' }),
      body: true,
    });

    const result = await fetchGet({
      url: '/test-url',
      hasToken: true,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      process.env.BACKEND_API_SERVER_URL + '/test-url',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token',
        },
      }
    );
    expect(result).toEqual({ data: '[fetch]GET: with token' });
  });

  test('[fetch]POST', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: '[fetch]POST' }),
      body: true,
    });

    const result = await fetchPost({
      url: '/test-url',
      hasToken: false,
      params: { key: 'value' },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      process.env.BACKEND_API_SERVER_URL + '/test-url',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'value' }),
      }
    );
    expect(result).toEqual({ data: '[fetch]POST' });
  });

  test('[fetch]PATCH', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: '[fetch]PATCH' }),
      body: true,
    });

    const result = await fetchPatch({
      url: '/test-url',
      hasToken: false,
      params: { key: 'value' },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      process.env.BACKEND_API_SERVER_URL + '/test-url',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'value' }),
      }
    );
    expect(result).toEqual({ data: '[fetch]PATCH' });
  });

  test('[fetch]DELETE', async () => {
    (getToken as jest.Mock).mockReturnValue('mock-token');

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: '[fetch]DELETE' }),
      body: true,
    });

    const result = await fetchDelete({
      url: '/test-url',
      hasToken: true,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      process.env.BACKEND_API_SERVER_URL + '/test-url',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token',
        },
      }
    );
    expect(result).toEqual({ data: '[fetch]DELETE' });
  });

  test('エラー時はカスタムエラーを投げる：カスタムメッセージあり', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(
      fetchGet({
        url: '/test-url',
        hasToken: false,
        customErrorMessage: { 404: 'Custom Not Found' },
      })
    ).rejects.toThrow('Custom Not Found');
  });

  test('エラー時はカスタムエラーを投げる：カスタムメッセージなし', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(
      fetchGet({
        url: '/test-url',
        hasToken: false,
      })
    ).rejects.toThrow('Not Found');
  });

});