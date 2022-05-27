import React, { useEffect, useState, useRef } from "react";
// import './style.css'
// http://test.top/Home/canvas

const Canvas = function () {
    const canvas = useRef()
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    // const startDraw = function (ctx, live) {
    const startDraw = function () {
        // const { x, y } = live
        // ctx.lineTo(x, y);
        // ctx.stroke();
    }
    useEffect(() => {
        // const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        // 设置画布大小
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
        // 检测鼠标的移动位置
        // document.addEventListener('mousedown', (event) => {
        //     ctx.beginPath()
        //     ctx.moveTo(event.offsetX, event.offsetX)
        // })
        canvas.addEventListener('mousemove', (event) => {
            // console.log(event);
            console.log('123213');
            // startDraw(ctx, { x: event.offsetX, y: event.offsetY })
        })
    }, []);
    return (
        <canvas ref={canvas} onMouseMove={startDraw()} id="canvas" width={screenWidth} height={screenHeight}></canvas>
    )
}
export default Canvas