import { useState } from 'react'
import { Table, Button, Space } from 'antd'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/api'

const Page1 = () => {
  const dispatch = useAppDispatch()
  const state = useSelector<RootState>((state) => state.counter.count)
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
      <Space size={5}>
        <Button type="primary" onClick={() => handleAdd()}>
          添加速度速度速度是多少
        </Button>
        {/* <Button
          onClick={() => dispatch(increment())}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加数据
        </Button>
        <Button
          onClick={() => dispatch(decrement())}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          删除数据
        </Button> */}
        <Button
          onClick={() => dispatch(incrementByAmount(100))}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          自定义数据
        </Button>
        <Button type="primary" onClick={hanldeRequest}>
          请求数据
        </Button>
      </Space>
      {/* <span>{state}</span> */}
      <Table
        // style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}
        // scroll={{x: 'max-context', y: 300}}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={tableDataSource}
        columns={columns}
      />
    </div>
  )
}

export default Page1
