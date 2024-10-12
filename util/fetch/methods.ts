import 'server-only';
import { getToken } from '../cookies/token';

export type Props = {
  url: string,
  hasToken?: boolean,
  params?: object,
  customErrorMessage?: { [key: number]: string },
};

export type FetchProps = {
  method: string,
  headers: {
    'Content-Type': string,
    'Authorization'?: string,
  },
  body?: string,
};



// ===========================================
//                  Base
// ===========================================
async function fetchBase(
  fetchUrl:string,
  fetchProps:FetchProps,
  customErrorMessage: { [key: number]: string }
) {
  const response = await fetch(fetchUrl, fetchProps);
  if (!response.ok) {
    if(response.status in customErrorMessage) {
      throw new Error(customErrorMessage[response.status]);
    };
    throw new Error(response.statusText);
  };
  if(response.body){
    return await response.json();
  }
}


// ===========================================
//                   Get
// ===========================================
export async function fetchGet({
  url,
  hasToken = false,
  customErrorMessage = {},
}: Props) {
  const fetchUrl = process.env.BACKEND_API_SERVER_URL + url;
  const fetchProps: FetchProps = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (hasToken) {
    fetchProps.headers['Authorization'] = `Bearer ${getToken()}`;
  };
  return fetchBase(fetchUrl, fetchProps, customErrorMessage);
}


// ===========================================
//                   Post
// ===========================================
export async function fetchPost({
  url,
  hasToken = false,
  params = undefined,
  customErrorMessage = {},
}: Props) {
  const fetchUrl = process.env.BACKEND_API_SERVER_URL + url;
  const fetchProps: FetchProps = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (hasToken) {
    fetchProps.headers['Authorization'] = `Bearer ${getToken()}`;
  };
  if (params) {
    fetchProps.body = JSON.stringify(params);
  };
  return fetchBase(fetchUrl, fetchProps, customErrorMessage);
}


// ===========================================
//                  Patch
// ===========================================
export async function fetchPatch({
  url,
  hasToken = false,
  params = undefined,
  customErrorMessage = {},
}: Props) {
  const fetchUrl = process.env.BACKEND_API_SERVER_URL + url;
  const fetchProps: FetchProps = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (hasToken) {
    fetchProps.headers['Authorization'] = `Bearer ${getToken()}`;
  };
  if (params) {
    fetchProps.body = JSON.stringify(params);
  };
  return fetchBase(fetchUrl, fetchProps, customErrorMessage);
}


// ===========================================
//                  Delete
// ===========================================
export async function fetchDelete({
  url,
  hasToken = false,
  customErrorMessage = {},
}: Props) {
  const fetchUrl = process.env.BACKEND_API_SERVER_URL + url;
  const fetchProps: FetchProps = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (hasToken) {
    fetchProps.headers['Authorization'] = `Bearer ${getToken()}`;
  };
  return fetchBase(fetchUrl, fetchProps, customErrorMessage);
}