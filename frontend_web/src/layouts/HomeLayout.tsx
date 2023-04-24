import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/layoutMenu'
import LayoutHeader from '@/components/layoutHeader'
import styles from './index.module.scss'

const { Sider, Content } = Layout

const HomeLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className={styles['home-layout']}>
      {/* 左侧sider */}
      <Sider
        className={styles['layout-sider']}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        {/* logo */}
        <div className="logo">超市仓库管理系统</div>
        {/* 菜单 */}
        <MainMenu />
      </Sider>
      <Layout className="site-layout">
        {/* 头部 */}
        <LayoutHeader />
        {/* 右侧内容 */}
        <Content className={styles['layout-content']}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default HomeLayout
