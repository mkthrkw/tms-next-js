import { randomInt } from "crypto";

type Params = {
  projectId: string
};

export default function ProjectDetail(
  { params }: { params:Params}
  ) {

    const Ticket = (num:number) => {
      return (
        <div className="w-full shadow-xl rounded-xl px-2 py-1 bg-base-content text-base-300 h-16">
          <h4 className="text-sm border-b-2 border-base-200/20">Ticket title {num}</h4>
          <p className="text-xs">Ticket description {num}</p>
        </div>
      );
    }

    const TicketList = () => {
      const tickets = [];
      for (let i = 0; i < randomInt(10); i++) {
        tickets.push(Ticket(i));
      }
      return tickets;
    }

    const List = () => {
      return (
        <div className="w-full lg:w-72 bg-base-100 shadow-xl min-h-[90vh] lg:min-h-full rounded-xl px-3 pt-2 pb-3">
          <h2 className="text-xl mb-2 border-b-2 border-base-content/50">List title!</h2>
          {/* List of tickets */}
          <div className="grid grid-cols-1 gap-2">
            <TicketList />
          </div>
        </div>
      );
    }

    const Board = () => {
      return (
        <div className="lg:inline-flex lg:gap-3 h-full">
          <List />
          <List />
          <List />
          <List />
          <List />
        </div>
      );
    }

    return (
      <div className="h-full overflow-auto px-8 lg:px-4 pt-4 pb-2">
        <Board />
      </div>
    );
  }