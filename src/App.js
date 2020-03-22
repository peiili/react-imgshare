import React, { Component } from 'react'
import ImgBlock from './component/imgblock'
import './App.css'
import { Avatar } from 'antd'

import { Menu } from 'antd'
const { SubMenu } = Menu
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        <Menu className="menuStyle" mode="horizontal" theme="dark">
          {/* <div style={{ width: '80%', margin: '0 auto' }}>
          </div> */}
          <Menu.Item>首页</Menu.Item>
          <SubMenu title="壁纸">
            <Menu.Item>Bing</Menu.Item>
          </SubMenu>
          <Menu.Item>
            <Avatar
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf'
              }}
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            ></Avatar>
          </Menu.Item>
        </Menu>
        <div style={{ margin: '20px auto' }}>
          <ImgBlock></ImgBlock>
        </div>
      </div>
    )
  }
}

export default App
