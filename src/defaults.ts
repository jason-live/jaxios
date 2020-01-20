import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/header'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  timeout: 0,
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers?: any): any {
      processHeaders(data, headers)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],
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
