import { PostBankRequest, PostBankResponse } from '@y-celestial/pollux-service';
import http from 'src/util/http';
import { getToken } from './userService';

export const createBank = async (data: PostBankRequest) => {
  const token = getToken();
  await http.post<PostBankResponse, PostBankRequest>('bank', {
    headers: { ['x-api-token']: token },
    data,
  });
};
