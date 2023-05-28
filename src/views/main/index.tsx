import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, theme } from 'antd'
import { useNavigate } from 'react-router-dom'

import LayoutMenu from './components/Menu'
import Logo from './components/Menu/components/Logo'

import './index.less'
import { LOGIN_PATH } from '@/global/constants'
import { persistor } from '@/store'
import { shallowAppEqual, useAppDispatch, useAppSelector } from '@/store/hooks'
import { changeRememberStatus } from '@/store/modules/user'

const { Header, Sider, Content } = Layout

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isRemember = useAppSelector(
    (state) => state.user.isRemember,
    shallowAppEqual
  )

  const handleLogout = () => {
    if (!isRemember) {
      persistor.purge()
      return
    }
    dispatch(changeRememberStatus(isRemember))
    navigate(LOGIN_PATH)
  }

  return (
    <Layout hasSider>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <button onClick={() => handleLogout()}>退出登录</button>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
