import {
  GetUserResponse,
  PostUserResponse,
  PutUserRequest,
  PutUserResponse,
} from '@y-celestial/pollux-service';
import http from 'src/util/http';

export const getToken = () => {
  const token = localStorage.getItem('token');

  if (token === null) throw new Error();

  return token;
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const activateUser = async () => {
  const res = await http.post<PostUserResponse>('user', {
    headers: { ['x-api-timestamp']: Date.now() },
  });
  setToken(res.data.token);

  return res.data;
};

export const getUser = async (token: string) => {
  const res = await http.get<GetUserResponse>('user', { headers: { ['x-api-token']: token } });

  return res.data;
};

export const transferDevice = async (token: string) => {
  const res = await http.get<GetUserResponse>('user', { headers: { ['x-api-token']: token } });

  setToken(token);

  return res.data;
};

export const editNickname = async (data: PutUserRequest) => {
  const token = getToken();
  await http.put<PutUserResponse, PutUserRequest>('user', {
    data,
    headers: { ['x-api-token']: token },
  });
};
