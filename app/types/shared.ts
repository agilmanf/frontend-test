export type DefaultResponseData<T> = {
  data: T;
  errorMessage: string;
  message: string;
  statusCode: number;
};
