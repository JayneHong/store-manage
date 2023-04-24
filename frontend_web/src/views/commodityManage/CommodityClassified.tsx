import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Input, Popconfirm, message } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  getGoodsClassifiedListApi,
  deleteGoodsClassifiedApi,
} from '@/_bak/api/modules/goodsClassified'
import AddClassifiedModal from './components/AddClassifiedModal'

const { Search } = Input

/** 商品分类管理 */
const CommodityClassified = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [updateRoleData, setUpdateRoleData] = useState(null)
  const keywordef = useRef('')
  const {
    data,
    isFetching,
    refetch: refetchGetGoodsClassifiedList,
  } = useQuery(
    'getGoodsClassifiedList',
    () => getGoodsClassifiedListApi({ keyword: keywordef.current }),
    {
      enabled: false,
    }
  )

  const { mutate } = useMutation((params) => deleteGoodsClassifiedApi(params), {
    onSuccess: () => refetchGetGoodsClassifiedList(),
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
      title: '分类名称',
      dataIndex: 'claasifiedName',
      key: 'claasifiedName',
    },
    {
      title: '分类编码',
      dataIndex: 'claasifiedCode',
      key: 'claasifiedCode',
    },
    {
      title: '分类级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      align: 'center',
      render: (text) => `${text}级` || '-',
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
    refetchGetGoodsClassifiedList()
  }, [])

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <Space size={20}>
          <Search
            placeholder="请输入商品分类名称搜索"
            allowClear
            onSearch={(value) => {
              keywordef.current = value
              refetchGetGoodsClassifiedList()
            }}
          />
          <Button onClick={() => setShowAddUserModal(true)} type="primary">
            添加商品分类
          </Button>
        </Space>
      </header>
      <Table
        // style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
        // scroll={{ x: '1000px' }}
        loading={isFetching}
        rowClassName={() => 'editable-row'}
        bordered
        rowKey="_id"
        dataSource={data?.data as any[]}
        columns={columns}
      />
      <AddClassifiedModal
        echoData={updateRoleData}
        visible={showAddUserModal}
        onClose={(isQuery) => {
          setShowAddUserModal(false)
          setUpdateRoleData(null)
          if (isQuery) {
            refetchGetGoodsClassifiedList()
          }
        }}
      />
    </div>
  )
}

export default CommodityClassified
