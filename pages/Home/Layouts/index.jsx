import React from 'react'
import HomeLayout  from '@/components/HomeLayout'
// import PostList from '@/component/PostList'
// import Blog from '@/pages/Blog'
// import ImageDetail from '@/pages/ImageDetail'

const Home = ({children})=> {   
    return (
      <HomeLayout>
       {children}
      </HomeLayout>
    )
}
export default Home

      // <div id="Home" className={style.Home}>
        
      //   {/* nav导航组件 */}
      //   <MenuCom></MenuCom>
      //   {props.children }
      //   {/* 内容 */}
      //   <div>
      //     {/* <Route exact path="/" component={Imgblock}></Route> */}
      //     {/* <Route path={`${match.url}/Bing`} component={Imgblock}></Route>
      //     <Route path={`${match.url}/Blog`} component={Blog}></Route>
      //     <Route exact path={`${match.url}/test`} component={PostList}></Route>
      //     <Route exact path={`${match.url}/imageDetail`} component={ImageDetail}></Route> */}
      //     {/* <Redirect to="/Login"></Redirect> */}
      //   </div>
      // </div>