import React from 'react'
import LoginForm from './components'
import loginLeft from '@/assets/images/login_left.png'
import loginIcon from '@/assets/images/logo.png'
import './index.less'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img src={loginLeft} alt="login" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img className="login-icon" src={loginIcon} alt="logo" />
            <span className="logo-text">Lsh-Admin</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
