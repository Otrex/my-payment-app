import axios, {
  Axios,
  Method,
  AxiosError,
  AxiosHeaders,
  RawAxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import LocalStore from './LocalStore';

export type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & {common: AxiosHeaders}
>;

type UnauthorizedError = {
  response: {
    status: number;
  };
};

export default class Api {
  private __instance: Axios;
  private __token?: string;
  private __baseUrl?: string;
  private __sessionStore!: LocalStore<string>;
  private __unauthorizedHandler?: Function;

  constructor(baseUrl?: string) {
    this.__baseUrl = baseUrl;
    this.__instance = axios.create();
    this.__instance.defaults.baseURL = baseUrl;
    this.__instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: UnauthorizedError) => this.handleUnauthorizedResponse(error),
    );
  }

  handleUnauthorizedResponse(error: UnauthorizedError) {
    if (error.response && error.response.status === 401) {
      this.__sessionStore.clear();
      this.__unauthorizedHandler && this.__unauthorizedHandler();
    }

    return Promise.reject(error);
  }

  setStore(store: LocalStore<string>) {
    this.__sessionStore = store;
    return this;
  }

  get token() {
    return this.__token;
  }

  get sessionStore() {
    return this.__sessionStore;
  }

  public setBaseUrl(url: string) {
    this.__baseUrl = url;
    this.__instance.defaults.baseURL = url;
    return this;
  }

  public setToken(token: string) {
    this.__token = token;
    this.__sessionStore.store(token);
    this.__instance.defaults.headers.common.Authorization = `Bearer ${this.token}`;
  }

  public async request<T extends Record<string, any>>(
    method: Method,
    url: string,
    data?: Record<string, any>,
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders,
  ) {
    try {
      let _url = url;
      if (method.toLowerCase() === 'get' && data) {
        const params = new URLSearchParams(data);
        _url += `?${params.toString()}`;
      }

      const res = await this.__instance.request<T>({
        url: _url,
        method,
        data,
        headers,
      });

      if (res.data.state === 'success') {
        return res.data;
      }

      return Promise.reject(res.data);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          //TODO navigateTo('/');
        }
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }
}
