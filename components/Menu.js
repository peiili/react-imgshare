import React from 'react'
import { Menu, Avatar } from 'antd'
import Link from 'next/link'
import Observe from '@/tools/Observe'
function MenuCom(props) {
  const onSwitch = function ({ item, key, keyPath, domEvent }) {
    Observe.fire('loading', true)
  }
  return (
    <Menu
      className="menuStyle"
      mode="horizontal" theme="dark" defaultSelectedKeys={[props.active]}
      onClick={onSwitch}>
      <Menu.Item key="/">
        <Link href="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="/Home/Blog">
        <Link href="/Home/Blog">博客</Link>
      </Menu.Item>
      <Menu.Item key="/Home/photo">
        <Link href="/Home/tools/typeset">排版</Link>
      </Menu.Item>
      <Menu.Item key="/Home/canvas">
        <Link href="/Home/canvas">画板</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="https://github.com/peiili/react-imgshare" target="_blank">
          <Avatar
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          ></Avatar>
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default MenuCom
