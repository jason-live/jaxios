import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  METHOD,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import { which } from 'shelljs'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

/**
 * promise 调用链元素类型
 */
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise),
  rejected?: RejectedFn
}

/**
 * Axios 混合对象
 * @author YuanYang
 * @date 2020/1/19 3:23 下午
 * @Description:
 * @memberof Axios.ts
 */
export default class Axios {
  interceptors: Interceptors
  defaults: AxiosRequestConfig

  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'get', config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'delete', config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'options', config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'head', config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData(url, 'post', data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData(url, 'put', data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData(url, 'patch', data, config)
  }

  _requestMethodWithoutData(url: string, method: METHOD, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method: method,
      url
    }))
  }

  _requestMethodWithData(url: string, method: METHOD, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method: method,
      url,
      data
    }))
  }
}
