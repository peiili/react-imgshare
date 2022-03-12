import React from 'react'
import style from './style.module.css'
const Typeset = (props) => {
  const { active, title, size, onClick } = props
  return (
    <>
      <div className={active ? style['main-active'] : style.main} onClick={onClick}>
        <div><b>{title}</b></div>
        <div className={style.size}>{size}</div>
      </div>
    </>
  )
}
export default Typeset