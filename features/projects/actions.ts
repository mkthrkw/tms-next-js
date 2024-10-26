'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ProjectDetail } from "./type";
import { ProjectSchemaType } from "./schema";
import { uploadImage } from "@/lib/cloudinary/actions";
import { List } from "../lists/type";
import { ActionState } from "@/types/actionType";


async function baseProjectAction(func: Function, prevState: ActionState, url: string, params: any) {
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


export async function createProject(
  prevState: ActionState,
  inputValues: ProjectSchemaType
) {
  const url = '/tms/projects/';
  const params = {
    name: inputValues.name,
    description: inputValues.description,
  }
  return await baseProjectAction(fetchPost, prevState, url, params);
}


export async function updateProject(
  prevState: ActionState,
  inputValues: ProjectSchemaType,
  projectId: string
) {
  const url = `/tms/projects/${projectId}/`;
  const params = {
    name: inputValues.name,
    description: inputValues.description,
  }
  return await baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectAvatar(
  prevState: ActionState,
  fileString: string,
  id: string
) {
  const results = await uploadImage(fileString, id);
  console.log(results);
  const url = `/tms/projects/${id}/`;
  const params = {
    image_url: results.secure_url,
  }
  return await baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectTicketOrder(
  prevState: ActionState,
  lists: List[],
  projectId: string,
) {
  lists.reverse().map((list) => {
    list.tickets.reverse().map((ticket, index) => {
      ticket.order = index;
    });
  });
  const url = `/tms/patch-ticket-order/${projectId}/`;
  const params = {
    lists: lists,
  }
  return await baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectListOrder(
  prevState: ActionState,
  lists: List[],
  projectId: string
) {
  lists.reverse().map((list, index) => {
    list.order = index;
  });
  const url = `/tms/patch-list-order/${projectId}/`;
  const params = {
    lists: lists,
  }
  return await baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectsOrder(
  prevState: ActionState,
  projects: ProjectDetail[]
) {
  projects.reverse().map((project, index) => {
    project.order = index;
  });
  const url = `/tms/patch-project-order/`;
  const params = {
    projects: projects,
  }
  return await baseProjectAction(fetchPatch, prevState, url, params);
}


export async function deleteProject(
  prevState: ActionState,
  projectId: string
) {
  const url = `/tms/projects/${projectId}`;
  const params = undefined;
  return await baseProjectAction(fetchDelete, prevState, url, params);
}


export async function getProjects() {
  try{
    const projects = await fetchGet({
      url: '/tms/projects',
      hasToken: true,
    });
    return projects.reverse();
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectDetail(projectId: string) {
  try{
    return await fetchGet({
      url: `/tms/projects/${projectId}/`,
      hasToken: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectNestedData(projectId: string) {
  try{
    const getProjectNestedData = await fetchGet({
      url: `/tms/get-nested-project/${projectId}/`,
      hasToken: true,
    });
    getProjectNestedData.lists.reverse().map((list: List) => {
      list.tickets.reverse();
    });
    return getProjectNestedData;
  } catch (error) {
    console.error(error);
  }
}