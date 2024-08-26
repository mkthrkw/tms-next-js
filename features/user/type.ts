export type ActionState = {
  state: 'pending' | 'resolved' | 'rejected', // pending:未処理 | resolved:成功 | rejected:失敗
  message: string,
};

export type User = {
  id: string,
  email: string,
  name: string,
  image_url: string,
  last_login: Date,
  created_at: Date,
  updated_at: Date,
};
