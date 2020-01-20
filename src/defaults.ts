import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  timeout: 0,
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodWithoutData = ['get', 'head', 'options', 'delete']

methodWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodWithData = ['put', 'post', 'patch']

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
