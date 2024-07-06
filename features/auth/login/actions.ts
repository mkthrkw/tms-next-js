'use server';

import { getNextPath, removeNextPath } from "@/util/cookies/next-path";
import { setRefreshToken, setToken } from "@/util/cookies/token";
import { getLoginCustomErrorMessage } from "@/util/fetch/error-message";
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