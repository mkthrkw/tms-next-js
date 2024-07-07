import 'server-only';
import { getToken } from '../cookies/token';

type Props = {
  url: string,
  hasToken?: boolean,
  customErrorMessage?: { [key: number]: string },
};

type FetchProps = {
  method: string,
  headers: {
    'Content-Type': string,
    'Authorization'?: string,
  },
};

export default async function fetchGet({ url, hasToken = false, customErrorMessage = {} }: Props) {
  
  let fetchUrl = process.env.BACKEND_API_SERVER_URL + url;
  let fetchProps: FetchProps = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (hasToken) {
    fetchProps.headers['Authorization'] = `Bearer ${getToken()}`;
  };

  const response = await fetch(fetchUrl, fetchProps);
  if (!response.ok) {
    if(response.status in customErrorMessage) {
      throw new Error(customErrorMessage[response.status]);
    };
    throw new Error(response.statusText);
  };
  return await response.json();
}