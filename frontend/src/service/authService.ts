import {
  PostRegisterRequest,
  PostResendRequest,
  PostVerifyRequest,
} from '@y-celestial/pollux-service';
import { AxiosError } from 'axios';
import http from 'src/util/http';

export const register = async (data: PostRegisterRequest) => {
  try {
    await http.post('auth/register', { data });
  } catch (err) {
    const message = (err as AxiosError).response?.data?.message;
    switch (message) {
      case 'An account with the given email already exists.':
        throw '此 email 已註冊';
      case 'Password did not conform with policy: Password not long enough':
        throw '密碼長度需至少 8 碼';
      case 'Password did not conform with policy: Password must have lowercase characters':
        throw '密碼需含有小寫英文字母';
      case 'Password did not conform with policy: Password must have uppercase characters':
        throw '密碼需含有大寫英文字母';
      case 'Password did not conform with policy: Password must have numeric characters':
        throw '密碼需含有數字';
      default:
        throw '請聯繫客服';
    }
  }
};

export const resend = async (data: PostResendRequest) => {
  try {
    await http.post('auth/resend', { data });
  } catch (err) {
    const message = (err as AxiosError).response?.data?.message;
    switch (message) {
      case 'Username/client id combination not found.':
        throw '此 email 未註冊過';
      default:
        throw '請聯繫客服';
    }
  }
};

export const verify = async (data: PostVerifyRequest) => {
  try {
    await http.post('auth/verify', { data });
  } catch (err) {
    const message = (err as AxiosError).response?.data?.message;
    console.log(message);
    switch (message) {
      case 'Invalid verification code provided, please try again.':
        throw '錯誤的認證碼，請重試';
      case 'User cannot be confirmed. Current status is CONFIRMED':
        throw '此 email 已認證';
      default:
        throw '請聯繫客服';
    }
  }
};
