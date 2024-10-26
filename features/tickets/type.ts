import { Comment } from "../comments/type";

export type Ticket = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  from_period: Date,
  to_period: Date,
  order: number,
  display_id: number,
};

export type TicketNestedData = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  from_period: Date,
  to_period: Date,
  order: number,
  display_id: number,
  created_at: Date,
  updated_at: Date,
  comments: Comment[],
};
