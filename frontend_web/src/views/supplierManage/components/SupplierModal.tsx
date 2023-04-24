import { FC, useEffect, useState } from 'react'
import { Button, Input, Modal, Form, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import {
  getSupplierListApi,
  addSupplierApi,
  updateSupplierApi,
} from '@/_bak/api/modules/supplier'
import styles from './SupplierModal.module.scss'

interface SupplierModalProps {
  echoData?: any
  visible: boolean
  onClose: (isQuery?: boolean) => void
}

const SupplierModal: FC<SupplierModalProps> = (props) => {
  const { echoData, visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { data, refetch: refetchGetRoleList } = useQuery(
    'getSupplierList',
    getSupplierListApi,
    { enabled: false }
  )

  const { mutate } = useMutation(
    (params) => (echoData ? updateSupplierApi(params) : addSupplierApi(params)),
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
        className={styles.supplier}
        title={`${echoData ? '编辑' : '添加'}供应商`}
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
            label="供应商编码"
            name="supplierCode"
            rules={[{ required: true, message: '请输入供应商编码' }]}
          >
            <Input placeholder="请输入供应商编码" />
          </Form.Item>
          <Form.Item
            label="供应商名称"
            name="supplierName"
            rules={[{ required: true, message: '请输入供应商名称' }]}
          >
            <Input placeholder="请输入供应商名称" />
          </Form.Item>
          <Form.Item
            label="供应商地址"
            name="supplierAddress"
            rules={[{ required: true, message: '请输入供应商地址' }]}
          >
            <Input placeholder="请输入供应商地址" />
          </Form.Item>
          <Form.Item
            label="邮编"
            name="emal"
            rules={[{ required: true, message: '请输入邮编' }]}
          >
            <Input placeholder="请输入邮编" />
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
        </Form>
      </Modal>
    </div>
  )
}

export default SupplierModal
