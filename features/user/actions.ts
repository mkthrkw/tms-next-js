import {fetchGet} from "@/util/fetch/methods";

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