import {
  GetUserResponse,
  PostUserResponse,
  PutUserRequest,
  PutUserResponse,
} from '@y-celestial/pollux-service';
import http from 'src/util/http';

export const activateUser = async () => {
  const res = await http.post<PostUserResponse>('user', {
    headers: { ['x-api-timestamp']: Date.now() },
  });
  localStorage.setItem('token', res.data.token);

  return res.data;
};

export const getUser = async (token: string) => {
  const res = await http.get<GetUserResponse>('user', { headers: { ['x-api-token']: token } });

  return res.data;
};

export const transferDevice = async (token: string) => {
  const res = await http.get<GetUserResponse>('user', { headers: { ['x-api-token']: token } });

  localStorage.setItem('token', token);

  return res.data;
};

export const editNickname = async (data: PutUserRequest) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error();
  await http.put<PutUserResponse, PutUserRequest>('user', {
    data,
    headers: { ['x-api-token']: token },
  });
};
