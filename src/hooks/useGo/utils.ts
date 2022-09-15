import Taro from '@tarojs/taro'

/**获取当前页面栈
 * 
 * @returns 
 */
export const getCurrentPage = () => {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]

  return currentPage
}

/**获取当前页面链接（带参数）
 * 
 * @returns 
 */
export const getCurrentPageUrl = () => {
  const currentPage = getCurrentPage()
  const url = currentPage.route
  const options = currentPage.options

  return `/${url}` + (stringifyParams(options) ? `?${stringifyParams(options)}` : '')
}

/**获取链接?后的参数
 * 
 * @param url 
 * @returns 
 */
export const getUrlQuery = (url: string) => {
  let query = {}

  if (url.indexOf("?") !== -1) {
    const str = url.substring(url.indexOf("?"))
    query = parseParams(str)
  }

  return query;
}

/**反序列化链接后的参数
 * 
 * @param search 
 * @returns 
 */
export const parseParams = (search: string): Object => {
  const query = {}
  const strs = search.replace('?', '').split("&")
  strs.forEach(item => {
    query[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])
  })

  return query
}

/**序列化对象为URL参数
 * 
 * @param options 
 * @returns 
 */
export const stringifyParams = (options: Object) => {
  let str = "";

  for (let key in options) {
    str += `${key}=${options[key]}&`
  }

  return str.slice(0, -1);
}