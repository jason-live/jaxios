import { isPlainObject } from './util'

/**
 * 将小写的转为大写
 * 例：content-type -> Content-Type
 * @param headers
 * @param normalizedName
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理 headers 逻辑
 * @param headers
 * @param data
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 处理 headers 字符串 转为 对象
 * @param headers
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  /**
   * 分解 headers 字符串
   */
  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })

  return parsed
}
