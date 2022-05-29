import React, { useState } from 'react'
import styles from './style.module.css'
const ColorDisc = function (props) {
  const { colors = ['#000000'], onClick } = props
  const [activeColor, setActiveColor] = useState(colors[0]);
  return (
    <>
      <div className={styles.contorl}>
        <div className={styles.sideBar}></div>
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
