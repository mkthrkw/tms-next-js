'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { TicketSchemaType } from "./schema";
import { ActionState } from "./type";


async function baseTicketAction(func: Function, prevState: ActionState, url: string, params: any) {
  try {
    const response = await func({
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

export async function updateTicket(prevState: ActionState, ticketId: string, params: any) {
  const url = `/tms/tickets/${ticketId}/`;
  return await baseTicketAction(fetchPatch, prevState, url, params);
}


export async function deleteTicket(prevState: ActionState, ticketId: string) {
  const url = `/tms/tickets/${ticketId}/`;
  const params = undefined;
  return await baseTicketAction(fetchDelete, prevState, url, params);
}

export async function createTicket(prevState: ActionState, listId: string, inputValues: TicketSchemaType) {
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
