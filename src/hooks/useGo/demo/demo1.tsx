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

