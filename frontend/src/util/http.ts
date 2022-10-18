import axios, { AxiosRequestConfig, AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';

// eslint-disable-next-line
type Options<D = any, P = any> = {
  headers?: AxiosRequestHeaders;
  data?: D;
  params?: P;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api/',
  timeout: 30000,
};

const defaultHeader: RawAxiosRequestHeaders = {
  'Content-type': 'application/json',
  Accept: 'application/json',
};

// eslint-disable-next-line
const publicRequestConfig = <D = unknown, P = any>(
  method: string,
  url: string,
  options?: Options<D, P>,
) => ({
  ...defaultConfig,
  headers: {
    ...defaultHeader,
    ...options?.headers,
  },
  data: options?.data,
  params: options?.params,
  url,
  method,
});

// eslint-disable-next-line
const privateRequestConfig = <D = unknown, P = any>(
  method: string,
  url: string,
  options?: Options<D, P>,
) => ({
  ...defaultConfig,
  headers: {
    ...defaultHeader,
    ...options?.headers,
    ...({ ['x-api-code']: localStorage.getItem('token') ?? '' } as RawAxiosRequestHeaders),
  },
  data: options?.data,
  params: options?.params,
  url,
  method,
});

// eslint-disable-next-line
const get = async <T, P = any>(url: string, options?: Options<any, P>) =>
  await axios.request<T>(publicRequestConfig<unknown, P>('get', url, options));

const post = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('post', url, options));

const put = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('put', url, options));

const patch = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('patch', url, options));

const sendDelete = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('delete', url, options));

// eslint-disable-next-line
const authGet = async <T, P = any>(url: string, options?: Options<any, P>) =>
  await axios.request<T>(privateRequestConfig<unknown, P>('get', url, options));

const authPost = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(privateRequestConfig<D>('post', url, options));

const authPut = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(privateRequestConfig<D>('put', url, options));

const authPatch = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(privateRequestConfig<D>('patch', url, options));

const authDelete = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(privateRequestConfig<D>('delete', url, options));

export default {
  get,
  post,
  put,
  patch,
  delete: sendDelete,
  authGet,
  authPost,
  authPut,
  authPatch,
  authDelete,
};
