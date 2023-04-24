import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Input, Popconfirm, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getRoleListApi, deleteRoleApi } from '@/_bak/api/modules/user'
import AddRoleModal from './components/AddRoleModal'

const { Search } = Input

const Users = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [updateRoleData, setUpdateRoleData] = useState(null)
  const keywordef = useRef('')
  const {
    data,
    isFetching,
    refetch: refetchGetUserList,
  } = useQuery(
    'getRoleList',
    () => getRoleListApi({ keyword: keywordef.current }),
    {
      enabled: false,
    }
  )

  const { mutate } = useMutation((params) => deleteRoleApi(params), {
    onSuccess: () => refetchGetUserList(),
    onSettled: (data, error) => {
      error ? message.error(data?.msg) : message.success(data?.msg)
    },
  })

  const columns: ColumnsType<any[]> = [
    {
      title: '序号',
      key: 'number',
      align: 'center',
      width: 80,
      render: (_text, _record, index) => {
        return `${index + 1}`
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || '-',
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
                setUpdateRoleData(record)
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
                const params = {
                  roleName: record.roleName,
                  roleCode: record.roleCode,
                } as any
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

  useEffect(() => {
    refetchGetUserList()
  }, [])

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search
            placeholder="请输入角色名称搜索"
            allowClear
            onSearch={(value) => {
              keywordef.current = value
              refetchGetUserList()
            }}
          />
          <Button onClick={() => setShowAddUserModal(true)} type="primary">
            添加角色
          </Button>
        </Space>
      </header>
      <Table
        // style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
        scroll={{ x: '1000px' }}
        loading={isFetching}
        rowClassName={() => 'editable-row'}
        bordered
        rowKey="_id"
        dataSource={data?.data as any[]}
        columns={columns}
      />
      <AddRoleModal
        echoData={updateRoleData}
        visible={showAddUserModal}
        onClose={(isQuery) => {
          setShowAddUserModal(false)
          setUpdateRoleData(null)
          if (isQuery) {
            refetchGetUserList()
          }
        }}
      />
    </div>
  )
}

export default Users
