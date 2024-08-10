'use server';

import { getNextPath, removeNextPath } from "@/util/cookies/next-path";
import { setToken, getRefreshToken, setRefreshToken, removeToken, removeRefreshToken } from "@/util/cookies/token";
import { getLoginCustomErrorMessage, getRefreshLoginCustomErrorMessage } from "@/util/fetch/error-message";
import { fetchPost } from "@/util/fetch/methods";
import { redirect } from "next/navigation";
import { AuthSchema } from "./schema";

export type State = {
  state: 'pending' | 'resolved' | 'rejected', // pending:未処理 | resolved:成功 | rejected:失敗
  message: string,
};

export async function login(prevState: State ,data: AuthSchema) {
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
    setRefreshToken(response.refresh);
    prevState.state = 'resolved';
    return prevState;
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    prevState.state = 'rejected';
    return prevState;
  }
}


export async function refreshLogin(prevState: State) {

  const refreshToken = getRefreshToken();
  const refreshLoginCustomErrorMessage = getRefreshLoginCustomErrorMessage();
  console.log(refreshToken);
  if (!refreshToken) {
    prevState.state = 'rejected';
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
    prevState.state = 'resolved';
    return prevState;
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    prevState.state = 'rejected';
    return prevState;
  }
}

export async function logout(prevState: State) {
  removeToken();
  removeRefreshToken();
  redirect('/login');
}

export async function redirectToNextPath() {
  const nextPath = getNextPath() ?? '/nextodo';
  removeNextPath();
  redirect(String(nextPath));
}
