import React from 'react'
import style from './style.module.css'
const Typeset = (props) => {
  const { active, title, size } = props
  return (
    <>
      <div className={active ? style['main-active'] : style.main}>
        <div><b>{title}</b></div>
        <div>{size}</div>
      </div>
    </>
  )
}
export default Typeset