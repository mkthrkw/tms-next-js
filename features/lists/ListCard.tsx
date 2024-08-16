import TicketCard from "../tickets/TicketCard";
import { Ticket } from "../tickets/type";
import { List } from "./type";


export default function ListCard({ list }: { list: List }) {
  return (
    <div className="flex-none w-screen lg:w-72 px-2 lg:px-0">
      <div className="bg-base-100 shadow-xl min-h-[88vh] lg:min-h-full rounded-xl p-2">
        <h2 className="text-xl mb-2 border-b-2 border-base-content/50">{list.title}</h2>
        {/* List of tickets */}
        <div className="grid grid-cols-1 gap-2">
          {list.tickets.map((ticket:Ticket) => {
            return (
              <TicketCard ticket={ticket} />
            );
          })}
        </div>
      </div>
    </div>
  );
}