import React, { Component } from 'react'
class CanvasView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 10,
    }
  }
  componentDidMount() {
    const ctx = document.getElementById('canvasView').getContext('2d')
    ctx.fillStyle = '#000'
    ctx.textAlign = 'left'
    ctx.font = '20px'
    ctx.fillText('很好的开始', 10, 10)
    // let TimeFoo = setInterval(() => {
    // ctx.fillStyle = '#fff'
    // ctx.fillRect(0, 0, 400, 200)
    // for (let i = 0; i < 20; i++) {
    //   ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
    //     Math.random() * 255
    //   })`
    //   const size = Math.random() * 50
    //   ctx.fillRect(Math.random() * 350, Math.random() * 150, size, size)
    // 绘制随机位置的圆
    // ctx.beginPath()
    // ctx.arc(
    //   Math.random() * 350,
    //   Math.random() * 150,
    //   Math.random() * 40,
    //   0,
    //   0.2 * this.state.num * Math.PI,
    //   true
    // )
    // ctx.closePath()
    // ctx.stroke()
    // ctx.fillStyle = 'green'
    // ctx.fill()
    // }

    // ctx.beginPath()
    // ctx.moveTo(100, 100)
    // ctx.lineTo(200, 100)
    // ctx.lineTo(200, 200)
    // ctx.closePath()
    // ctx.lineWidth = 5
    // ctx.stroke()
    // ctx.fillStyle = '#ff0000'
    // ctx.fill()
    // }, 1000)
    // ctx.fill()
    console.log(ctx)
  }

  render() {
    return (
      <>
        <div>使用canvas 绘11图</div>
        <div>
          <canvas
            style={{ border: '1px solid #ccc' }}
            width="400"
            height="200"
            id="canvasView"
          ></canvas>
        </div>
      </>
    )
  }
}
export default CanvasView
