import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

type Options<D = unknown> = {
  headers?: AxiosRequestHeaders;
  data?: D;
  params?: any;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api/',
  timeout: 5000,
};

const get = async <T>(url: string, options?: Options) =>
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

export default { get, post, put };
