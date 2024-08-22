'use server';

import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "@/util/fetch/methods";
import { ActionState } from "./type";
import { ProjectSchemaType } from "./schema";
import { uploadImage } from "@/util/cloudinary/actions";


export async function createProject(prevState: ActionState, inputValues: ProjectSchemaType) {
  try {
    await fetchPost({
      url: '/tms/projects/',
      hasToken: true,
      params: {
        name: inputValues.name,
        description: inputValues.description,
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


export async function updateProject(prevState: ActionState, projectId:string, inputValues: ProjectSchemaType) {
  try {
    await fetchPatch({
      url: `/tms/projects/${projectId}/`,
      hasToken: true,
      params: {
        name: inputValues.name,
        description: inputValues.description,
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


export async function updateProjectAvatar(prevState: ActionState, projectId: string, fileData: string) {
  try {
    const results = await uploadImage(fileData, projectId);
    await fetchPatch({
      url: `/tms/projects/${projectId}/`,
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
