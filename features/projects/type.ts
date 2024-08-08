import { List } from "../lists/type";

export type ProjectDetail = {
  id: string,
  name: string,
  description: string,
  image_url: string,
  lists: List[]
};

export type ProjectParams = {
  projectId: string
};

export type ProjectCard = {
  id: string,
  name: string,
  description: string,
  image_url: string
}
