import React, { useCallback, useEffect, useState } from "react";
import ColorDisc from "./ColorDisc";
// http://test.top/Home/canvas
let start = false
let canvas,
    ctx,
    lineWidth = 10,
    strokeStyle = '#000000',
    lineCap = 'round',
    historyDataURL = []
const Canvas = function () {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    const init = function () {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, screenWidth, screenHeight)
    }
    const startDraw = function (ctx, live) {
        const { x, y } = live
        ctx.lineCap = lineCap
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    const clearCanvas = function () {
        init()
        historyDataURL = []
    }
    const eraser = function () {
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = lineWidth
    }
    const brush = function () {
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = lineWidth
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

    // const [activeDiameter, setActiveDiameter] = useState(2)
    // const onChangeDiameter = function () {

    // }
    useEffect(() => {
        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')
        // 设置画布大小
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
        const img = new Image()
        img.src = 'http://statich5.dlsjf.top/pic/1654161431636.jpeg'
        img.setAttribute("crossOrigin", 'Anonymous');
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 360, 540)
        }
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

                {/* <button onClick={() => {
            clearCanvas()
          }}>清空</button>
          <button onClick={() => {
            backStep()
          }}>后退一步</button>
          <button onClick={() => {
            eraser()
          }}>橡皮擦</button>
          <input onClick={() => {
            brush()
          }} type='color' value={'#0000ff'}></input> */}
                <ColorDisc
                    colors={['#000000', '#3fb4ff', '#8a3fff', '#fc5ac4', '#c9e265', '#ffde59', '#ffbd59', '#ff914d']}
                    defaultWidth={lineWidth}
                    onClick={(color) => {
                        strokeStyle = color
                    }}
                    onChangeDiameter={(e) => {
                        lineWidth = e
                    }} />
            </div>


        </>
    )
}
export default Canvas
