import { Ticket } from "../tickets/type";

export type List = {
  id: string,
  title: string,
  color: string,
  order: number,
  tickets: Ticket[]
};