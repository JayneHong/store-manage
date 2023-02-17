import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'

const NotAuth = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您无权限访问当前页面！"
      extra={
        <Button type="primary" onClick={() => navigate(HOME_URL)}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotAuth
