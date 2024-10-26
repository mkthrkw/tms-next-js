import { cookies } from "next/headers";
import {
  getTokenSetProps,
  getTokenRemoveProps,
  setToken,
  removeToken,
  getToken,
  getRefreshTokenSetProps,
  getRefreshTokenRemoveProps,
  setRefreshToken,
  removeRefreshToken,
  getRefreshToken,
} from "@/util/cookies/token";
import { decodeBase64, encodeBase64 } from "@/util/common/base64";

// モックを作成
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

const mockCookies = {
  set: jest.fn(),
  get: jest.fn(),
};

(cookies as jest.Mock).mockReturnValue(mockCookies);

describe("Token utilities", () => {
  afterEach(() => {
    jest.clearAllMocks();  // 各テスト後にモックをリセット
  });


  // ========== access token ==========
  test("setToken: with set props", async () => {
    const token = "my-token";
    await setToken(token);

    expect(mockCookies.set).toHaveBeenCalledWith({
      name: "token",
      value: encodeBase64(token),
      maxAge: Number(process.env.TOKEN_MAX_AGE),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  });

  test("removeToken: with remove props", async () => {
    await removeToken();

    expect(mockCookies.set).toHaveBeenCalledWith({
      name: "token",
      value: "",
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  });

  test("getToken: return decoded token", async () => {
    const encodedToken = encodeBase64("my-token");
    mockCookies.get.mockReturnValue({ value: encodedToken });

    const result = await getToken();

    expect(mockCookies.get).toHaveBeenCalledWith("token");
    expect(result).toBe("my-token");
  });

  test("getToken: return undefined", async () => {
    mockCookies.get.mockReturnValue(undefined);

    const result = await getToken();

    expect(mockCookies.get).toHaveBeenCalledWith("token");
    expect(result).toBeUndefined();
  });


  // ========== refresh token ==========
  test("setRefreshToken: with set props", async () => {
    const refreshToken = "my-refresh-token";
    await setRefreshToken(refreshToken);

    expect(mockCookies.set).toHaveBeenCalledWith({
      name: "refreshToken",
      value: encodeBase64(refreshToken),
      maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  });

  test("removeRefreshToken: with remove props", async () => {
    await removeRefreshToken();

    expect(mockCookies.set).toHaveBeenCalledWith({
      name: "refreshToken",
      value: "",
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  });

  test("getRefreshToken: decoded refresh token", async () => {
    const encodedRefreshToken = encodeBase64("my-refresh-token");
    mockCookies.get.mockReturnValue({ value: encodedRefreshToken });

    const result = await getRefreshToken();

    expect(mockCookies.get).toHaveBeenCalledWith("refreshToken");
    expect(result).toBe("my-refresh-token");
  });

  test("getRefreshToken: return undefined", async () => {
    mockCookies.get.mockReturnValue(undefined);

    const result = await getRefreshToken();

    expect(mockCookies.get).toHaveBeenCalledWith("refreshToken");
    expect(result).toBeUndefined();
  });
});