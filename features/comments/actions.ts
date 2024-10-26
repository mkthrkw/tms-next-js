'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ActionState } from "@/types/actionType";
import { CommentSchemaType } from "./schema";

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

export async function updateComment(
  prevState: ActionState,
  inputValues: CommentSchemaType,
  commentId: string
) {
  const url = `/tms/comments/${commentId}/`;
  const params = {
    text: inputValues.text,
  }
  return await baseTicketAction(fetchPatch, prevState, url, params);
}

export async function deleteComment(
  prevState: ActionState,
  commentId: string
) {
  const url = `/tms/comments/${commentId}/`;
  const params = undefined;
  return await baseTicketAction(fetchDelete, prevState, url, params);
}

export async function createComment(
  prevState: ActionState,
  inputValues: CommentSchemaType,
  ticketId: string
) {
  const url = `/tms/comments/`;
  const params = {
    text: inputValues.text,
    ticket: ticketId,
  }
  return await baseTicketAction(fetchPost, prevState, url, params);
}
