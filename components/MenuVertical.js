import React from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'antd'
import Link from 'next/link'
// import logo from '@/assets/img/logo.png'
import { UnorderedListOutlined, PicLeftOutlined, GlobalOutlined } from '@ant-design/icons'
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
          <UnorderedListOutlined />
          <Link href="/Admin/Article">
            <span>文章</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/Admin/Typeset">
          <PicLeftOutlined />
          <Link href="/Admin/Typeset">
            <span>排版数据</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/Admin/Website">
          <GlobalOutlined />
          <Link href="/Admin/Website">
            <span>网站设置</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
export default MenuCom
