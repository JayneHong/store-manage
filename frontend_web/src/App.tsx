import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import routers from '@/routes/index'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// 创建一个 client
const queryClient = new QueryClient()

const App = () => {
  const outlet = useRoutes(routers)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/* 添加devtools */}
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        ) : (
          ''
        )}
        <div className="App">{outlet}</div>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
