import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { message } from 'antd'
import dayjs from 'dayjs'
import AuthRouter from '@/routes/utils/AuthRouter'
import store from '@/stores'

// 初始化样式
import 'reset-css'
// 全局样式
import '@/styles/global.scss'
// 组件样式
import App from './App'

// 全局设置antd message最大显示个数
message.config({
  duration: 4,
  maxCount: 1,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthRouter>
        <App />
      </AuthRouter>
    </BrowserRouter>
  </Provider>
)
