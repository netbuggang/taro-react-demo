# useGo
> 以 Promise 风格 调用：支持
## 功能描述
用于页面路由跳转

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

## 代码演示
```tsx
import { View, Text, Button } from '@tarojs/components'
import useGo from '@/hooks/useGo/index'

const Index = () => {
  const go = useGo()

  return (
    <View className='index'>
      <View><Text>我的空间</Text></View>
      <Button className='add_btn' onClick={() => {
        go.to({
          url: '/pages/user/index?isAuth=true', params: {
            name: "张三",
            sex: "男",
            age: 18,
          }
        })
      }}
      >前往个人中心</Button>
    </View>
  )
}

export default Index
```
user页面获取参数
```tsx
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import useGo from '@/hooks/useGo/index'

const User = () => {
  const app = Taro.getApp()
  const go = useGo()
  const params = go.getParams()

  return (
    <View className='index'>
      <View><Text>个人中心</Text></View>
      <View>姓名：<Text>{params.name}</Text></View>
      <View>性别：<Text>{params.sex}</Text></View>
      <View>年龄：<Text>{params.age}</Text></View>
      <View><Text>{JSON.stringify(app.$pageParams, null, 4)}</Text></View>
    </View>
  )
}

export default User
```