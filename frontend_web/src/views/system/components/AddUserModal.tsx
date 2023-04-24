import { FC, useEffect, useState } from 'react'
import { Button, Input, Modal, Form, message, Select } from 'antd'
import { useMutation, useQuery } from 'react-query'
import {
  addUserApi,
  updateUserApi,
  getRoleListApi,
} from '@/_bak/api/modules/user'

interface AddUserModalProps {
  echoData?: any
  visible: boolean
  onClose: (isQuery?: boolean) => void
}

const AddUserModal: FC<AddUserModalProps> = (props) => {
  const { echoData, visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { data, refetch: refetchGetRoleList } = useQuery(
    'getRoleList',
    getRoleListApi,
    { enabled: false }
  )

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

  const onSubmit = async (values: any) => {
    console.log('submit', values)
    if (echoData) {
      mutate({ ...values, id: echoData['_id'] } as any)
    } else {
      mutate({...values})
    }
  }

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    } else {
      if (echoData) {
        form.setFieldsValue({
          ...echoData,
        })
      }
    }
  }, [visible, echoData])

  useEffect(() => {
    refetchGetRoleList()
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <Modal
        title={`${echoData ? '编辑' : '添加'}用户`}
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
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleCode"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              {(data?.data as any)?.map((item: any) => {
                return (
                  <Select.Option key={item.roleCode} value={item.roleCode}>
                    {item.roleName}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="手机号" name="phoneNumber">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="住址" name="address">
            <Input placeholder="请输入住址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddUserModal
