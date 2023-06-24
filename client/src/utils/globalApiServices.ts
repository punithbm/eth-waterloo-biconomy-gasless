import { AxiosResponse } from 'axios';

import { TResponse } from '../types';
import axiosInstance from './httpInterceptor';
export const globalGetService = <TParamType>(url: string, params: TParamType, signal?: any, baseURL: string | undefined = axiosInstance.defaults.baseURL, headers?: any): Promise<TResponse> => {
  return new Promise(function (resolve, reject) {
    axiosInstance({
      method: 'GET',
      url: url,
      params: params,
      baseURL: baseURL,
      signal: signal,
      headers,
    })
      .then((response: AxiosResponse<TResponse>) => {
        const _response: TResponse = {
          data: baseURL !== axiosInstance.defaults.baseURL ? response.data : response.data.data,
          statusCode: response.status,
          message: response.statusText,
        };
        resolve(_response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const globalApiService = <TDataType>( data: TDataType, signal?: any, headers?: any): Promise<TResponse> => {
  return new Promise(function (resolve, reject) {
    axiosInstance({
      method: "POST",
      data: data,
      signal,
      headers,
    })
      .then((response: AxiosResponse<TResponse>) => {
        const _response: TResponse = {
          data: response.data,
          statusCode: response.status,
          message: response.statusText,
        };
        resolve(_response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
