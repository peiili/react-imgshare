import React, { useState, useEffect } from 'react'
import style from './style.module.css'
function Footer() {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    setLocation(window.location)
  }, []);
  return (
    <div className={style.footer}>
      <div>Copyright©{location ? location.host : ''}|
        <a href='https://beian.miit.gov.cn/#/Integrated/index'
          target="_blank">
          粤ICP备18024512号
        </a>
      </div>
    </div>
  )
}

export default Footer
