import { cookies } from "next/headers";

export function getNextPathSetProps(value: string) {
  return {
    name: "nextPath",
    value: value,
  };
}

export function getNextPathRemoveProps() {
  return {
    name: "nextPath",
    value: "",
    maxAge: 0,
  };
}

export function setNextPath(value: string) {
  cookies().set(getNextPathSetProps(value));
}

export function removeNextPath() {
  cookies().set(getNextPathRemoveProps());
}

export function getNextPath() {
  return cookies().get('nextPath')?.value;
}
