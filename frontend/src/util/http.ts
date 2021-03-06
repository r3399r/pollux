import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

type Options<D = unknown, P = any> = {
  headers?: AxiosRequestHeaders;
  data?: D;
  params?: P;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api/',
  timeout: 30000,
};

const get = async <T, P = any>(url: string, options?: Options<unknown, P>) =>
  axios.request<T>({
    ...defaultConfig,
    ...options,
    url,
    method: 'get',
  });

const post = async <T, D = unknown>(url: string, options?: Options<D>) =>
  axios.request<T>({
    ...defaultConfig,
    ...options,
    url,
    method: 'post',
  });

const put = async <T, D = unknown>(url: string, options?: Options<D>) =>
  axios.request<T>({
    ...defaultConfig,
    ...options,
    url,
    method: 'put',
  });

const sendDelete = async <T, D = unknown>(url: string, options?: Options<D>) =>
  axios.request<T>({
    ...defaultConfig,
    ...options,
    url,
    method: 'delete',
  });

export default { get, post, put, delete: sendDelete };
