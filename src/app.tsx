import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { initUseGo } from '@/hooks/useGo'

import configStore from './store'

import './app.scss'

const store = configStore()

initUseGo({
  webView: '/pages/h5/index?url=',
  emptyPage: '/pages/empty/index'
})

class App extends Component<PropsWithChildren> {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
