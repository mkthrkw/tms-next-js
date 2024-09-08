"use server";

import { uploadImage } from "@/lib/cloudinary/actions";
import {fetchGet, fetchPatch} from "@/util/fetch/methods";
import { ActionState } from "./type";
import { UserSchemaType } from "./schema";

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


export async function updateUser(prevState: ActionState, inputValues: UserSchemaType){
  try{
    await fetchPatch({
      url: '/auth/user/',
      hasToken: true,
      params: {
        email: inputValues.email,
        name: inputValues.name,
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


export async function updateUserAvatar(prevState: ActionState, userId:string, fileData: string) {
  const results = await uploadImage(fileData, userId);
  try{
    await fetchPatch({
      url: '/auth/user/',
      hasToken: true,
      params: {
        image_url: results.secure_url,
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