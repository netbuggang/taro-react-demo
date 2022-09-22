import { useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import useGo from '../../hooks/useGo/index'
import './index.scss'

const Demo = () => {
  const go = useGo()

  const [params, setParams] = useState({} as any);

  useDidShow(() => {
    setParams(go.params)
  })

  return (
    <View className='index'>
      <View className='page-title'><Text>DEMO</Text></View>
      <View>姓名：<Text>{params.name}</Text></View>
      <View>性别：<Text>{params.sex}</Text></View>
      <View>年龄：<Text>{params.age}</Text></View>
      <View>params: <Text>{JSON.stringify(params, null, 4)}</Text></View>
    </View>
  )
}

export default Demo
