import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  console.log(config)
  return new Promise((resolve, reject) => {
    /**
     * 结构 config 参数
     */
    const { data = null, method = 'get', url, headers, responseType, timeout, cancelToken } = config

    /**
     * 创建 XMLHttpRequest 对象
     */
    const request = new XMLHttpRequest()

    /**
     * 设置 request 的 responseType 属性
     */
    if (responseType) {
      request.responseType = responseType
    }

    /**
     * 设置超时时间
     */
    if (timeout) {
      request.timeout = timeout
    }

    /**
     * 执行响应任务
     */
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return
      if (request.status === 0) return
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        headers: responseHeaders,
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }
      handleResponse(response)
    }

    /**
     * 执行网络错误
     */
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    /**
     * 执行超时错误
     */
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    /**
     * 方法初始化请求
     */
    request.open(method.toUpperCase(), url!, true)

    /**
     * 处理 headers
     */
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    /**
     * 发送 HTTP 请求
     */
    request.send(data)

    /**
     * 处理返回异常
     * @param res
     */
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
