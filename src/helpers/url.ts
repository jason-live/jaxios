import { isData, isPlainObject } from './util'

export function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 构建 URL
 * @param url
 * @param params
 * @description {
 *   name: 'aa',
 *   password: 'bb',
 *   users: [1, 2, 3, 4]
 * }
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    const val = params[key]

    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = []

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach((val) => {
      if (isData(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify((val))
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
