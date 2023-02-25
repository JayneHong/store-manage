import { useState } from 'react'
import { Table, Button, Space, Input } from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/_bak/api'
import SupplierModal from './components/SupplierModal'

const { Search } = Input

/** 供应商管理 */
const SupplierManage = () => {
  const dispatch = useAppDispatch()
  const state = useSelector<RootState>((state) => state.counter.count)

  const [showAddUserModal, setShowAddUserModal] = useState(false)

  const [tableDataSource, changeTableDataSource] = useState([
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '供应商名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '供应商地址',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '供应商电话',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '邮编',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '联系人',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '联系电话',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '开户银行',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '银行账户',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '联系电话',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '是否可用',
      dataIndex: 'age',
      key: 'age',
    },
  ]
  const handleAdd = () => {
    console.log('添加')
    changeTableDataSource([
      ...tableDataSource,
      {
        key: `${tableDataSource.length + 1}`,
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ])
  }

  const { data, isLoading, isError, status, refetch } = useQuery(
    'handleCaptcha',
    () => http.get('/prod-api/captchaImage'),
    { enabled: false }
  )

  console.log('状态', isLoading, status)

  const hanldeRequest = () => {
    // http.get('/prod-api/captchaImage').then((res) => {
    //   console.log('=============', res)
    // })
    refetch()
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div style={{ height: '100%' }}>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search placeholder="请输入用户名" allowClear />
          <Button onClick={() => setShowAddUserModal(true)} type="primary">
            添加用户
          </Button>
        </Space>
      </header>

      {/* <span>{state}</span> */}
      <Table
        // style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
        // scroll={{x: 'max-context', y: 300}}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={tableDataSource}
        columns={columns}
      />

      <SupplierModal
        visible={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  )
}

export default SupplierManage
