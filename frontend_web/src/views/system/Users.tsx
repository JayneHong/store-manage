import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Input, Popconfirm, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  getUserListApi,
  deleteUserApi,
  getRoleListApi,
} from '@/_bak/api/modules/user'
import AddUserModal from './components/AddUserModal'

const { Search } = Input

const Users = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [updateUserData, setUpdateUserData] = useState(null)
  const keywordef = useRef('')

  const { data: roleData, refetch: refetchGetRoleList } = useQuery(
    'getRoleList',
    getRoleListApi,
    { enabled: false }
  )

  const {
    data,
    isFetching,
    refetch: refetchGetUserList,
  } = useQuery(
    'getUserList',
    () => getUserListApi({ keyword: keywordef.current }),
    {
      enabled: false,
    }
  )
  const { mutate } = useMutation((params) => deleteUserApi(params), {
    onSuccess: () => refetchGetUserList(),
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
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'roleCode',
      key: 'roleCode',
      render: (text) => {
        const roleDicts = roleData?.data as {
          roleName: string
          roleCode: string
        }[]
        const roleItem = roleDicts?.find((d) => d.roleCode === text)
        return roleItem?.roleName || '-'
      },
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text) => text || '-',
    },
    {
      title: '住址',
      dataIndex: 'address',
      render: (text) => text || '-',
      key: 'address',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      width: 160,
      render: (text) => text || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 160,
      render: (text) => text || '-',
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
                setUpdateUserData(record)
                setShowAddUserModal(true)
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
                const username = { username: record.username } as any
                mutate(username)
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

  useEffect(() => {
    refetchGetUserList()
    refetchGetRoleList()
  }, [])

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search
            placeholder="请输入用户名搜索"
            allowClear
            onSearch={(value) => {
              keywordef.current = value
              refetchGetUserList()
            }}
          />
          <Button onClick={() => setShowAddUserModal(true)} type="primary">
            添加用户
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
      <AddUserModal
        echoData={updateUserData}
        visible={showAddUserModal}
        onClose={(isQuery) => {
          setShowAddUserModal(false)
          setUpdateUserData(null)
          if (isQuery) {
            refetchGetUserList()
          }
        }}
      />
    </div>
  )
}

export default Users
