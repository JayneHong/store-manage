import { useEffect, useRef, useState } from 'react'
import { Table, Button, Space, Col, Row } from 'antd'
import * as echarts from 'echarts'
import { useQuery } from 'react-query'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/stores/counter'
import { RootState, useAppDispatch } from '@/stores'
import http from '@/_bak/api'

const Page1 = () => {
  const dispatch = useAppDispatch()
  const state = useSelector<RootState>((state) => state.counter.count)
  const barEchartRef = useRef(null)
  const pieEchartRef = useRef(null)

  var barOption = {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  }

  const pieOption = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  useEffect(() => {
    echarts.init(barEchartRef.current as any).setOption(barOption)
    echarts.init(pieEchartRef.current as any).setOption(pieOption)
  }, [])

  return (
    <div>
      <Row justify="space-between">
        <Col span={12}>
          <div ref={barEchartRef} style={{ width: 500, height: 400 }} />
        </Col>
        <Col span={12}>
          <div ref={pieEchartRef} style={{ width: 500, height: 400 }} />
        </Col>
      </Row>
    </div>
  )
}

export default Page1
