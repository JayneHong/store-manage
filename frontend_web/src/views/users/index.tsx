import { useEffect, useState } from 'react'
import { Table, Button, Space, Input } from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import { getUserListApi } from '@/api/modules/user'
import AddUserMOdal from './components/AddUserModal'

const { Search } = Input

const Users = () => {
  const dispatch = useAppDispatch()
  const state = useSelector<RootState>((state) => state.counter.count)

  const [showAddUserModal, setShowAddUserModal] = useState(false)

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
  ]
  const handleAdd = () => {}

  const { data, isLoading } = useQuery('getUserList', () => {
    return getUserListApi()
  })

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search placeholder="请输入用户名" allowClear />
          <Button onClick={() => setShowAddUserModal(true)} type="primary">
            添加用户
          </Button>
        </Space>
      </header>
      <Table
        // style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
        // scroll={{ x: 'max-context', y: 300 }}
        loading={isLoading}
        rowClassName={() => 'editable-row'}
        bordered
        rowKey="_id"
        dataSource={data?.data as any[]}
        columns={columns}
      />

      <AddUserMOdal
        visible={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  )
}

export default Users
