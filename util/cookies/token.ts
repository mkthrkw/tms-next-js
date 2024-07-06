import { cookies } from "next/headers";

// ========== access token ==========
export function getTokenSetProps(value: string) {
  return {
    name: "token",
    value: btoa(String(value)),
    maxAge: Number(process.env.TOKEN_MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
}

export function getTokenRemoveProps() {
  return {
    name: "token",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
}

export function setToken(value: string) {
  cookies().set(getTokenSetProps(value));
}

export function removeToken() {
  cookies().set(getTokenRemoveProps());
}

export function getToken() {
  const token = cookies().get('token')?.value;
  if(token) return atob(String(token));
}


// ========== refresh token ==========
export function getRefreshTokenSetProps(value: string) {
  return {
    name: "refreshToken",
    value: btoa(String(value)),
    maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
}

export function getRefreshTokenRemoveProps() {
  return {
    name: "refreshToken",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
}

export function setRefreshToken(value: string) {
  cookies().set(getRefreshTokenSetProps(value));
}

export function removeRefreshToken() {
  cookies().set(getRefreshTokenRemoveProps());
}

export function getRefreshToken() {
  const refreshToken = cookies().get('refreshToken')?.value;
  if(refreshToken) return atob(String(refreshToken));
}