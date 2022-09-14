import Taro, { useRouter } from '@tarojs/taro'

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

  //拼接url的参数
  let currentPageUrl = url + '?'
  for (var key in options) {
    var value = options[key]
    currentPageUrl += key + '=' + value + '&'
  }

  return "/" + currentPageUrl;
}

/**获取链接?后的参数
 * 
 * @param url 
 * @returns 
 */
export const getUrlQuery = (url: string) => {
  const query = {}

  if (url.indexOf("?") !== -1) {
    let str = url.substring(url.indexOf("?") + 1)
    const strs = str.split("&")
    for (let i = 0; i < strs.length; i++) {
      query[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1])
    }
  }

  return query;
}

export const formatParams = () => {

}

export const openEmbeddedMiniProgram = (options: Taro.openEmbeddedMiniProgram.Option) => {
  return Taro.openEmbeddedMiniProgram(options)
}

export const navigateToMiniProgram = (options: Taro.navigateToMiniProgram.Option) => {
  return Taro.navigateToMiniProgram(options)
}

export const navigateBackMiniProgram = (options: Taro.navigateToMiniProgram.Option) => {
  return Taro.navigateToMiniProgram(options)
}

export const exitMiniProgram = (options: Taro.exitMiniProgram.Option) => {
  return Taro.exitMiniProgram(options)
}