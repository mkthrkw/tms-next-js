import { Ticket } from "../tickets/type";

export type List = {
  id: string,
  title: string,
  tickets: Ticket[]
};