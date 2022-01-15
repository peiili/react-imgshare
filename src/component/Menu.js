import React from 'react'
import { Menu, Avatar } from 'antd'
import { Link } from 'react-router-dom'
// const { SubMenu } = Menu
function MenuCom(props) {

  return (
    <Menu className="menuStyle" mode="horizontal" theme="dark">
      {/* <div style={{ width: '80%', margin: '0 auto' }}>
              </div> */}
      <Menu.Item key="1">
        <Link to="/">首页</Link>
      </Menu.Item>
      {/* <SubMenu title="壁纸">
        <Menu.Item>
          <Link to="/Home/Bing">Bing</Link>
        </Menu.Item>
      </SubMenu> */}
      <Menu.Item key="2">
        <Link to="/Home/Blog">博客</Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Link to="/Login">LOGIN</Link>
      </Menu.Item> */}
      <Menu.Item>
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
