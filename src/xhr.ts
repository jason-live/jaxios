import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'get', url, headers } = config

  /**
   * 创建 XMLHttpRequest 对象
   */
  const request = new XMLHttpRequest()

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

  request.send(data)
}
