import { Ticket } from "../tickets/type";

export type List = {
  id: string,
  title: string,
  order: number,
  tickets: Ticket[]
};