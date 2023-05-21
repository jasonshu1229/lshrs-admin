import React, { useState } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons'

import './index.less'

const LayoutMenu = () => {
  const [openKeys, setOpenKeys] = useState(['sub1'])

  type MenuItem = Required<MenuProps>['items'][number]

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem
  }

  const items: MenuItem[] = [
    getItem('系统总览', 'sub1', <MailOutlined />, [
      getItem('核心技术', '1'),
      getItem('商品统计', '2')
    ]),
    getItem('系统管理', 'sub2', <AppstoreOutlined />, [
      getItem('用户管理', '5'),
      getItem('部门管理', '6'),
      getItem('菜单管理', 'sub3', null, [
        getItem('Option 7', '7'),
        getItem('Option 8', '8')
      ])
    ]),
    getItem('商品中心', 'sub4', <SettingOutlined />, [
      getItem('商品类别', '9'),
      getItem('商品信息', '10')
    ])
  ]

  // submenu keys of first level
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <div className="menu">
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
    </div>
  )
}

export default LayoutMenu
