import { FC, useEffect, useState } from 'react'
import { Table, Button, Space, Input, Modal, Form, Radio, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { addUserApi, updateUserApi } from '@/_bak/api/modules/user'
import { FormInstance, useForm } from 'antd/es/form/Form'

interface AddUserModalProps {
  echoData?: any
  visible: boolean
  onClose: (isQuery?: boolean) => void
}

const AddUserModal: FC<AddUserModalProps> = (props) => {
  const { echoData, visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { mutate } = useMutation(
    (params) => (echoData ? updateUserApi(params) : addUserApi(params)),
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

  const onSubmit = async (values: FormInstance<string>) => {
    if (echoData) {
      mutate({ ...values, id: echoData['_id'] } as any)
    } else {
      mutate({ ...values } as any)
    }
  }

  useEffect(() => {
    if (!visible) return
    if (echoData) {
      form.setFieldsValue({ ...echoData })
    } else {
      form.resetFields()
    }
  }, [visible, echoData])

  return (
    <div style={{ height: '100%' }}>
      <Modal
        title="添加用户"
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
          labelCol={{ span: 4 }}
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
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="住址" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="role" initialValue="staff">
            <Radio.Group value="staff">
              <Radio value="staff">员工</Radio>
              <Radio value="admin">管理员</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddUserModal
