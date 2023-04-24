import React, { FC } from 'react'
import { Layout, Avatar, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import vatar from '@/assets/images/avatar.png'

const { Header } = Layout

/**  布局头部 */
const LayoutHeader: FC = () => {
  const navigateTo = useNavigate()

  const handleLogOut = () => {
    navigateTo('/login')
  }

  return (
    <Header className={styles.header}>
      {/* <span className={styles.title}>超市仓库管理系统</span> */}
      <div className={styles.userLogo}>
        <span>欢迎您：</span>
        <Avatar className={styles.avatar} src={vatar} />
        <Button type="link" onClick={handleLogOut}>
          退出
        </Button>
      </div>
    </Header>
  )
}

export default LayoutHeader
