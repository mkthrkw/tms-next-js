'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { TicketSchemaType } from "./schema";
import { ActionState } from "./type";


function baseTicketAction(func: Function, prevState: ActionState, url: string, params: any) {
  try {
    func({
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

export async function updateTicketTitle(prevState: ActionState, ticketId: string, title: string) {
  const url = `/tms/tickets/${ticketId}/`;
  const params = {
    title: title,
  }
  return baseTicketAction(fetchPatch, prevState, url, params);
}

export async function updateTicketDescription(prevState: ActionState, ticketId: string, description: string) {
  const url = `/tms/tickets/${ticketId}/`;
  const params = {
    description: description,
  }
  return baseTicketAction(fetchPatch, prevState, url, params);
}

export async function deleteTicket(prevState: ActionState, ticketId: string) {
  const url = `/tms/tickets/${ticketId}/`;
  const params = undefined;
  return baseTicketAction(fetchDelete, prevState, url, params);
}

export async function createTicket(prevState: ActionState, listId: string, inputValues: TicketSchemaType) {
  const url = `/tms/tickets/`;
  const params = {
    title: inputValues.title,
    list: listId,
  }
  return baseTicketAction(fetchPost, prevState, url, params);
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
