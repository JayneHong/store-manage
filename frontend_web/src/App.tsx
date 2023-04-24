import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import routers from '@/routes/index'

import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    /**
     * refetchOnWindowFocus 窗口获得焦点时重新获取数据
     * staleTime 过多久重新获取服务端数据
     * cacheTime 数据缓存时间 默认是 5 * 60 * 1000 5分钟
     */
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
      retry: 0,
    },
  },
}

// 创建一个 client
const queryClient = new QueryClient(queryConfig)

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
