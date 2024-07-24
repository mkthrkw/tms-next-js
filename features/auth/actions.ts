'use server';

import { getNextPath, removeNextPath } from "@/util/cookies/next-path";
import { setToken, getRefreshToken, setRefreshToken } from "@/util/cookies/token";
import { getLoginCustomErrorMessage, getRefreshLoginCustomErrorMessage } from "@/util/fetch/error-message";
import fetchPost from "@/util/fetch/post";
import { redirect } from "next/navigation";

export type State = {
  message: string,
};

export async function login(prevState: State ,formData: FormData): Promise<State> {

  try {
    const response = await fetchPost({
      url: '/auth/token/',
      params: {
        email: formData.get('email'),
        password: formData.get('password'),
      },
      customErrorMessage: getLoginCustomErrorMessage(),
    });
    setToken(response.access);
    setRefreshToken(response.refresh);
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    return prevState;
  }

  const nextPath = getNextPath() ?? '/nextodo';
  removeNextPath();
  redirect(String(nextPath));
}


export async function refreshLogin(prevState: State): Promise<State> {

  const refreshToken = getRefreshToken();
  const refreshLoginCustomErrorMessage = getRefreshLoginCustomErrorMessage();
  if (!refreshToken) {
    prevState.message = refreshLoginCustomErrorMessage[401] ?? 'エラーが発生しました。';
    return prevState;
  }
  
  try {
    const response = await fetchPost({
      url: '/auth/token/refresh/',
      params: {
        refresh: refreshToken,
      },
      customErrorMessage: refreshLoginCustomErrorMessage,
    });
    setToken(response.access);
    setRefreshToken(response.refresh);
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    return prevState;
  }

  const nextPath = getNextPath() ?? '/nextodo';
  removeNextPath();
  redirect(String(nextPath));
}