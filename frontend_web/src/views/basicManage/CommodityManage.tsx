import { useCallback, useState } from 'react'
import {
  Table,
  Button,
  Space,
  Input,
  Tooltip,
  Select,
  Divider,
  FormInstance,
} from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/api'
import CommodityModal from './components/CommodityModal'
import CommodityForm from './components/CommodityForm'

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
      title: '编号',
      dataIndex: 'name',
      width: '80px',
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
      title: '操作',
      key: 'action',
      width: '180px',
      fixed: 'right',
      render: () => {
        return (
          <Space size={10}>
            <Tooltip title="编辑">
              <Button size="small" type="primary" icon={<EditOutlined />}>
                编辑
              </Button>
            </Tooltip>
            <Tooltip title="删除">
              <Button size="small" type="primary" icon={<DeleteOutlined />}>
                删除
              </Button>
            </Tooltip>
          </Space>
        )
      },
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

  //  重置
  const handleReset = useCallback((form: FormInstance) => {
    form.resetFields()
  }, [])

  // 搜素
  const handleSearch = useCallback(async (form: FormInstance) => {
    try {
      const values = await form.validateFields()
      console.log('====================================')
      console.log(values)
      console.log('====================================')
    } catch (error) {}
  }, [])

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <CommodityForm handleReset={handleReset} handleSearch={handleSearch} />
        <Divider />
        <Space size={20}>
          <Button
            onClick={() => setShowAddUserModal(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            添加商品
          </Button>
        </Space>
      </header>

      {/* <span>{state}</span> */}
      <Table
        // style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
        scroll={{ x: '1600px' }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={tableDataSource}
        columns={columns}
      />

      <CommodityModal
        visible={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  )
}

export default CommodityManage
