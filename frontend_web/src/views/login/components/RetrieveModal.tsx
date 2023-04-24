import { FC, useEffect, useState } from 'react'
import { Table, Button, Space, Input, Modal, Form, Radio, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { updatePassword } from '@/_bak/api/modules/login'
import { Login } from '@/_bak/api/interface'

const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/

interface RetrieveModalProps {
  visible: boolean
  onClose: (isQuery?: boolean) => void
}

const RetrieveModal: FC<RetrieveModalProps> = (props) => {
  const { visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { mutate } = useMutation(
    (params: Login.RetrievePassword) => updatePassword(params),
    {
      onMutate: () => {
        setLoading(true)
      },
      onSuccess: (data) => {
        message.success(data.msg)
        onClose?.(true)
      },
      onSettled: () => {
        setLoading(false)
      },
    }
  )

  const handleAdd = () => {
    form.submit()
  }

  const handleClose = () => {
    onClose?.()
  }

  const onSubmit = async (values: any) => {
    mutate({ ...values } as any)
  }

  useEffect(() => {
    if (!visible) return
    form.resetFields()
  }, [visible])

  return (
    <div style={{ height: '100%' }}>
      <Modal
        title="重置密码"
        open={visible}
        onCancel={handleClose}
        bodyStyle={{ padding: '20px 10px 5px' }}
        footer={[
          <Button type="default" onClick={handleClose} key="cancel">
            取消
          </Button>,
          <Button
            type="primary"
            onClick={handleAdd}
            key="ok"
            loading={isLoading}
          >
            确定
          </Button>,
        ]}
      >
        <Form
          form={form}
          autoComplete="off"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              {
                required: true,
                message: '密码长度为8-18位，且必须由字母、数字组成',
                pattern,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '密码长度为8-18位，且必须由字母、数字组成',
                pattern,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RetrieveModal
