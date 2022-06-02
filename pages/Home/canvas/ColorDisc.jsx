import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Slider } from 'antd';
import Divider from '@/components/Divider'
import styles from './style.module.css'
let start = false,
    /**
     * 鼠标相对客户端点击位置
     */
    startPosition = { x: 0, y: 0 },
    /**
     * 当前控制块所在的位置
     */
    currentPosition = { x: 10, y: 10 },
    /**
     * 最终位置
     */
    resultedPosition = { x: 0, y: 0 }
const ColorDisc = function (props) {
    const control = useRef()
    const { colors = ['#000000'], onClick, onChangeDiameter, defaultWidth } = props
    const [activeColor, setActiveColor] = useState(colors[0]);
    const [position, setPosition] = useState({
        top: currentPosition.y,
        left: currentPosition.x
    });

    const onClickSide = function (event) {
        const { clientX, clientY } = event
        start = true
        startPosition.x = clientX
        startPosition.y = clientY
    }

    const onMove = function (event) {
        const { clientX, clientY } = event
        if (!start) return;
        const topLength = clientY - startPosition.y
        const leftLength = clientX - startPosition.x
        resultedPosition.x = leftLength + currentPosition.x
        resultedPosition.y = topLength + currentPosition.y
        if (resultedPosition.y < 0) {
            resultedPosition.y = 0
        } else if (resultedPosition.y > (window.innerHeight - control.current.offsetHeight)) {
            resultedPosition.y = window.innerHeight - control.current.offsetHeight
        }
        if (resultedPosition.x < 0) {
            resultedPosition.x = 0
        } else if (resultedPosition.x > (window.innerWidth - control.current.offsetWidth)) {
            resultedPosition.x = window.innerWidth - control.current.offsetWidth
        }
        setPosition({
            top: resultedPosition.y >= 0 ? resultedPosition.y : 0,
            left: resultedPosition.x >= 0 ? resultedPosition.x : 0
        })
    }

    const onEnd = useCallback(function () {
        start = false
        currentPosition.x = position.left
        currentPosition.y = position.top
    }, [position])

    useEffect(() => {
        const sideBar = document.getElementById('sideBar')
        sideBar.addEventListener('mousedown', onClickSide)
        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup', onEnd)
        return () => {
            sideBar.removeEventListener('mousedown', onClickSide)
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onEnd)
        };
    }, [onEnd]);
    return (
        <>
            <div ref={control} className={styles.control} style={{ top: position.top + 'px', left: position.left + 'px' }}>
                <div id='sideBar' className={styles.sideBar}></div>
                <span className={styles.title}>颜色</span>
                <div className={styles.discbox}>
                    {
                        colors.map(e => {
                            return (
                                <div
                                    key={e}
                                    className={`${styles.ColorDisc} ${e === activeColor ? styles.ColorDiscActive : ''}`}
                                    style={{ backgroundColor: e }}
                                    onClick={() => {
                                        onClick(e)
                                        setActiveColor(e)
                                    }}
                                ></div>
                            )
                        })
                    }
                </div>
                <Divider color='#ffffff60' />
                <span className={styles.title}>半径</span>
                <div>
                    <Slider defaultValue={defaultWidth} min={1} max={20} onChange={(e) => {
                        onChangeDiameter(e)
                    }} />
                </div>
            </div>
        </>
    )
}
export default ColorDisc;
