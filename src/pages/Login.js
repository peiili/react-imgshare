import React, { Component } from 'react'
import '../css/login.css'
import { login as LoginApi } from '@/api/index'
import { Link } from 'react-router-dom'

import { Form, Input, Button, Checkbox, message } from 'antd'

class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regisitor: false,
      accept: '',
      password: '',
      token: '',
    }
    this.myToggle = this.myToggle.bind(this)
  }
  handleChange = (event) => {
    const target = event.target
    this.setState({
      [target.name]: target.value,
    })
  }
  myToggle() {
    this.setState({
      regisitor: !this.state.regisitor,
    })
  }
  onFinish = (values) => {
    // 将数据存入本地
    if (values.remember) {
      localStorage.setItem('xek_accept', values.accept)
      // 密码加密 转base64 +‘xek’
      localStorage.setItem('xek_password', values.password)
    }
    const loginSchema = {
      accept: values.accept,
      password: values.password,
    }
    LoginApi(loginSchema)
      .then((res) => {
        if (res.success) {
          this.props.history.replace('/')
        } else {
          message.error(res.message)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    return (
      <div>
        <div className={this.state.regisitor ? 'dowebok s--signup' : 'dowebok'}>
          <div className="form sign-in">
            <h2>欢迎回来</h2>
            <Form
              style={{ textAlign: 'center' }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <span>账号</span>
              <Form.Item
                name="accept"
                rules={[{ required: true, message: '请输入账号!' }]}
              >
                <Input
                  name="accept"
                  defaultValue={this.state.accept}
                  onChange={this.handleChange}
                  className="noborder"
                />
              </Form.Item>
              <span>密码</span>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password
                  name="password"
                  onChange={this.handleChange}
                  defaultValue={this.state.password}
                  className="noborder"
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    background: '#d4af7a',
                    border: 'none',
                    color: '#fff',
                  }}
                  shape="round"
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/">
                  <Button shape="round">返回</Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>还未注册？</h2>
                <p>立即注册，发现大量机会！</p>
              </div>
              <div className="img__text m--in">
                <h2>已有帐号？</h2>
                <p>有帐号就登录吧，好久不见了！</p>
              </div>
              {/* <div className="img__btn" onClick={this.myToggle}>
                <span className="m--up">注 册</span>
                <span className="m--in">登 录</span>
              </div> */}
            </div>
            <div className="form">
              <h2>立即注册</h2>
              <label>
                <span>用户名</span>
                <input type="text" />
              </label>
              <label>
                <span>邮箱</span>
                <input type="email" />
              </label>
              <label>
                <span>密码</span>
                <input type="password" />
              </label>
              <button type="button" className="submit">
                注 册
              </button>
              <button type="button" className="fb-btn">
                <Link to="/">返回</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default login
