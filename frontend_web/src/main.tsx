import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { message } from 'antd'
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
  duration: 5,
  maxCount: 2,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <AuthRouter>
        <App />
      </AuthRouter>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
