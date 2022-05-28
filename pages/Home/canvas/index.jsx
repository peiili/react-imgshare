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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, screenWidth, screenHeight)
    historyDataURL = []
  }
  const backStep = function () {
    historyDataURL.pop()
    if (historyDataURL.length > 0) {
      const img = new Image()
      img.src = historyDataURL.at(-1)
      img.onload = function () {
        clearCanvas()
        ctx.drawImage(img, 0, 0, screenWidth, screenHeight)
      }
    } else {
      clearCanvas()
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
    canvas.addEventListener('mouseup', (e) => {
      start = false
      const imgData = canvas.toDataURL('image/png', 1)
      historyDataURL.push(imgData)
    })
    canvas.addEventListener('mousemove', (event) => {
      if (!start) return;
      startDraw(ctx, { x: event.offsetX, y: event.offsetY })
    })

  }, []);
  return (
    <>
      <div>
        <canvas id="canvas" width={screenWidth} height={screenHeight}></canvas>
        <div className={styles.contorl}>
          <button onClick={() => {
            clearCanvas()
          }}>清空</button>
          {/* <button onClick={() => {
            restore()
          }}>重新绘图</button> */}
          <button onClick={() => {
            backStep()
          }}>后退一步</button>
        </div>
      </div>

    </>
  )
}
export default Canvas