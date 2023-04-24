import { useState } from 'react'
import LoginForm from './components/LoginForm'
import loginLeft from '@/assets/images/login_left.png'
import logo from '@/assets/images/logo.png'
import styles from './index.module.scss'
import RetrieveModal from './components/RetrieveModal'

const Login = () => {
  const [showRetrieveModal, setShowRetrieveModal] = useState(false)
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <div className={styles['login-left']}>
          <img src={loginLeft} alt="login" />
        </div>
        <div className={styles['login-form']}>
          <div className={styles['login-logo']}>
            <img className={styles['login-icon']} src={logo} alt="logo" />
            <span className={styles['logo-text']}>超市仓库管理系统</span>
          </div>
           {/* 登录form表单 */}
          <LoginForm retrievePassword={() => setShowRetrieveModal(true)} />
        </div>
      </div>
      {/* 找回密码弹窗 */}
      <RetrieveModal
        visible={showRetrieveModal}
        onClose={() => setShowRetrieveModal(false)}
      />
    </div>
  )
}

export default Login
