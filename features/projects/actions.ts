'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ActionState } from "./type";
import { ProjectSchemaType } from "./schema";


export async function createProject(prevState: ActionState, data: ProjectSchemaType) {
  try {
    await fetchPost({
      url: '/tms/projects/',
      hasToken: true,
      params: {
        name: data.name,
        description: data.description,
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


export async function updateProject(prevState: ActionState, projectId:string, data: ProjectSchemaType) {
  try {
    await fetchPatch({
      url: `/tms/projects/${projectId}/`,
      hasToken: true,
      params: {
        name: data.name,
        description: data.description,
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


export async function updateProjectAvatar(prevState: ActionState, projectId: string, imageId: string) {
  try {
    await fetchPatch({
      url: `/tms/projects/${projectId}/`,
      hasToken: true,
      params: {
        image_url: imageId,
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


export async function deleteProject(prevState: ActionState, projectId: string) {
  try {
    await fetchDelete({
      url: `/tms/projects/${projectId}`,
      hasToken: true,
    });
    prevState.state = 'resolved';
    return prevState;
  } catch (error: any) {
    prevState.message = error.message ?? 'エラーが発生しました。';
    prevState.state = 'rejected';
    return prevState;
  }
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
