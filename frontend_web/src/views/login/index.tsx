import LoginForm from './components/LoginForm'
import loginLeft from '@/assets/images/login_left.png'
import logo from '@/assets/images/logo.png'
import styles from './index.module.scss'

const Login = () => {
  return (
    <div className={styles['login-container']}>
      {/* <SwitchDark /> */}
      <div className={styles['login-box']}>
        <div className={styles['login-left']}>
          <img src={loginLeft} alt="login" />
        </div>
        <div className={styles['login-form']}>
          <div className={styles['login-logo']}>
            <img className={styles['login-icon']} src={logo} alt="logo" />
            <span className={styles['logo-text']}>管理系统</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
