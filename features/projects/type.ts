import { List } from "../lists/type";

export type ProjectNestedData = {
  id: string,
  name: string,
  description: string,
  image_url: string,
  order: number,
  lists: List[]
};

export type ProjectParams = {
  projectId: string
};

export type ProjectDetail = {
  id: string,
  name: string,
  description: string,
  image_url: string,
  order: number,
}
