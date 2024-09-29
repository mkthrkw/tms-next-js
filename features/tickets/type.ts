import { Comment } from "../comment/type";

export type ActionState = {
  state: 'pending' | 'resolved' | 'rejected', // pending:未処理 | resolved:成功 | rejected:失敗
  message: string,
};

export type Ticket = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  from_period: Date,
  to_period: Date,
  order: number,
};

export type TicketNestedData = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  from_period: Date,
  to_period: Date,
  order: number,
  created_at: Date,
  updated_at: Date,
  comments: Comment[],
};
