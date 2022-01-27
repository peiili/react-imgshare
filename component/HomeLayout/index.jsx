import React from 'react'
import Footer from './../Footer'
import MenuCom from './../Menu'
import style from  './style.module.css'
const HomeLayout = (props)=>{
      return (
        <div id="Home" className={style.Home}>
          {/* nav导航组件 */}
          <MenuCom></MenuCom>
            {props.children }
          <Footer></Footer>
        </div>
      )
}
export default HomeLayout