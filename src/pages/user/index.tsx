import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import useGo from '../../hooks/useGo/index'

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
      <View>params: <Text>{JSON.stringify(params, null, 4)}</Text></View>
      <View>app.$pageParams: <Text>{JSON.stringify(app.$pageParams, null, 4)}</Text></View>
    </View>
  )
}

export default User

