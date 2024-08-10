export function getLoginCustomErrorMessage(): { [key: number]: string } {
  return {
    400: "無効なリクエストです。",
    401: "メールアドレスまたはパスワードが間違っています。",
  };
}

export function getRefreshLoginCustomErrorMessage(): { [key: number]: string } {
  return {
    400: "無効なリクエストです。",
    401: "自動ログイン出来ませんでした。EmailとPasswordを入力してログインしてください",
  };
}
