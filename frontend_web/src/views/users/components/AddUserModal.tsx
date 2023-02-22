import { FC, useEffect, useState } from 'react'
import { Table, Button, Space, Input, Modal, Form, Radio, message } from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import { addUser } from '@/api/modules/user'
import { FormInstance, useForm } from 'antd/es/form/Form'

const { Search } = Input

interface AddUserModalProps {
  visible: boolean
  onClose: () => void
}

const AddUserModal: FC<AddUserModalProps> = (props) => {
  const { visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm<FormInstance>()

  const handleAdd = () => {
    form.submit()
  }

  const handleClose = () => {
    onClose?.()
  }

  const onSubmit = async (values: FormInstance<string>) => {
    setLoading(true)
    const res = await addUser({ ...values })

    if (res.code === 0) {
      message.success('添加成功')
    }
    setLoading(false)
    handleClose()
  }

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [visible])

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
          <Button type="primary" onClick={handleAdd} key="ok">
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
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddUserModal
