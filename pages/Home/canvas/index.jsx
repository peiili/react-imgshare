import React, { useEffect, useState } from "react";
// import './style.css'
import styles from './style.module.css'
// http://test.top/Home/canvas
let start = false
let ctx = null
let historyDataURL = []
const Canvas = function () {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  const startDraw = function (ctx, live) {
    const { x, y } = live
    ctx.lineTo(x, y);
    // ctx.closePath()
    ctx.stroke();
  }
  const clearCanvas = function () {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
  }

  const restore = function () {
    ctx.restore()
    ctx.beginPath()
    ctx.fillRect(0, 0, screenWidth, screenHeight);
  }
  const backStep = function () {
    historyDataURL.pop()
    const img = new Image()
    img.src = historyDataURL.at(-1)
    console.log(img);
    img.onload = function () {

      ctx.drawImage(img, 0, 0, screenWidth, screenHeight)
    }
  }
  useEffect(() => {
    const canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    // 设置画布大小
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
    // 检测鼠标的移动位置
    canvas.addEventListener('mousedown', (event) => {
      start = true
      ctx.beginPath()
      ctx.moveTo(event.offsetX, event.offsetY)
    })
    canvas.addEventListener('mouseup', (event) => {
      start = false
      const imgData = canvas.toDataURL('image/jpg', 1)
      historyDataURL.push(imgData)
      console.log(historyDataURL);
    })
    canvas.addEventListener('mousemove', (event) => {
      // console.log(event);
      if (!start) return;
      startDraw(ctx, { x: event.offsetX, y: event.offsetY })
    })
  }, [screenHeight, screenWidth]);
  return (
    <>
      <div>
        <canvas id="canvas" width={screenWidth} height={screenHeight}></canvas>
        <div className={styles.contorl}>
          <button onClick={() => {
            clearCanvas()
          }}>清空</button>
          <button onClick={() => {
            restore()
          }}>重新绘图</button>
          <button onClick={() => {
            backStep()
          }}>后退一步</button>
        </div>
      </div>

    </>
  )
}
export default Canvas