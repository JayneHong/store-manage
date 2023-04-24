import { useCallback, useState } from 'react'
import {
  Table,
  Button,
  Space,
  Divider,
  FormInstance,
  message,
  Popconfirm,
  Image,
} from 'antd'
import { useMutation, useQuery } from 'react-query'
import { ColumnsType } from 'antd/es/table'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { deleteGoodsApi, getGoodsListApi } from '@/_bak/api/modules/goods'
import CommodityModal from './components/CommodityModal'
import CommodityForm from './components/CommodityForm'
import { useRef } from 'react'

/** 商品库存管理 */
const InventoryManage = () => {
  const [showModal, setShowModal] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const keywordef = useRef('')

  // 获取商品信息列表
  const {
    data,
    isFetching,
    refetch: refetchGetGoodsList,
  } = useQuery(
    'getGoodsList',
    () => getGoodsListApi({ keyword: keywordef.current }),
    {
      enabled: false,
    }
  )

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
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '供应商',
      dataIndex: 'yieldly',
      key: 'yieldly',
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory',
    },
    {
      title: '预警值',
      dataIndex: 'inventoryValue',
      key: 'inventoryValue',
      render: (_text, _record) => {
        return 100
      },
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
              添加库存
            </Button>
          </Space>
        )
      },
    },
  ]

  const list = (data?.data as any[]) || []
  const dataSource = list.filter((d: any) => {
    return d.inventory < 100
  })

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ color: 'red', fontSize: 20 }}>以下商品库存不足</h2>
      </header>
      {/* 商品信息table */}
      <Table
        loading={isFetching}
        bordered
        rowKey="_id"
        dataSource={dataSource}
        columns={columns}
      />
      {/* 添加、修改商品信息弹窗 */}
      <CommodityModal
        inventory
        echoData={updateData}
        visible={showModal}
        onClose={(isQuery) => {
          setShowModal(false)
          setUpdateData(null)
          if (isQuery) {
            refetchGetGoodsList()
          }
        }}
      />
    </div>
  )
}

export default InventoryManage
