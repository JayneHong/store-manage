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
import { getSupplierListApi } from '@/_bak/api/modules/supplier'

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

  const [form] = Form.useForm<FormInstance>()

  const {
    data,
    isFetching,
    refetch: refetchGetSupplierList,
  } = useQuery('getSupplierList', () => getSupplierListApi(), {
    enabled: false,
  })

  const onSubmit = () => {
    handleSearch(form)
  }

  useEffect(() => {
    refetchGetSupplierList()
  }, [])

  return (
    <div className={styles.commodityForm}>
      <Form
        title="搜索条件"
        form={form}
        layout="inline"
        autoComplete="off"
        onFinish={onSubmit}
      >
        <Form.Item label="商品名称" name="goodsName">
          <Input placeholder="请输入商品名称" />
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
