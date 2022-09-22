import { View, Text, Button } from '@tarojs/components'
import useGo from '@/hooks/useGo'
import './index.scss'

const Index = () => {
  const go = useGo()

  return (
    <View className='index'>
      <View className='page-title'><Text>useGo test</Text></View>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: '/pages/demo/index?orgin=room',
          params: {
            name: "李四",
            sex: "女",
            age: 18,
          }
        })
      }}
      >跳转DEMO页(navigateTo)</Button>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: '/pages/user/index?isAuth=true', params: {
            name: "张三",
            sex: "男",
            age: 18,
          }
        })
      }}
      >跳转TabBar带参数(switchTab)</Button>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: '/pages/user/index?isAuth=true'
        })
      }}
      >跳转TabBar(switchTab)</Button>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: 'wxe5f52902cf4de896'
        })
      }}
      >跳转小程序(navigateToMiniProgram)</Button>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: 'pages/index/index?appId=wxe5f52902cf4de896'
        })
      }}
      >跳转小程序带参(navigateToMiniProgram)</Button>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: 'https://taro-docs.jd.com/taro/docs/'
        })
      }}
      >跳转H5页面(navigateTo)</Button>

      <View className='page-title'><Text>参数异常跳转</Text></View>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: '../demo/index'
        })
      }}
      >跳转相对路径(navigateTo)</Button>

      <Button className='action-btn' onClick={() => {
        go.to({
          url: 'pages/demo/index'
        })
      }}
      >跳转不是/开头链接</Button>
    </View>

  )
}

export default Index

