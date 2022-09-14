import Taro, { useRouter } from '@tarojs/taro'
import * as utils from './utils'
import type { Options } from './types'
import config from '../../app.config'

const app = Taro.getApp()
const TAB_BAR_LIST = config.tabBar?.list?.map((item) => `/${item.pagePath}`) || [];
const PAGE_LEVEL_LIMIT = 10

const handleParams = (options: Options) => {
  const { url, params } = options
  const _url = url.split("?")[0]
  if (!app.$pageParams) {
    app.$pageParams = {}
  }
  app.$pageParams[_url] = params
}

export default function useGo() {
  const router = useRouter()

  const to = (options: Options) => {
    handleParams(options)

    // 页面栈超过10层后使用replace跳转
    const pages = Taro.getCurrentPages()
    if (pages.length >= PAGE_LEVEL_LIMIT) {
      return replace(options)
    }

    // 判断是不是tabbar配置的页面
    const _url = options.url.split("?")[0]
    if (TAB_BAR_LIST.includes(_url)) {
      Object.assign(options.params as any, utils.getUrlQuery(options.url))
      options.url = _url;
      return Taro.switchTab(options)
    }
    return Taro.navigateTo(options)
  }

  const replace = (options: Options) => {
    handleParams(options)

    return Taro.redirectTo(options)
  }

  const relaunch = (options: Options) => {
    handleParams(options)

    return Taro.reLaunch(options)
  }

  const back = (options: Options) => {
    return Taro.navigateBack(options)
  }

  const getParams = () => {
    const params = router.params;

    const pageParam = app.$pageParams[router.path];
    if (pageParam) {
      Object.assign(params, pageParam)
    }

    return params
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
    ...utils
  }
}