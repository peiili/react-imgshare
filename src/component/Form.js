import React, { Component } from 'react'
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      selectValue: '选项3',
      react: false,
      redux: false,
      mobx: false,
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = (event) => {
    const target = event.target
    console.log(target.checked)
    this.setState({
      [target.name]: target.checked,
    })
    // this.setState({ [target.name]: target.value })
  }
  handleSelectChange = (event) => {
    const target = event.target
    console.log(target.value)
    this.setState({ selectValue: target.value })
  }
  handleSubmit = (event) => {
    console.log('login successfully')
    console.log(this.state.name)
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            <input type="submit" value="登录" />
            <br />
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
          <br />
          <input
            type="checkbox"
            name="react"
            value="react"
            checked={this.state.react}
            onChange={this.handleChange}
          ></input>
          <input
            type="checkbox"
            name="mobx"
            value="mobx"
            checked={this.state.mobx}
            onChange={this.handleChange}
          ></input>
          <input
            type="checkbox"
            name="redux"
            value="redux"
            checked={this.state.redux}
            onChange={this.handleChange}
          ></input>
        </form>
      </div>
    )
  }
}
export default Form
