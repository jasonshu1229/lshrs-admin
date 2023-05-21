import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Button, theme } from 'antd'

import LayoutMenu from './components/Menu'
import Logo from './components/Menu/components/Logo'

import './index.less'

const { Header, Sider, Content } = Layout

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

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
          Content
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
