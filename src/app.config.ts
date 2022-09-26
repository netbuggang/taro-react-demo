export default {
  pages: [
    'pages/room/index',
    'pages/index/index',
    'pages/user/index',
    'pages/demo/index',
    'pages/h5/index',
    'pages/empty/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000',
    selectedColor: '#90722d',
    backgroundColor: '#f7edd6',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/room/index',
        text: '我的空间',
      },
      {
        pagePath: 'pages/user/index',
        text: '个人中心',
      },
    ]
  },
}
