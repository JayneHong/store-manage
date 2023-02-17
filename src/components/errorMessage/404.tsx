import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面找不到了～"
      extra={
        <Button type="primary" onClick={() => navigate(HOME_URL)}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
