import Taro, { Current, getCurrentInstance } from '@tarojs/taro'
import * as utils from './utils'
import type { IOptions, IConfig } from './types'

const PAGE_LEVEL_LIMIT = 10
const Config: IConfig = {}
const PAGE_STACK: IOptions[] = []

const handleOptions = (options: IOptions) => {
  const query: any = utils.getUrlQuery(options.url)

  if (utils.validate.isRelativePath(options.url)) {
    throw { errMsg: 'url不可以使用相对路径' }
  }

  // http链接处理
  if (utils.validate.isHttp(options.url)) {
    if (Config.webView) {
      options.url = Config.webView + encodeURIComponent(options.url)
    } else {
      throw { errMsg: '请配置小程序webview路径' }
    }
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

const navigateTo = (options: Taro.navigateTo.Option) => Taro.navigateTo(options).catch(error => {
  // 判断是不是tabbar配置的页面
  if (error?.errMsg?.includes('can not navigateTo a tabbar page')) {
    options.url = options.url.split('?')[0]
    return Taro.switchTab(options)
  }
})

export default function useGo() {
  const to = async (options: IOptions) => {
    const _options = handleOptions(options)
    const pages = Taro.getCurrentPages()
    const { envVersion } = Taro.getAccountInfoSync().miniProgram

    // 跳转其它小程序
    if (_options.appId) {
      return navigateToMiniProgram(_options as unknown as Taro.navigateToMiniProgram.Option)
    }

    if (Config.emptyPage) {
      // 页面栈超过10层后使用中转页跳转
      if (pages.length == PAGE_LEVEL_LIMIT - 3) {
        await Taro.navigateTo({ url: Config.emptyPage })
        if (envVersion == 'develop') {
          await utils.sleep(100)
        }
        const _page = Current.page
        const originOnShow = _page!.onShow
        _page!.onShow = function () {
          originOnShow?.apply(this)
          if (!PAGE_STACK.length) {
            return back({ delta: 1 })
          } else {
            return navigateTo(PAGE_STACK.pop() as IOptions)
          }
        }
      }
      if (pages.length >= PAGE_LEVEL_LIMIT - 2) {
        PAGE_STACK.push(_options)
        return replace(_options)
      }
    } else {
      // 页面栈超过10层后使用replace跳转 - 降级方案
      if (pages.length >= PAGE_LEVEL_LIMIT) {
        return replace(_options)
      }
    }

    return navigateTo(_options)
  }

  const replace = (options: IOptions) => {
    const _options = handleOptions(options)

    return Taro.redirectTo(_options)
  }

  const relaunch = (options: IOptions) => {
    const _options = handleOptions(options)

    return Taro.reLaunch(_options)
  }

  const back = (options: Taro.navigateBack.Option) => {
    return Taro.navigateBack(options)
  }

  const pageScrollTo = (options: Taro.pageScrollTo.Option) => {
    return Taro.pageScrollTo(options)
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
    const instance = getCurrentInstance()
    const preloadData = instance.preloadData
    const result = Object.assign({}, instance.router?.params, preloadData?.$pageParams || {})

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
    pageScrollTo,
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