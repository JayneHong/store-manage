import React, { FC, useEffect, useState } from 'react'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
          key: '/page1',
          icon: <VideoCameraOutlined />,
          label: '超级表格',
          children: [
            {
              key: '/page3',
              icon: <VideoCameraOutlined />,
              label: '子页面1',
            },
            {
              key: '/page4',
              icon: <VideoCameraOutlined />,
              label: '子页面2',
            },
            {
              key: '/page5',
              icon: <VideoCameraOutlined />,
              label: '子页面3',
            },
          ],
        },
        {
          key: '/users',
          icon: <UserOutlined />,
          label: '用户管理',
          children: [
            {
              key: '/users/index',
              // icon: <VideoCameraOutlined />,
              label: '用户列表',
            },
          ],
        },
        {
          key: '/basicManage',
          icon: <UserOutlined />,
          label: '基本管理',
          children: [
            {
              key: '/basicManage/customer',
              // icon: <VideoCameraOutlined />,
              label: '客户管理',
            },
            {
              key: '/basicManage/commodity',
              // icon: <VideoCameraOutlined />,
              label: '商品管理',
            },
            {
              key: '/basicManage/supplier',
              // icon: <VideoCameraOutlined />,
              label: '供应商管理',
            },
          ],
        },
      ]}
    />
  )
}

export default LayoutMenu
