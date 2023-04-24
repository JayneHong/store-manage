import { FC, useEffect, useState } from 'react'
import { Button, Input, Modal, Form, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import {
  getCustomerListApi,
  addCustomerApi,
  updateCustomerApi,
} from '@/_bak/api/modules/customer'
import styles from './CustomerModal.module.scss'

interface CustomerModalProps {
  echoData?: any
  visible: boolean
  onClose: (isQuery?: boolean) => void
}

const CustomerModal: FC<CustomerModalProps> = (props) => {
  const { echoData, visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { data, refetch: refetchGetRoleList } = useQuery(
    'getCustomerList',
    getCustomerListApi,
    { enabled: false }
  )

  const { mutate } = useMutation(
    (params) => (echoData ? updateCustomerApi(params) : addCustomerApi(params)),
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
      mutate({ ...values })
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
        className={styles.customerModal}
        title={`${echoData ? '编辑' : '添加'}客户`}
        width="700px"
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
          layout="inline"
          autoComplete="off"
          onFinish={onSubmit}
        >
          <Form.Item
            label="客户名称"
            name="customerName"
            rules={[{ required: true, message: '请输入供应商名称' }]}
          >
            <Input placeholder="请输入供应商名称" />
          </Form.Item>
          <Form.Item
            label="客户地址"
            name="customerAddress"
            rules={[{ required: true, message: '请输入供应商地址' }]}
          >
            <Input placeholder="请输入供应商地址" />
          </Form.Item>
          <Form.Item
            label="联系人"
            name="contact"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input placeholder="请输入联系人" />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="contactPhone"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item
            label="开户银行"
            name="bankName"
            rules={[{ required: true, message: '请输入开户银行' }]}
          >
            <Input placeholder="请输入开户银行" />
          </Form.Item>
          <Form.Item
            label="银行账号"
            name="bankAccount"
            rules={[{ required: true, message: '请输入银行账号' }]}
          >
            <Input placeholder="请输入银行账号" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CustomerModal
