'use server';

import { fetchPatch } from "@/util/fetch/methods";
import { ListSchemaType } from "./schema";
import { ActionState } from "./type";


export async function updateList(prevState: ActionState, listId:string, inputValues: ListSchemaType) {
  try {
    fetchPatch({
      url: `/tms/lists/${listId}/`,
      hasToken: true,
      params: {
        title: inputValues.title,
        color: inputValues.color,
      },
    });
    prevState.state = 'resolved';
    return prevState;
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    prevState.state = 'rejected';
    return prevState;
  }
}