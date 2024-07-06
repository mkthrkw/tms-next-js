export function getLoginCustomErrorMessage(): { [key: number]: string } {
  return {
    400: "無効なリクエストです。",
    401: "メールアドレスまたはパスワードが間違っています。",
  };
}

export function getRefreshLoginCustomErrorMessage(): { [key: number]: string } {
  return {
    400: "無効なリクエストです。",
    401: "再ログイン出来ませんでした。この画面を閉じてEmailとPasswordを入力してログインしてください",
  };
}
