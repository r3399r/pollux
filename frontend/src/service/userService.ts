import {
  GetUserResponse,
  PostUserResponse,
  PutUserRequest,
  PutUserResponse,
} from '@y-celestial/pollux-service';
import { saveToken } from 'src/redux/authSlice';
import { dispatch, getState } from 'src/redux/store';
import http from 'src/util/http';

export const activateUser = async () => {
  const res = await http.post<PostUserResponse>('user', {
    headers: { ['x-api-timestamp']: Date.now() },
  });
  dispatch(saveToken(res.data.token));
};

export const getUser = async () => {
  const token = getState().auth.token ?? 'xx';
  const res = await http.get<GetUserResponse>('user', { headers: { ['x-api-token']: token } });

  return res.data;
};

export const transferDevice = async (token: string) => {
  const res = await http.get<GetUserResponse>('user', { headers: { ['x-api-token']: token } });
  dispatch(saveToken(token));

  return res.data;
};

export const editNickname = async (data: PutUserRequest) => {
  const token = getState().auth.token ?? 'xx';
  await http.put<PutUserResponse, PutUserRequest>('user', {
    data,
    headers: { ['x-api-token']: token },
  });
};
