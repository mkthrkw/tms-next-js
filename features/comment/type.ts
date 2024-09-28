export type ActionState = {
  state: 'pending' | 'resolved' | 'rejected', // pending:未処理 | resolved:成功 | rejected:失敗
  message: string,
};

export type Comment = {
  id: string,
  text: string,
  created_at: Date,
};