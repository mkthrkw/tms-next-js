"use server";
import { cookies } from "next/headers";
import { decodeBase64, encodeBase64 } from "@/util/common/base64";


// ========== access token ==========
export async function getTokenSetProps(value: string) {
  return {
    name: "token",
    value: encodeBase64(String(value)),
    maxAge: Number(process.env.TOKEN_MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'lax' as 'lax',
  };
}

export async function getTokenRemoveProps() {
  return {
    name: "token",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as 'lax',
  };
}

export async function setToken(value: string) {
  cookies().set(await getTokenSetProps(value));
}

export async function removeToken() {
  cookies().set(await getTokenRemoveProps());
}

export async function getToken() {
  const token = cookies().get('token')?.value;
  if(token) return decodeBase64(String(token));
}


// ========== refresh token ==========
export async function getRefreshTokenSetProps(value: string) {
  return {
    name: "refreshToken",
    value: encodeBase64(String(value)),
    maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'lax' as 'lax',
  };
}

export async function getRefreshTokenRemoveProps() {
  return {
    name: "refreshToken",
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'lax' as 'lax',
  };
}

export async function setRefreshToken(value: string) {
  cookies().set(await getRefreshTokenSetProps(value));
}

export async function removeRefreshToken() {
  cookies().set(await getRefreshTokenRemoveProps());
}

export async function getRefreshToken() {
  const refreshToken = cookies().get('refreshToken')?.value;
  if(refreshToken) return decodeBase64(String(refreshToken));
}