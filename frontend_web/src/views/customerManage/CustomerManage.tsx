import { useState, useRef } from 'react'
import { Table, Button, Space, Input, Popconfirm, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  deleteCustomerApi,
  getCustomerListApi,
} from '@/_bak/api/modules/customer'
import CustomerModal from './components/CustomerModal'
import styles from './CustomerManage.module.scss'

const { Search } = Input

/** 供应商管理 */
const CustomerManage = () => {
  const [showModal, setShowModal] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const keywordef = useRef('')

  const {
    data,
    isFetching,
    refetch: refetchGetCustomerList,
  } = useQuery(
    'getCustomerList',
    () => getCustomerListApi({ keyword: keywordef.current }),
    {
      enabled: false,
    }
  )
  const { mutate } = useMutation((params) => deleteCustomerApi(params), {
    onSuccess: () => refetchGetCustomerList(),
    onSettled: (data, error) => {
      error ? message.error(data?.msg) : message.success(data?.msg)
    },
  })

  const columns: ColumnsType<any[]> = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      key: 'number',
      render: (_text, _record, index) => {
        return `${index + 1}`
      },
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '客户地址',
      width: '15%',
      dataIndex: 'customerAddress',
      key: 'customerAddress',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系电话',
      width: '130px',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
    },
    {
      title: '开户银行',
      width: '20%',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '银行账户',
      width: '150px',
      dataIndex: 'bankAccount',
      key: 'bankAccount',
    },
    {
      title: '操作',
      key: 'action',
      width: '180px',
      fixed: 'right',
      render: (record) => {
        return (
          <Space size={10}>
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setUpdateData(record)
                setShowModal(true)
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="温馨提示"
              placement="topLeft"
              description="确定要删除当前数据吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                const params = { id: record['_id'] } as any
                mutate(params)
              }}
            >
              <Button size="small" type="primary" icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <div className={styles.customerManage}>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search
            placeholder="请输入客户名称搜索"
            allowClear
            onSearch={(value) => {
              keywordef.current = value
              refetchGetCustomerList()
            }}
          />
          <Button onClick={() => setShowModal(true)} type="primary">
            添加客户
          </Button>
        </Space>
      </header>
      <Table
        loading={isFetching}
        rowClassName={() => 'editable-row'}
        bordered
        rowKey="_id"
        dataSource={data?.data as any[]}
        columns={columns}
      />
      <CustomerModal
        echoData={updateData}
        visible={showModal}
        onClose={(isQuery) => {
          setShowModal(false)
          setUpdateData(null)
          if (isQuery) {
            refetchGetCustomerList()
          }
        }}
      />
    </div>
  )
}

export default CustomerManage
