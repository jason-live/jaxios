import { isPlainObject } from './util'

/**
 * 将小写的转为大写
 * 例：content-type -> Content-Type
 * @param headers
 * @param normalizedName
 */
function normalizeHeaderName(headers: any, normalizedName: string) {
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
function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']){
      headers['Content-Type'] = 'application/jason;charset=utf-8'
    }
  }
}