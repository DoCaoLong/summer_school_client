import { AxiosError, AxiosResponse } from "axios";

export interface AxiosCusError<D> extends AxiosResponse<D> {
  response: {
    data: D;
  };
}
export interface IResponseDetail<T> {
  statusCode: number;
  context: T;
}
export interface IResponseList<T> {
    data: T;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface IResponseMessage {
  statusCode: number;
  context: {
    message: string
  };
}