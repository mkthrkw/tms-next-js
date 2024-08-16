import { Ticket } from "./type";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="w-full shadow-xl rounded-xl px-2 py-1 bg-base-content text-base-300 h-16">
      <h4 className="text-sm border-b-2 border-base-200/20">{ticket.title}</h4>
      <p className="text-xs">{ticket.description}</p>
    </div>
  )
}