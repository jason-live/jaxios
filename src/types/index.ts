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
  url: string
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

export interface AxiosPromise extends Promise<AxiosResponse>{

}
