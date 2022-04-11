import React from 'react'
import style from './style.module.css'
function Footer() {
  return (
    <div className={style.footer}>
      <div>Copyright©{location.host}|
        <a href='https://beian.miit.gov.cn/#/Integrated/index'
          target="_blank">
          粤ICP备18024512号
        </a>
      </div>
    </div>
  )
}

export default Footer
