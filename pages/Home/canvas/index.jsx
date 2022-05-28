import React, { useCallback, useEffect, useState } from "react";
// import './style.css'
import styles from './style.module.css'
// http://test.top/Home/canvas
let start = false
let canvas, ctx
let historyDataURL = []
const Canvas = function () {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const init = function () {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, screenWidth, screenHeight)
  }
  const startDraw = function (ctx, live) {
    const { x, y } = live
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  const clearCanvas = function () {
    init()
    historyDataURL = []
  }
  const eraser = function () {
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 10
  }
  const backStep = function () {
    historyDataURL.pop()
    if (historyDataURL.length > 0) {
      const img = new Image()
      img.src = historyDataURL.at(-1)
      img.onload = function () {
        init()
        ctx.drawImage(img, 0, 0, screenWidth, screenHeight)
      }
    } else {
      clearCanvas()
    }
  }
  const mousedown = function (e) {
    start = true
    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
  }
  const mouseup = function () {
    start = false
    const imgData = canvas.toDataURL('image/png', 1)
    historyDataURL.push(imgData)
  }
  const mousemove = useCallback((e) => {
    if (!start) return;
    startDraw(ctx, { x: e.offsetX, y: e.offsetY })
  }, [])

  useEffect(() => {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    // 设置画布大小
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)

    // 检测鼠标的移动位置
    canvas.addEventListener('mousedown', mousedown)
    canvas.addEventListener('mouseup', mouseup)
    canvas.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseleave', mouseup)

    return () => {
      canvas.removeEventListener('mousedown', mousedown)
      canvas.removeEventListener('mouseup', mouseup)
      document.removeEventListener('mouseleave', mouseup)
      canvas.removeEventListener('mousemove', mousemove)
    }
  }, [mousemove]);
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
          <button onClick={() => {
            eraser()
          }}>橡皮擦</button>
        </div>
      </div>

    </>
  )
}
export default Canvas