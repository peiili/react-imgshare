import React, { Component } from 'react'
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      selectValue: '选项3'
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = event => {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }
  handleSelectChange = event => {
    const target = event.target
    this.setState({ selectValue: target.value })
  }
  handleSubmit = event => {
    console.log('login successfully')
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <form>
          <label>
            用户名
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            密码
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <label>
            下拉选项
            <select
              value={this.state.selectValue}
              onChange={this.handleSelectChange}
            >
              <option>选项1</option>
              <option>选项2</option>
              <option>选项3</option>
              <option>选项4</option>
            </select>
          </label>
          <input type="submit" value="登录" />
        </form>
      </div>
    )
  }
}
export default Form
