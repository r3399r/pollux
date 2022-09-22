import { GetBankResponse, PostBankRequest, PostBankResponse } from '@y-celestial/pollux-service';
import http from 'src/util/http';
import { getToken } from './userService';

export const createBank = async (data: PostBankRequest) => {
  const token = getToken();
  await http.post<PostBankResponse, PostBankRequest>('bank', {
    headers: { ['x-api-token']: token },
    data,
  });
};

export const getBank = async () => {
  const token = getToken();
  const res = await http.get<GetBankResponse>('bank', {
    headers: { ['x-api-token']: token },
  });

  return res.data;
};

export const getBankDetail = async (id: string) => {
  const token = getToken();
  const res = await http.get<any>(`bank/${id}`, {
    headers: { ['x-api-token']: token },
  });
  console.log(res.data);

  return res.data;
};

export const deleteBank = async (id: string) => {
  const token = getToken();
  await http.delete(`bank/${id}`, { headers: { ['x-api-token']: token } });
};
