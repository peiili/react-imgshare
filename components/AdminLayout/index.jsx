import React, { Component } from 'react'
import { Layout } from 'antd'
import MenuVertical from '@/components/MenuVertical.js'
import style from './style.module.css'

// import ActiveEdit from '@/pages/admin/ActiveEdit'
const { Header, Content, Footer, Sider } = Layout
class Admin extends Component {
  constructor(props) {
    const { location, history, children } = props
    super(props)
    this.state = {
      collapsed: false,
      currentPage: '',
      location,
      history,
      children
    }
    this.onCollapse = (collapsed) => {
      console.log(collapsed)
      this.setState({ collapsed })
    }
    this.changeBread = (key) => {
      this.setState({
        currentPage: key,
      })
    }
  }
  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className={style.logo} />
            <MenuVertical currentSelect={this.changeBread} location={this.state.location} history={this.state.history}></MenuVertical>
          </Sider>
          <Layout className={style['site-layout']}>
            <Header className={style['site-layout-background']} style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div
                className={style['site-layout-background']}
                style={{ padding: 24, minHeight: 360, marginTop: '15px' }}
              >
                {this.state.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Power by peiili</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default Admin
