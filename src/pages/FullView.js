import React, { Component } from 'react'
import { Slider } from 'antd'
import Zmage from 'react-zmage'
// import moduleCss from '@/css/FullView.css'
import img_1 from '@/assets/img/1.jpg'
import img_2 from '@/assets/img/2.jpg'
import img_3 from '@/assets/img/3.jpg'
import img_4 from '@/assets/img/4.jpg'
import img_5 from '@/assets/img/5.jpg'
import img_6 from '@/assets/img/6.jpg'
import img_7 from '@/assets/img/7.jpg'
import img_8 from '@/assets/img/8.jpg'
import img_9 from '@/assets/img/9.jpg'
import img_10 from '@/assets/img/10.jpg'
import img_11 from '@/assets/img/11.jpg'
import '@/css/FullView.css'
let j = 0
let arr = []
let tempValue = 1
class FullView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1,
      imgCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }
    this.onMouseMoveFoo = this.onMouseMoveFoo.bind(this)
  }
  onMouseMoveFoo(event) {
    let x = event.touches[0].clientX
    // console.log(x)
    j++
    if (j === 5) {
      if (arr.length > 2) {
        arr.shift()
        arr.push(x)
        if (arr[arr.length - 1] - arr[arr.length - 2] > 0) {
          // this.setState({
          //   value: this.state.value + 1,
          // })
          tempValue++
        } else {
          tempValue--
          // this.setState({
          //   value: this.state.value - 1,
          // })
        }
        if (tempValue > 11) {
          tempValue = 1
          this.setState({
            value: 1,
          })
        } else if (tempValue < 1) {
          tempValue = 11
          this.setState({
            value: 11,
          })
        } else {
          this.setState({
            value: tempValue,
          })
        }
      } else {
        arr.push(x)
      }
      // console.log(arr)
      j = 0
      // console.log(x)
    }
  }
  onChange() {}
  render() {
    function onChange() {}
    function onAfterChange() {}
    return (
      <div>
        <Slider
          value={this.state.value}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        {/* {this.state.value} */}
        <div onTouchMove={this.onMouseMoveFoo} className="testBlock">
          <div style={{ width: '200px', height: '200px' }}>
            <Zmage
              style={{
                width: '100%',
                display: this.state.value === 1 ? 'block' : 'none',
              }}
              alt=""
              src={img_1}
            ></Zmage>
            <img
              style={{
                width: '100%',
                display: this.state.value === 2 ? 'block' : 'none',
              }}
              alt=""
              src={img_2}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 3 ? 'block' : 'none',
              }}
              alt=""
              src={img_3}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 4 ? 'block' : 'none',
              }}
              alt=""
              src={img_4}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 5 ? 'block' : 'none',
              }}
              alt=""
              src={img_5}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 6 ? 'block' : 'none',
              }}
              alt=""
              src={img_6}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 7 ? 'block' : 'none',
              }}
              alt=""
              src={img_7}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 8 ? 'block' : 'none',
              }}
              alt=""
              src={img_8}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 9 ? 'block' : 'none',
              }}
              alt=""
              src={img_9}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 10 ? 'block' : 'none',
              }}
              alt=""
              src={img_10}
            />
            <img
              style={{
                width: '100%',
                display: this.state.value === 11 ? 'block' : 'none',
              }}
              alt=""
              src={img_11}
            />
            {/* {this.state.imgCount.map((e, i) => (

          ))} */}
          </div>
        </div>
      </div>
    )
  }
}
export default FullView
