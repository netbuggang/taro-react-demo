# useGo

## 功能描述
用于页面路由跳转

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />
<code src="./demo/demo2.tsx" />

## API

```typescript
const go = useGo()
/** switchTab & navigateTo */
go.to(options: Options)
/** redirectTo */
go.replace(options: Options)
/** reLaunch */
go.relaunch(options: Options)
/** navigateBack */
go.back(options: Options)
/** 获取页面参数 */
go.getParams()

/** 工具方法 */
/** 获取当前页面栈 */
go.getCurrentPage()
/** 获取当前页面链接（带参数） */
go.getCurrentPageUrl()
/** 获取链接?后的参数 */
go.getUrlQuery(url: string)
```

### Options

| 参数   | 类型     | 必填 | 默认值 | 说明                                                                                                                                       |
| ------ | -------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| url    | `String` | 是   | -      | 需要跳转应用路径, 路径后可以带参数。参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2' |
| params | `Object` | 否   | -      | 需要传递的参数                                                                                                                             |