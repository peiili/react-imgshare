import React from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'antd'
import Link from 'next/link'
// import logo from '@/assets/img/logo.png'
import {  UnorderedListOutlined } from '@ant-design/icons'
// const { SubMenu } = Menu

function MenuCom(props) {
  const router = useRouter()
  function selectItem(arr) {
    props.currentSelect(arr.key)
  }

  return (
    <div id="MenuVertical">
      <div className="logo">
        {/* <img src={logo} alt="" style={{ width: '40px' }}></img> */}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[router.pathname]}
        mode="inline"
        onSelect={selectItem}
      >
        <Menu.Item key="/Admin/Article">
          <Link href="/Admin/Article">
            {/* <UnorderedListOutlined /> */}
            <span>文章</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/Admin/Active">
          <Link href="/Admin/Active">
            {/* <UnorderedListOutlined /> */}
            <span>活动列表</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
export default MenuCom
