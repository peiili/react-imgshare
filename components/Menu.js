import React from 'react'
import { Menu, Avatar } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
function MenuCom(props) {
  const router = useRouter()
  return (
    <Menu className="menuStyle" mode="horizontal" theme="dark" defaultSelectedKeys={[router.pathname]}>
      <Menu.Item key="/Home/Imgblock">
        <Link href="/Home/Imgblock">首页</Link>
      </Menu.Item>
      <Menu.Item key="/Home/Blog">
        <Link href="/Home/Blog">博客</Link>
      </Menu.Item>
      <Menu.Item key="/Home/photo">
        <Link href="/Home/tools">排版</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Avatar
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        ></Avatar>
      </Menu.Item>
    </Menu>
  )
}

export default MenuCom
