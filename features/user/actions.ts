"use server";

import { uploadImage } from "@/lib/cloudinary/actions";
import { fetchGet, fetchPatch } from "@/util/fetch/methods";
import { ActionState } from "@/types/actionType";
import { UserSchemaType } from "./schema";


async function baseUserAction(func: Function, prevState: ActionState, url: string, params: any) {
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


export async function updateUser(
  prevState: ActionState,
  inputValues: UserSchemaType
){
  const url = '/auth/user/';
  const params = {
    email: inputValues.email,
    name: inputValues.name,
  }
  return await baseUserAction(fetchPatch, prevState, url, params);
}


export async function updateUserAvatar(
  prevState: ActionState,
  fileString: string,
  userId: string
) {
  const results = await uploadImage(fileString, userId);
  const url = `/auth/user/`;
  const params = {
    image_url: results.secure_url,
  }
  return await baseUserAction(fetchPatch, prevState, url, params);
}


export async function getUser() {
  try{
    return await fetchGet({
      url: '/auth/user/',
      hasToken: true,
    });
  } catch (error) {
    console.error(error);
  }
}
