'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ActionState } from "./type";
import { CommentSchemaType } from "./schema";

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

export async function updateComment(prevState: ActionState, commentId: string, inputValues: CommentSchemaType) {
  const url = `/tms/comments/${commentId}/`;
  const params = {
    text: inputValues.text,
  }
  return baseTicketAction(fetchPatch, prevState, url, params);
}

export async function deleteComment(prevState: ActionState, commentId: string) {
  const url = `/tms/comments/${commentId}/`;
  const params = undefined;
  return baseTicketAction(fetchDelete, prevState, url, params);
}

export async function createComment(prevState: ActionState, ticketId: string, inputValues: CommentSchemaType) {
  const url = `/tms/comments/`;
  const params = {
    text: inputValues.text,
    ticket: ticketId,
  }
  return baseTicketAction(fetchPost, prevState, url, params);
}
