import Taro, { useRouter } from '@tarojs/taro'
import * as utils from './utils'
import type { IOptions, IConfig } from './types'

const PAGE_LEVEL_LIMIT = 10
const Config: IConfig = {}

const handleOptions = (options: IOptions) => {
  const query: any = utils.getUrlQuery(options.url)

  if (utils.validate.isRelativePath(options.url)) {
    throw { errMsg: 'url不可以使用相对路径' }
  }

  // http链接处理
  if (utils.validate.isHttp(options.url)) {
    options.url = Config.webView + encodeURIComponent(options.url)
  }

  // 小程序链接处理
  if (utils.validate.isAppId(options.url)) {
    options.appId = options.url
  } else if (query.appId) {
    options.path = options.url
    options.appId = query.appId
  }

  // 链接补全+去除前后空格（这一步要在最后处理）
  if (!options.url.startsWith('/')) {
    options.url = '/' + options.url.trim()
  }

  // 处理额外的参数
  options.params = Object.assign(options.params || {}, query)
  if (options.params) {
    Taro.preload('$pageParams', options.params)
  }

  return options
}

export default function useGo() {
  const router = useRouter()

  const to = async (options: IOptions) => {
    const _options = handleOptions(options)

    // 跳转其它小程序
    if (_options.appId) {
      return navigateToMiniProgram(_options as unknown as Taro.navigateToMiniProgram.Option)
    }

    // 页面栈超过10层后使用replace跳转
    const pages = Taro.getCurrentPages()
    if (pages.length >= PAGE_LEVEL_LIMIT) {
      return replace(_options)
    }

    return Taro.navigateTo(_options).catch(error => {
      // 判断是不是tabbar配置的页面
      if (error?.errMsg?.includes('can not navigateTo a tabbar page')) {
        _options.url = _options.url.split('?')[0]
        return Taro.switchTab(_options)
      }
    })
  }

  const replace = (options: IOptions) => {
    const _options = handleOptions(options)

    return Taro.redirectTo(_options)
  }

  const relaunch = (options: IOptions) => {
    const _options = handleOptions(options)

    return Taro.reLaunch(_options)
  }

  const back = (options: IOptions) => {
    return Taro.navigateBack(options)
  }

  const openEmbeddedMiniProgram = (options: Taro.openEmbeddedMiniProgram.Option) => {
    return Taro.openEmbeddedMiniProgram(options)
  }

  const navigateToMiniProgram = (options: Taro.navigateToMiniProgram.Option) => {
    return Taro.navigateToMiniProgram(options)
  }

  const navigateBackMiniProgram = (options: Taro.navigateToMiniProgram.Option) => {
    return Taro.navigateToMiniProgram(options)
  }

  const exitMiniProgram = (options: Taro.exitMiniProgram.Option) => {
    return Taro.exitMiniProgram(options)
  }

  /** 获取页面参数 */
  const getParams = () => {
    const params = router.params

    const preloadData = Taro.getCurrentInstance().preloadData
    const result = Object.assign({}, params, preloadData?.$pageParams || {})

    return result
  }

  return {
    to,
    replace,
    relaunch,
    back,
    getParams,
    get params() {
      return getParams()
    },
    openEmbeddedMiniProgram,
    navigateToMiniProgram,
    navigateBackMiniProgram,
    exitMiniProgram,
    ...utils
  }
}

export const initUseGo = (config: IConfig) => {
  Object.assign(Config, config)
}