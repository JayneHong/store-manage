import { FC, useEffect, useState } from 'react'
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Radio,
  Upload,
  Select,
} from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/_bak/api'
import { PlusOutlined } from '@ant-design/icons'
import styles from './CommodityForm.module.scss'

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

interface CommodityFormProps {
  handleReset: (form: FormInstance) => void
  handleSearch: (form: FormInstance) => void
}

const CommodityForm: FC<CommodityFormProps> = (props) => {
  const { handleReset, handleSearch } = props
  const dispatch = useAppDispatch()
  const state = useSelector<RootState>((state) => state.counter.count)

  const [form] = Form.useForm<FormInstance>()

  const onSubmit = (values: FormInstance<string>) => {
    console.log('====================================')
    console.log('xxxxxx', values)
    console.log('====================================')
  }

  return (
    <div className={styles.commodityForm}>
      <Form
        title="搜索条件"
        form={form}
        layout="inline"
        autoComplete="off"
        onFinish={onSubmit}
      >
        <Form.Item label="供应商名称" name="usename">
          <Select style={{ width: 160 }} placeholder="请选择供应商">
            <Select.Option key="a" value="aa">
              达利园
            </Select.Option>
            <Select.Option key="a" value="aa">
              哇哈哈
            </Select.Option>
            <Select.Option key="a" value="aa">
              蒙牛
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="供应商名称" name="usename">
          <Input />
        </Form.Item>
        <Form.Item label="商品名称" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="商品描述" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="商品规格" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="生产批号" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="批准文号" name="phone">
          <Input />
        </Form.Item>
        <Form.Item>
          <Space size={10} style={{ marginLeft: 20 }}>
            <Button type="default" onClick={() => handleReset(form)}>
              重置
            </Button>
            <Button type="primary" onClick={() => handleSearch(form)}>
              查询
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CommodityForm
