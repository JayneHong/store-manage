import React, { FC, useEffect, useState } from 'react'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
  SettingOutlined,
  SolutionOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import { Layout, Menu, MenuProps, theme } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

/**  左侧主菜单 */
const LayoutMenu: FC = () => {
  const navigateTo = useNavigate()

  const currentRoute = useLocation()

  const [openKeys, setOpenKeys] = useState([currentRoute.pathname])

  const onMenuClick = ({ key }: any) => {
    navigateTo(key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys([keys[keys.length - 1]])
  }

  useEffect(() => {
    const firstPath = '/' + currentRoute.pathname.split('/')[1]
    setOpenKeys([firstPath])
  }, [])

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[currentRoute.pathname]}
      onClick={onMenuClick}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      items={[
        {
          key: '/home',
          icon: <HomeOutlined />,
          label: '首页',
        },
        {
          key: '/commodityManage',
          icon: <ShopOutlined />,
          label: '商品信息管理',
          children: [
            {
              key: '/commodityManage/commodity',
              label: '商品管理',
            },
            {
              key: '/commodityManage/classified',
              label: '商品分类',
            },
          ],
        },
        {
          key: '/inventoryManage',
          icon: <ShopOutlined />,
          label: '库存管理',
          children: [
            {
              key: '/inventoryManage/inventory',
              label: '库存信息',
            },
            {
              key: '/inventoryManage/inventoryWarning',
              label: '库存预警',
            },
            {
              key: '/inventoryManage/expiredWarning',
              label: '临期预警',
            },
          ],
        },
        {
          key: '/customerManage',
          icon: <UserOutlined />,
          label: '客户管理',
          children: [
            {
              key: '/customerManage/customer',
              label: '客户管理',
            },
          ],
        },
        {
          key: '/supplierManage',
          icon: <SolutionOutlined />,
          label: '供应商管理',
          children: [
            {
              key: '/supplierManage/supplier',
              label: '供应商管理',
            },
          ],
        },
        {
          key: '/visualized',
          icon: <BarChartOutlined />,
          label: '可视化统计',
          children: [
            {
              key: '/visualized/index',
              label: '图表分析',
            },
          ],
        },
        {
          key: '/system',
          icon: <SettingOutlined />,
          label: '系统管理',
          children: [
            {
              key: '/system/users',
              label: '用户管理',
            },
            {
              key: '/system/roles',
              label: '角色管理',
            },
          ],
        },
      ]}
    />
  )
}

export default LayoutMenu
