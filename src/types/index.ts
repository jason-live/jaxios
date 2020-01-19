export type METHOD =
  'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  /**
   * 请求地址
   */
  url?: string
  /**
   * 请求方式
   */
  method?: METHOD
  /**
   * 请求体
   */
  data?: any
  /**
   * 请求地址参数
   */
  params?: any
  /**
   * 请求头
   */
  headers?: any
  /**
   * 返回类型
   */
  responseType?: XMLHttpRequestResponseType

  /**
   * 超时时间
   */
  timeout?: number
}

export interface AxiosResponse {
  /**
   * 请求 AxiosRequestConfig 参数
   */
  config: AxiosRequestConfig
  /**
   * 状态码
   */
  status: number
  /**
   * 状态文本
   */
  statusText: string
  /**
   * 返回体
   */
  data: any
  /**
   * 返回 request 对象
   */
  request: any
  /**
   * 返回 headers
   */
  headers: any
}

export interface AxiosPromise extends Promise<AxiosResponse>{}

export interface AxiosError extends Error{
  config: AxiosRequestConfig,
  code?: string,
  request?: any,
  response?: AxiosResponse,
  isAxiosError: boolean
}

export interface Axios {
  request(config?: AxiosRequestConfig): AxiosPromise

  get(url: string, config? :AxiosRequestConfig): AxiosPromise

  options(url: string, config? :AxiosRequestConfig): AxiosPromise

  delete(url: string, config? :AxiosRequestConfig): AxiosPromise

  head(url: string, config? :AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
