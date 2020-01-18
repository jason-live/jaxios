import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, method = 'get', url } = config

  const request = new XMLHttpRequest()

  request.open(method.toLowerCase(), url, true)

  request.send(data)
}
