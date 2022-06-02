import React, { useState, useEffect, useCallback } from 'react'
import styles from './style.module.css'

let start = false,
    /**
     * 鼠标相对客户端点击位置
     */
    startPosition = { x: 0, y: 0 },
    /**
     * 当前控制块所在的位置
     */
    currentPosition = { x: 10, y: 10 }
const ColorDisc = function (props) {
    const { colors = ['#000000'], onClick } = props
    const [activeColor, setActiveColor] = useState(colors[0]);
    const [position, setPosition] = useState({
        top: 10,
        left: 10
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
        setPosition({
            top: topLength + currentPosition.y,
            left: leftLength + currentPosition.x
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
            <div className={styles.control} style={{ top: position.top + 'px', left: position.left + 'px' }}>
                <div id='sideBar' className={styles.sideBar}></div>
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
            </div>
        </>
    )
}
export default ColorDisc;
