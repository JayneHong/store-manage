import { useState } from 'react'
import { Table, Button, Space, Input } from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/api'
import AddUserMOdal from './components/AddUserModal'

const { Search } = Input

/** 商品管理 */
const CommodityManage = () => {
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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
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

      <AddUserMOdal
        visible={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  )
}

export default CommodityManage
