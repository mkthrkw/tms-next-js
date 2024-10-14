"use server";
import { cookies } from "next/headers";

export async function getNextPathSetProps(value: string) {
  return {
    name: "nextPath",
    value: value,
  };
}

export async function getNextPathRemoveProps() {
  return {
    name: "nextPath",
    value: "",
    maxAge: 0,
  };
}

export async function setNextPath(value: string) {
  cookies().set(await getNextPathSetProps(value));
}

export async function removeNextPath() {
  cookies().set(await getNextPathRemoveProps());
}

export async function getNextPath() {
  return cookies().get('nextPath')?.value;
}
