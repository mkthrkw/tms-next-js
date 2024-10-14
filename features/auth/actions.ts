'use server';

import { getNextPath, removeNextPath } from "@/util/cookies/next-path";
import { setToken, setRefreshToken, removeToken, removeRefreshToken } from "@/util/cookies/token";
import { getLoginCustomErrorMessage } from "@/util/fetch/error-message";
import { fetchPost } from "@/util/fetch/methods";
import { redirect } from "next/navigation";
import { AuthSchemaType } from "./schema";
import { ActionState } from "./type";

export async function login(prevState: ActionState ,data: AuthSchemaType) {
  try {
    const response = await fetchPost({
      url: '/auth/token/',
      params: {
        email: data.email,
        password: data.password,
      },
      customErrorMessage: getLoginCustomErrorMessage(),
    });
    setToken(response.access);
    if(data.rememberMe) {
      setRefreshToken(response.refresh);
    }
    prevState.state = 'resolved';
    return prevState;
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    prevState.state = 'rejected';
    return prevState;
  }
}


export async function refreshLogin(refreshToken: string) {
  try {
    const response = await fetchPost({
      url: '/auth/token/refresh/',
      params: {
        refresh: refreshToken,
      },
    });
    return response;
  } catch (error: any) {
    return false;
  }
}

export async function logout(prevState: ActionState) {
  removeToken();
  removeRefreshToken();
  redirect('/login');
}

export async function redirectToNextPath() {
  const nextPath = await getNextPath() ?? '/nextodo';
  await removeNextPath();
  redirect(String(nextPath));
}
