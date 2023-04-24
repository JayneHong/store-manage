import { useEffect, useMemo, useRef, useState } from 'react'
import { Col, Row } from 'antd'
import * as echarts from 'echarts'
import { useQuery } from 'react-query'
import { getGoodsListApi } from '@/_bak/api/modules/goods'

const Page1 = () => {
  const barEchartRef = useRef(null)
  const barEchartRef1 = useRef(null)
  const pieEchartRef = useRef(null)

  const barInstanceRef = useRef<echarts.ECharts>(null)
  const barInstanceRef1 = useRef<echarts.ECharts>(null)
  const pieInstanceRef = useRef<echarts.ECharts>(null)

  const { data, refetch: refetchGetGoodsList } = useQuery(
    'getGoodsList',
    getGoodsListApi,
    { enabled: false }
  )

  const classifiedData = useMemo(() => {
    const d = (data?.data || []) as any
    const xAxisData = d.map((item: any) => item.goodsName)
    const typeMap = {}
    d.forEach((item: any) => {
      if (!typeMap[item.claasifiedName]) {
        typeMap[item.claasifiedName] = {
          name: item.claasifiedName ?? '未分类',
          value: 0,
        }
      } else {
        typeMap[item.claasifiedName].value += 1
      }
    })

    const seriesData = d.map((item: any) => ({
      name: item.goodsName,
      value: item.inventory,
    }))

    const sortSeriesData = seriesData
      .sort((a, b) => b.value - a.value)
      ?.slice(0, 10)
    console.log('xxxxxx', sortSeriesData)

    return { xAxisData, seriesData, typeMap, sortSeriesData }
  }, [data])

  var barOption = {
    title: {
      text: '最近上新',
    },
    tooltip: {},
    legend: {
      data: classifiedData?.xAxisData || [],
    },
    xAxis: {
      data: Object.keys(classifiedData?.typeMap || {}) || [],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: Object.values(classifiedData?.typeMap || {}) || [],
      },
    ],
  }

  var barOption1 = {
    title: {
      text: '热销商品Top10',
    },
    tooltip: {},
    xAxis: {
      data:
        classifiedData?.sortSeriesData?.map((d: any) => {
          return d.name.length > 5 ? `${d.name}...` : d.name
        }) || [],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: classifiedData.sortSeriesData || [],
      },
    ],
  }

  const pieOption = {
    title: {
      text: '商品分类统计',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: '0%',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: Object.values(classifiedData?.typeMap || {}) || [],
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
    refetchGetGoodsList()
    if (!barInstanceRef1.current) {
      barInstanceRef1.current = echarts.init(barEchartRef1.current as any)
    } else {
      barInstanceRef1.current.dispose()
    }
    if (!barInstanceRef.current) {
      barInstanceRef.current = echarts.init(barEchartRef.current as any)
    } else {
      barInstanceRef.current.dispose()
    }
    if (!pieInstanceRef.current) {
      pieInstanceRef.current = echarts.init(pieEchartRef.current as any)
    } else {
      pieInstanceRef.current.dispose()
    }
  }, [])

  useEffect(() => {
    barInstanceRef1.current.setOption(barOption1)
    barInstanceRef.current.setOption(barOption)
    pieInstanceRef.current.setOption(pieOption)
  }, [data])

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
      <Row justify="space-between">
        <Col span={24}>
          <div ref={barEchartRef1} style={{ width: '100%', height: 400 }} />
        </Col>
      </Row>
    </div>
  )
}

export default Page1
