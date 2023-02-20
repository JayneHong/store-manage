import { FC, useEffect, useState } from 'react'
import { Table, Button, Space, Input, Modal, Form, Radio, Upload } from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/api'
import { PlusOutlined } from '@ant-design/icons'
import styles from './SupplierModal.module.scss'

const { Search } = Input

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 9 },
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 16 },
  // },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 22,
      offset: 2,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

interface CommodityModalProps {
  visible: boolean
  onClose: () => void
}

const CommodityModal: FC<CommodityModalProps> = (props) => {
  const { visible, onClose } = props
  const dispatch = useAppDispatch()
  const state = useSelector<RootState>((state) => state.counter.count)

  const [form] = Form.useForm<FormInstance>()

  const handleAdd = () => {
    form.submit()
  }

  const handleClose = () => {
    onClose?.()
  }

  const onSubmit = (values: FormInstance<string>) => {
    console.log('====================================')
    console.log('xxxxxx', values)
    console.log('====================================')
  }

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [visible])

  return (
    <div style={{ height: '100%' }}>
      <Modal
        className={styles.supplier}
        title="添加用户"
        width="665px"
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
          {...formItemLayout}
          form={form}
          layout="inline"
          autoComplete="off"
          onFinish={onSubmit}
        >
          <Form.Item
            label="供应商名称"
            name="usename"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品图片"
            valuePropName="fileList"
            wrapperCol={{ span: 10 }}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="商品名称"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="产地"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="包装"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="规格"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="生产批号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="批准文号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="销售价格"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="库存量"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="销售价格"
            name="预警值"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CommodityModal
