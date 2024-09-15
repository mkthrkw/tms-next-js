import { List } from "@/features/lists/type";
import { updateProjectListOrder, updateProjectTicketOrder } from "@/features/projects/actions";
import { ActionState, ProjectNestedData } from "@/features/projects/type";
import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "react-toastify";


export function getMovedTicketsSameContainer(
  event: { active: Active; over: Over | null },
  projectNestedData: ProjectNestedData,
) {
  const moveData = getMoveData(event);
  if(!moveData) return;
  const {from, to} = moveData;
  if(from.containerId !== to.containerId) return;
  if (!from || !to) return;

  return projectNestedData.lists.find((list) => {
    if(list.id === from.containerId){
      list.tickets = arrayMove(list.tickets, from.index, to.index);
      list.tickets = list.tickets.map((ticket, index) => {
        ticket.order = index;
        return ticket;
      });
      return list;
    };
  });
}

export function getMovedTicketsOtherContainer(
  event: { active: Active; over: Over | null },
  projectNestedData: ProjectNestedData,
) {
  const moveData = getMoveData(event);
  if(!moveData) return;
  const {from, to} = moveData;
  if (!from || !to) return;
  if(from.containerId === to.containerId) return;
  if(to.containerId === projectNestedData.id){
    to.containerId = event.over?.id;
    to.index = NaN;
    to.items = NaN;
  }

  const fromList = projectNestedData.lists.find((list) => list.id === from.containerId);
  if(!fromList) return;
  const toList = projectNestedData.lists.find((list) => list.id === to.containerId);
  if(!toList) return;
  const moveTicket = fromList.tickets[from.index];

  fromList.tickets = arrayRemove(fromList.tickets, from.index);
  fromList.tickets = fromList.tickets.map((ticket, index) => {
    ticket.order = index;
    return ticket;
  });
  toList.tickets = arrayInsert(toList.tickets, to.index, moveTicket);
  toList.tickets = toList.tickets.map((ticket, index) => {
    ticket.order = index;
    return ticket;
  });

  return {fromList, toList};
}

export function getMovedLists(
  event: { active: Active; over: Over | null },
  lists: List[],
) {
  const moveData = getMoveData(event);
  if(!moveData) return;
  const {from, to} = moveData;
  if (!from || !to) return;
  const movedLists = arrayMove(lists, from.index, to.index);
  return movedLists.map((list, index) => {
    list.order = index;
    return list;
  });
}


export function getMoveData(event: { active: Active; over: Over | null }) {
  const {active, over} = event;
  // キャンセルされた、もしくはターゲットがない場合はリターン
  if(!active || !over) return;
  // ドラッグアイテムとターゲットが同じ場合はリターン
  if(active.id === over.id) return;
  // activeのデータを取得
  const fromData = active.data.current?.sortable;
  if(!fromData) return;
  // overのデータを取得
  const toData = over.data.current?.sortable;
  // データを返す
  return {
    from: fromData,
    to: toData,
  };
}

export function arrayRemove<T>(array: T[], index: number): T[] {
  return array.filter((_, i) => i !== index);
}
export function arrayInsert<T>(array: T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index)];
}


export async function updateMovedTickets(movedLists:List[], project_id:string) {
  const initialState:ActionState = {
    state: 'pending',
    message: '',
  }
  const result = await updateProjectTicketOrder(initialState, project_id, movedLists);
  if (result.state === 'rejected') {
    toast.error(result.message);
  }
}

export async function updateMovedLists(movedLists:List[], project_id:string) {
  const initialState:ActionState = {
    state: 'pending',
    message: '',
  }
  const result = await updateProjectListOrder(initialState, project_id, movedLists);
  if (result.state === 'rejected') {
    toast.error(result.message);
  }
}