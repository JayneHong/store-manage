import { FC, useEffect, useState } from 'react'
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Radio,
  message,
  Select,
} from 'antd'
import { useMutation, useQuery } from 'react-query'
import {
  updateGoodsClassifiedApi,
  addGoodsClassifiedApi,
  getGoodsClassifiedListApi,
} from '@/_bak/api/modules/goodsClassified'

const pattern = /^HS-/

interface AddClassifiedModalProps {
  echoData?: any
  visible: boolean
  onClose: (isQuery?: boolean) => void
}

const AddClassifiedModal: FC<AddClassifiedModalProps> = (props) => {
  const { echoData, visible, onClose } = props
  const [isLoading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const { mutate } = useMutation(
    (params) =>
      echoData
        ? updateGoodsClassifiedApi(params)
        : addGoodsClassifiedApi(params),
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
        title={`${echoData ? '编辑' : '添加'}商品分类`}
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
            label="分类名称"
            name="claasifiedName"
            rules={[{ required: true, message: '请输入商品分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item
            label="分类编码"
            name="claasifiedCode"
            rules={[
              { pattern, required: true, message: '角色编码以"HS-"开头' },
            ]}
          >
            <Input placeholder="请输入分类编码" />
          </Form.Item>
          <Form.Item
            label="分类级别"
            name="level"
            rules={[{ required: true, message: '请选择分类级别' }]}
          >
            <Select placeholder="请选择分类级别">
              <Select value="1">一级</Select>
              <Select value="2">二级</Select>
              <Select value="3">三级</Select>
            </Select>
          </Form.Item>
          <Form.Item label="备注" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddClassifiedModal
