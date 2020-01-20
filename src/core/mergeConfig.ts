/**
 *
 * @author YuanYang
 * @date 2020/1/20 2:10 下午
 * @Description:
 * @memberof mergeConfig.ts
 */

import { AxiosRequestConfig } from '../types'

const starts = Object.create(null)

/**
 * 默认合并函数
 * @param defaultVal
 * @param customVal
 */
function defaultStrat(defaultVal: any, customVal: any): any {
  return typeof customVal !== 'undefined' ? customVal : defaultVal
}

/**
 * 合并来自 customConfig 的函数
 * @param defaultVal
 * @param customVal
 */
function fromCustomValStrat(defaultVal: any, customVal: any): any {
  if (typeof customVal !== 'undefined') {
    return customVal
  }
}

/**
 * 合并来自 customConfig 的 key 值数组
 */
const stratKeysFromCustomVal = ['url', 'data', 'params']

/**
 * 构建合并函数对象
 */
stratKeysFromCustomVal.forEach((key) => {
  starts[key] = fromCustomValStrat
})

/**
 * config 合并函数
 * @param defaultConfig
 * @param customConfig
 */
export default function mergeConfig(defaultConfig: AxiosRequestConfig, customConfig?: AxiosRequestConfig) {
  if (!customConfig) {
    return defaultConfig
  }
  const config = Object.create(null)

  for (const key in customConfig) {
    mergeField(key)
  }

  for (const key in defaultConfig) {
    if (!customConfig[key]){
      mergeField(key)
    }
  }

  function mergeField(key: string) {
    const strat = starts[key] || defaultStrat
    config[key] = strat(defaultConfig[key], customConfig![key])
  }

  return config
}



