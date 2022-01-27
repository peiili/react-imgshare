import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Life extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const { name, age } = this.props
    return (
      <div>
        <div>姓名：{name}</div>
        <div>年龄：{age}</div>
      </div>
    )
  }
  componentWillReceiveProps() {
    console.log('123123')
  }
}
Life.propsType = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired
}
export default Life
