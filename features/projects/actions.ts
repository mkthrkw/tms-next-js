'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ActionState } from "./type";
import { ProjectSchemaType } from "./schema";
import { uploadImage } from "@/lib/cloudinary/actions";
import { List } from "../lists/type";


function baseProjectAction(func: Function, prevState: ActionState, url: string, params: any) {
  try {
    func({
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


export async function createProject(prevState: ActionState, inputValues: ProjectSchemaType) {
  const url = '/tms/projects/';
  const params = {
    name: inputValues.name,
    description: inputValues.description,
  }
  return baseProjectAction(fetchPost, prevState, url, params);
}


export async function updateProject(prevState: ActionState, projectId:string, inputValues: ProjectSchemaType) {
  const url = `/tms/projects/${projectId}/`;
  const params = {
    name: inputValues.name,
    description: inputValues.description,
  }
  return baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectAvatar(prevState: ActionState, projectId: string, fileData: string) {
  const results = await uploadImage(fileData, projectId);
  const url = `/tms/projects/${projectId}/`;
  const params = {
    image_url: results.secure_url,
  }
  return baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectTicketOrder(prevState: ActionState, projectId: string, lists: List[]) {
  const url = `/tms/patch-ticket-order/${projectId}/`;
  const params = {
    lists: lists,
  }
  return baseProjectAction(fetchPatch, prevState, url, params);
}


export async function updateProjectListOrder(prevState: ActionState, projectId: string, lists: List[]) {
  const url = `/tms/patch-list-order/${projectId}/`;
  const params = {
    lists: lists,
  }
  return baseProjectAction(fetchPatch, prevState, url, params);
}


export async function deleteProject(prevState: ActionState, projectId: string) {
  const url = `/tms/projects/${projectId}`;
  const params = undefined;
  return baseProjectAction(fetchDelete, prevState, url, params);
}


export async function getProjects() {
  try{
    return await fetchGet({
      url: '/tms/projects',
      hasToken: true,
    });
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
    return await fetchGet({
      url: `/tms/get-nested-project/${projectId}/`,
      hasToken: true,
    });
  } catch (error) {
    console.error(error);
  }
}