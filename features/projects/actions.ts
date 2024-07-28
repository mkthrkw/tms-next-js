'use server';

import fetchGet from "@/util/fetch/get";
import fetchPost from "@/util/fetch/post";

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
      url: '/tms/projects/' + projectId + '/',
      hasToken: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export type State = {
  message: string,
};

export async function createProject(prevState: State, formData: FormData): Promise<State> {
  try {
    await fetchPost({
      url: '/tms/projects/',
      hasToken: true,
      params: {
        name: formData.get('name'),
        description: formData.get('description'),
      },
      customErrorMessage: {},
    });
    prevState.message = 'success';
    return prevState;
  }catch (error) {
    console.error(error);
    prevState.message = 'error';
    return prevState;
  }
}