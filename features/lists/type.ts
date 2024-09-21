import { Ticket } from "../tickets/type";

export type ActionState = {
  state: 'pending' | 'resolved' | 'rejected', // pending:未処理 | resolved:成功 | rejected:失敗
  message: string,
};

export type List = {
  id: string,
  title: string,
  color: string,
  order: number,
  tickets: Ticket[]
};