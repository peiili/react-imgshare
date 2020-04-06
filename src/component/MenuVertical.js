import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import {
  DesktopOutlined,
  PieChartOutlined,
  UploadOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { SubMenu } = Menu
function MenuCom(props) {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
        <Link to="/Admin/Upload">
          <UploadOutlined />
          <span>文件上传</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/Admin/User">
          <UserOutlined />
          <span>个人页</span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="2">
        <DesktopOutlined />
        <span>Option 2</span>
      </Menu.Item>
      <SubMenu
        key="sub1"
        title={
          <span>
            <UserOutlined />
            <span>User</span>
          </span>
        }
      >
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <TeamOutlined />
            <span>Team</span>
          </span>
        }
      >
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9">
        <FileOutlined />
      </Menu.Item> */}
    </Menu>
  )
}

export default MenuCom
