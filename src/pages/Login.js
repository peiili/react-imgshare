import React, { Component } from 'react'
import '../css/login.css'

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
  myToggle() {
    // document.querySelector('.dowebok').classList.toggle('s--signup')
    this.setState({
      regisitor: !this.state.regisitor,
    })
  }
  render() {
    return (
      <div>
        <div className={this.state.regisitor ? 'dowebok s--signup' : 'dowebok'}>
          <div className="form sign-in">
            <h2>欢迎回来</h2>
            <label>
              <span>邮箱</span>
              <input type="email" />
            </label>
            <label>
              <span>密码</span>
              <input type="password" />
            </label>
            <p className="forgot-pass">忘记密码?</p>
            <button type="button" className="submit">
              登 录
            </button>
            <button type="button" className="fb-btn">
              使用 <span>facebook</span> 帐号登录
            </button>
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
              <div className="img__btn" onClick={this.myToggle}>
                <span className="m--up">注 册</span>
                <span className="m--in">登 录</span>
              </div>
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
                使用 <span>facebook</span> 帐号注册
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default login
