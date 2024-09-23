'use server';

import { fetchDelete, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ListSchemaType } from "./schema";
import { ActionState } from "./type";


function baseListAction(func: Function, prevState: ActionState, url: string, params: any) {
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


export async function updateList(prevState: ActionState, listId: string, inputValues: ListSchemaType) {
  const url = `/tms/lists/${listId}/`;
  const params = {
    title: inputValues.title,
    color: inputValues.color,
  };
  return baseListAction(fetchPatch, prevState, url, params);
}

export async function createList(prevState: ActionState, projectId: string, inputValues: ListSchemaType) {
  const url = `/tms/lists/`;
  const params = {
    title: inputValues.title,
    color: inputValues.color,
    project: projectId,
  };
  return baseListAction(fetchPost, prevState, url, params);
}

export async function deleteList(prevState: ActionState, listId: string) {
  const url = `/tms/lists/${listId}`;
  const params = undefined;
  return baseListAction(fetchDelete, prevState, url, params);
}