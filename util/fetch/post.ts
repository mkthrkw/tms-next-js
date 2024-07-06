import 'server-only';
import { getToken } from '../cookies/token';

type Props = {
  url: string,
  hasToken?: boolean,
  params?: object,
  customErrorMessage?: { [key: number]: string },
};

type FetchProps = {
  method: string,
  headers: {
    'Content-Type': string,
    'Authorization'?: string,
  },
  body?: string,
};

export default async function fetchPost({ url, hasToken = false, params = undefined, customErrorMessage = {} }: Props) {
  
  let fetchProps: FetchProps = {
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

  const response = await fetch(process.env.BACKEND_API_SERVER_URL + url, fetchProps);
  if (!response.ok) {
    if(response.status in customErrorMessage) {
      throw new Error(customErrorMessage[response.status]);
    };
    throw new Error(response.statusText);
  };
  return await response.json();
}