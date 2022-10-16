import React from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'antd'
import Link from 'next/link'
import Observe from '@/tools/Observe'
import { UnorderedListOutlined, PicLeftOutlined, GlobalOutlined } from '@ant-design/icons'
// const { SubMenu } = Menu

function MenuCom(props) {
  const router = useRouter()
  function onCheck(arr) {
    Observe.fire('loading', true)
    router.push(arr.key)
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
        onClick={onCheck}
      >
        <Menu.Item key="/Admin/Article">
          <UnorderedListOutlined />
          <span>文章</span>
        </Menu.Item>
        <Menu.Item key="/Admin/Typeset">
          <PicLeftOutlined />
          <span>排版数据</span>
        </Menu.Item>
        <Menu.Item key="/Admin/Website">
          <GlobalOutlined />
          <span>网站设置</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}
export default MenuCom
