import React from 'react'
import Footer from '@/components/Footer'
import MenuCom from '@/components/Menu'
import style from './style.module.css'
const HomeLayout = (props) => {
    return (
        <div id="Home" className={style.Home}>
            {/* nav导航组件 */}
            <MenuCom active={props.active}></MenuCom>
            {props.children}
            <Footer></Footer>
        </div>
    )
}
export default HomeLayout
