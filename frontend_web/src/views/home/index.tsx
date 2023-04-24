import { useEffect, useRef, useState } from 'react'
import { Row, Button } from 'antd'
import BG from '@/assets/th.jpeg'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const goPage = () => {
    navigate('/inventoryManage/inventoryWarning')
  }
  return (
    <div className={styles.home}>
      <div className={styles.bg} />
      <div className={styles.container}>
        <h1>欢迎登录系统：Admin</h1>
        <div>
          公告：有商品库存不足存在预警
          <Button type="link" onClick={goPage}>
            去处理
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
