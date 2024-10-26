'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { TicketSchemaType } from "./schema";
import { ActionState } from "@/types/actionType";


async function baseTicketAction(func: Function, prevState: ActionState, url: string, params: any) {
  try {
    await func({
      url: url,
      hasToken: true,
      params: params,
    });
    prevState.state = 'resolved';
    return prevState;
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    prevState.state = 'rejected';
    return prevState;
  }
}

export async function updateTicket(
  prevState: ActionState,
  params: Partial<TicketSchemaType>,
  ticketId: string,
) {
  const url = `/tms/tickets/${ticketId}/`;
  return await baseTicketAction(fetchPatch, prevState, url, params);
}

export async function updateTicketCompleted(
  prevState: ActionState,
  completed: boolean,
  ticketId: string
) {
  const url = `/tms/tickets/${ticketId}/`;
  const params = { completed: completed };
  return await baseTicketAction(fetchPatch, prevState, url, params);
}


export async function deleteTicket(prevState: ActionState, ticketId: string) {
  const url = `/tms/tickets/${ticketId}/`;
  const params = undefined;
  return await baseTicketAction(fetchDelete, prevState, url, params);
}

export async function createTicket(
  prevState: ActionState,
  inputValues: TicketSchemaType,
  listId: string
) {
  const url = `/tms/tickets/`;
  const params = {
    title: inputValues.title,
    list: listId,
  }
  return await baseTicketAction(fetchPost, prevState, url, params);
}

export async function getTicketNestedData(ticketId: string) {
  try{
    const ticketNestedData = await fetchGet({
      url: `/tms/tickets/${ticketId}/`,
      hasToken: true,
    });
    ticketNestedData.comments.reverse();
    return ticketNestedData;
  } catch (error) {
    console.error(error);
  }
}
