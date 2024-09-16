import { Ticket } from "../../tickets/type";
import { List } from "../type";
import { TicketCard } from "../../tickets/TicketCard";
import { Sortable } from "@/lib/dnd_kit/Sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { Droppable } from "@/lib/dnd_kit/Droppable";

export function ListCard({ list }: { list: List }) {

  return (
    <div className="flex-none w-screen lg:w-72 px-2 lg:px-0">
      <Sortable key={list.id} id={list.id}>
        <div className="bg-base-300 shadow-md rounded-xl p-2">
          <h2 className="text-xl mb-2 border-b-2 border-base-content/50">{list.title}</h2>
          <SortableContext items={list.tickets} key={list.id} id={list.id}>
            <Droppable key={list.id} id={list.id}>
              <div className="min-h-[80vh] flex flex-col gap-2">
                {list.tickets.map((ticket:Ticket) => (
                  <Sortable key={ticket.id} id={ticket.id}>
                    <TicketCard ticket={ticket} />
                  </Sortable>
                ))}
              </div>
            </Droppable>
          </SortableContext>
        </div>
      </Sortable>
    </div>
  );
}