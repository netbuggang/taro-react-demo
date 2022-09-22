export type IOptions = {
  url: string
  params?: Object
  delta?: number
  [x: string]: any
}
export type IConfig = {
  /** webView页面路径 @example /pages/h5/index?url= */
  webView?: string
  /** 空白中转页路径 @example /pages/tempPage/index */
  tempPage?: string
}