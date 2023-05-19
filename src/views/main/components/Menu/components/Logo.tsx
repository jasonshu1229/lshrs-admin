import React from 'react'
import logo from '@/assets/images/logo.png'

const Logo = () => {
  return (
    <div className="logo-box">
      <img src={logo} className="logo-img" alt="logo" />
      <h2 className="logo-text">Lsh Admin</h2>
    </div>
  )
}

export default Logo
