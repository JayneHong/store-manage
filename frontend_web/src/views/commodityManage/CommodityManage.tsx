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
import { useEffect } from 'react'

/** 商品管理 */
const CommodityManage = () => {
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

  // 删除某个商品
  const { mutate } = useMutation((params) => deleteGoodsApi(params), {
    onSuccess: () => refetchGetGoodsList(),
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
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '商品图片',
      dataIndex: 'goodsImage',
      key: 'goodsImage',
      width: 150,
      align: 'center',
      render: (url) => {
        return <Image style={{ width: 120, height: 120 }} src={url}></Image>
      },
    },
    {
      title: '商品分类',
      dataIndex: 'claasifiedName',
      key: 'claasifiedName',
    },
    {
      title: '产地',
      dataIndex: 'yieldly',
      key: 'yieldly',
    },
    {
      title: '供应商',
      dataIndex: 'supplierName',
      key: 'supplierName',
    },
    {
      title: '生产日期',
      dataIndex: 'productiveTime',
      key: 'productiveTime',
    },
    {
      title: '过期时间',
      dataIndex: 'expirationTime',
      key: 'expirationTime',
    },
    {
      title: '包装',
      dataIndex: 'packaging',
      key: 'packaging',
    },
    {
      title: '规格',
      dataIndex: 'specification',
      key: 'specification',
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory',
    },
    {
      title: '销售价格',
      dataIndex: 'salePrice',
      key: 'salePrice',
    },
    {
      title: '进货价格',
      dataIndex: 'costPrice',
      key: 'costPrice',
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

  //  重置
  const handleReset = useCallback((form: FormInstance) => {
    form.resetFields()
  }, [])

  // 搜素
  const handleSearch = useCallback(async (form: FormInstance) => {
    try {
      // 获取搜索表单数据
      const values = await form.validateFields()
      // 设置搜索关键字数据
      keywordef.current = values.goodsName
      // 获取过滤后的商品信息列表
      refetchGetGoodsList()
    } catch (error) {}
  }, [])

  useEffect(() => {
    refetchGetGoodsList()
  }, [])

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        {/* 搜索表单组件 */}
        <CommodityForm handleReset={handleReset} handleSearch={handleSearch} />
        <Divider />
        <Space size={20}>
          <Button
            onClick={() => setShowModal(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            添加商品
          </Button>
        </Space>
      </header>
      {/* 商品信息table */}
      <Table
        loading={isFetching}
        scroll={{ x: 1600 }}
        rowClassName={() => 'editable-row'}
        bordered
        rowKey="_id"
        dataSource={data?.data as any[]}
        columns={columns}
      />
      {/* 添加、修改商品信息弹窗 */}
      <CommodityModal
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

export default CommodityManage
