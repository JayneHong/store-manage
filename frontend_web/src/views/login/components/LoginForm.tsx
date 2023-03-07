import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import {
  CloseCircleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { loginApi } from '@/_bak/api/modules/login'
import styles from '../index.module.scss'

const LoginForm = (props: any) => {
  // const { t } = useTranslation();
  const { setToken, setTabsList } = props
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
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
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
      <Form.Item className={styles['login-btn']}>
        <Button
          onClick={() => {
            form.resetFields()
          }}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
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
