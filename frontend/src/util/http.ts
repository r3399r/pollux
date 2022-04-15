import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
// import { reset } from 'src/redux/authSlice';
// import { dispatch } from 'src/redux/store';

type Options<D> = {
  headers?: AxiosRequestHeaders;
  data?: D;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api/',
  timeout: 5000,
};

const get = async <T, K = unknown>(url: string, params?: K) =>
  axios.request<T>({
    ...defaultConfig,
    url,
    method: 'get',
    params,
  });

const post = async <T, D>(url: string, options?: Options<D>) =>
  axios.request<T>({
    ...defaultConfig,
    ...options,
    url,
    method: 'post',
  });

const put = async <T, D>(url: string, options?: Options<D>) =>
  axios.request<T>({
    ...defaultConfig,
    ...options,
    url,
    method: 'put',
  });

export default { get, post, put };

// const authRequest = async <T>(config: AxiosRequestConfig) => {
//   try {
//     const secret = localStorage.getItem('secret');

//     return await axios.request<T>({
//       ...defaultConfig,
//       ...config,
//       headers: { 'x-api-secret': secret ?? 'zzz' },
//     });
//   } catch (e) {
//     const error = (e as AxiosError).response;
//     if (error?.data.message === 'Unauthorized') {
//       localStorage.removeItem('secret');
//       dispatch(reset());
//       throw new Error('Unauthorized');
//     }
//     throw e;
//   }
// };

// export const authGet = async <T, K = unknown>(url: string, params?: K) =>
//   await authRequest<T>({ url, params, method: 'get' });

// export const authPut = async <T, D>(url: string, data: D) =>
//   await authRequest<T>({ url, method: 'put', data });

// export const authDelete = async <T>(url: string) => await authRequest<T>({ url, method: 'delete' });
