import { useState, useRef } from 'react'
import { Table, Button, Space, Input, Popconfirm, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  deleteSupplierApi,
  getSupplierListApi,
} from '@/_bak/api/modules/supplier'
import SupplierModal from './components/SupplierModal'
import styles from './SupplierManage.module.scss'

const { Search } = Input

/** 供应商管理 */
const SupplierManage = () => {
  const [showModal, setShowModal] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const keywordef = useRef('')

  const {
    data,
    isFetching,
    refetch: refetchGetSupplierList,
  } = useQuery(
    'getSupplierList',
    () => getSupplierListApi({ keyword: keywordef.current }),
    {
      enabled: false,
    }
  )
  const { mutate } = useMutation((params) => deleteSupplierApi(params), {
    onSuccess: () => refetchGetSupplierList(),
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
      title: '供应编码',
      dataIndex: 'supplierCode',
      key: 'supplierCode',
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: '供应商地址',
      width: '20%',
      dataIndex: 'supplierAddress',
      key: 'supplierAddress',
    },
    {
      title: '邮编',
      width: '100px',
      dataIndex: 'emal',
      key: 'emal',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系电话',
      width: '150px',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
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
    <div className={styles.supplierManage}>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search
            placeholder="请输入供应商名称搜索"
            allowClear
            onSearch={(value) => {
              keywordef.current = value
              refetchGetSupplierList()
            }}
          />
          <Button onClick={() => setShowModal(true)} type="primary">
            添加供应商
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
      <SupplierModal
        echoData={updateData}
        visible={showModal}
        onClose={(isQuery) => {
          setShowModal(false)
          setUpdateData(null)
          if (isQuery) {
            refetchGetSupplierList()
          }
        }}
      />
    </div>
  )
}

export default SupplierManage
