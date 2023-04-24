import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import { loginApi } from '@/_bak/api/modules/login'
import styles from '../index.module.scss'

type LoginFormProps = {
  /** 找回密码 */
  retrievePassword: () => void
}

const LoginForm = (props: LoginFormProps) => {
  const { retrievePassword } = props
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  // 登录
  const onFinish = async (loginForm: any) => {
    try {
      setLoading(true)
      const { data, code } = await loginApi(loginForm)
      if (code === 0) {
        message.success('登录成功！', loginForm)
        navigate(HOME_URL)
      }
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="密码：123456"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button
          type="link"
          size="small"
          onClick={retrievePassword}
          style={{
            position: 'relative',
            right: '-230px',
            top: '-16px',
          }}
        >
          忘记密码
        </Button>
      </Form.Item>
      <Form.Item className={styles['login-btn']}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<UserOutlined />}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
