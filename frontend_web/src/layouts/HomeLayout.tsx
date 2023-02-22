import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/layoutMenu'
import styles from './index.module.scss'

const { Header, Sider, Content } = Layout

const HomeLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const colorBgContainer = '#fff'

  return (
    <Layout className={styles['home-layout']}>
      <Sider
        className={styles['layout-sider']}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <MainMenu />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff', height: 55 }}></Header>
        <Content
        className={styles['layout-content']}
          // style={{
          //   margin: '20px 16px',
          //   padding: 20,
          //   flex: 1,
          //   height: 'calc(100vh - 95px)',
          //   overflowY: 'auto',
          //   background: colorBgContainer,
          // }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default HomeLayout
