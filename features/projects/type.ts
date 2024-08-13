import { List } from "../lists/type";

export type ActionState = {
  state: 'pending' | 'resolved' | 'rejected', // pending:未処理 | resolved:成功 | rejected:失敗
  message: string,
};

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
