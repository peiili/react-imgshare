import React, { Component } from 'react'
import MenuVertical from '@/component/MenuVertical.js'
import { Route } from 'react-router-dom'

import { Layout, Breadcrumb } from 'antd'
import '@/css/admin.css'
import Upload from '@/component/Upload.js'
import PostList from '@/component/PostList'
import Active from '@/component/Active'
import ActiveEdit from '@/component/ActiveEdit'
const { Header, Content, Footer, Sider } = Layout
class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
    this.onCollapse = (collapsed) => {
      console.log(collapsed)
      this.setState({ collapsed })
    }
  }
  render() {
    const { match } = this.props
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <MenuVertical></MenuVertical>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Route
                  exact
                  path={`${match.url}/Upload`}
                  component={Upload}
                ></Route>
                <Route
                  exact
                  path={`${match.url}/User`}
                  component={PostList}
                ></Route>
                <Route
                  exact
                  path={`${match.url}/Active`}
                  component={Active}
                ></Route>
                <Route
                  exact
                  path={`${match.url}/ActiveEdit`}
                  component={ActiveEdit}
                ></Route>
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
