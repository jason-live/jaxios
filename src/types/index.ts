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

export interface AxiosResponse<T=any> {
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
  data: T
  /**
   * 返回 request 对象
   */
  request: any
  /**
   * 返回 headers
   */
  headers: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>>{}

export interface AxiosError extends Error{
  config: AxiosRequestConfig,
  code?: string,
  request?: any,
  response?: AxiosResponse,
  isAxiosError: boolean
}

export interface Axios {
  request<T=any>(config?: AxiosRequestConfig): AxiosPromise<T>

  get<T=any>(url: string, config? :AxiosRequestConfig): AxiosPromise<T>

  options<T=any>(url: string, config? :AxiosRequestConfig): AxiosPromise<T>

  delete<T=any>(url: string, config? :AxiosRequestConfig): AxiosPromise<T>

  head<T=any>(url: string, config? :AxiosRequestConfig): AxiosPromise<T>

  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T |Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
