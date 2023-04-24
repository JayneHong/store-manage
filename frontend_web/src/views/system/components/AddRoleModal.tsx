import { FC, useEffect, useState } from 'react'
import { Table, Button, Space, Input, Modal, Form, Radio, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import {
  updateRoleApi,
  addRoleApi,
  getRoleListApi,
} from '@/_bak/api/modules/user'
import { FormInstance, useForm } from 'antd/es/form/Form'

const pattern = /^ROLE-/

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
    (params) => (echoData ? updateRoleApi(params) : addRoleApi(params)),
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
    if (!visible) {
      form.resetFields()
    } else {
      if (echoData) {
        form.setFieldsValue({ ...echoData })
      }
    }
  }, [visible, echoData])

  return (
    <div style={{ height: '100%' }}>
      <Modal
        title={`${echoData ? '编辑' : '添加'}角色`}
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
            label="角色"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色编码"
            name="roleCode"
            rules={[
              { pattern, required: true, message: '角色编码以"ROLE-"开头' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddUserModal
