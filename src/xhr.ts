import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    /**
     * 结构 config 参数
     */
    const { data = null, method = 'get', url, headers, responseType } = config

    /**
     * 创建 XMLHttpRequest 对象
     */
    const request = new XMLHttpRequest()

    /**
     * 设置 request 的 responseType 属性
     */
    if(responseType) {
      request.responseType = responseType
    }

    /**
     * 执行响应任务
     */
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return
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
      resolve(response)
    }

    request.onerror = function() {
      reject(new Error('Network Error'))
    }

    /**
     * 方法初始化请求
     */
    request.open(method.toLowerCase(), url, true)

    /**
     * 处理 headers
     */
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    /**
     * 发送 HTTP 请求
     */
    request.send(data)
  })
}
