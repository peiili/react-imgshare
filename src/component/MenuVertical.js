import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  UnorderedListOutlined,
  UploadOutlined,
  PictureOutlined,
  UserOutlined,
} from '@ant-design/icons'
// const { SubMenu } = Menu
function MenuCom(props) {
  // console.log(props.currentSelect)
  function selectItem(arr) {
    props.currentSelect(arr.key)
  }
  return (
    <div id="MenuVertical">
      <div className="logo">
        <img
          src="http://statich5.dlsjf.top/tmp/logo.png"
          alt=""
          style={{ width: '40px' }}
        ></img>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['文件上传']}
        mode="inline"
        onSelect={selectItem}
      >
        <Menu.Item key="文件上传">
          <Link to="/Admin/Upload">
            <UploadOutlined />
            <span>文件上传</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="个人页">
          <Link to="/Admin/User">
            <UserOutlined />
            <span>个人页</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="活动列表">
          <Link to="/Admin/Active">
            <UnorderedListOutlined />
            <span>活动列表</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="全景管理">
          <Link to="/Admin/FullViewAdmin">
            <PictureOutlined />
            <span>全景管理</span>
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
    </div>
  )
}
export default MenuCom
