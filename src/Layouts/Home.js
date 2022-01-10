import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Footer from '@/component/Footer'
import MenuCom from '@/component/Menu'
import PostList from '@/component/PostList'
import Blog from '@/pages/Blog'
import Imgblock from '@/pages/Imgblock'
import ImageDetail from '@/pages/ImageDetail'
import './../css/Home.css'
// import Login from './Login'
class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { match } = this.props
    return (
      <div id="Home">
        {/* nav导航组件 */}
        <MenuCom></MenuCom>
        {/* 内容 */}
        <div style={{ marginTop: '10px' }}>
          <Route exact path="/" component={Imgblock}></Route>
          <Route path={`${match.url}/Bing`} component={Imgblock}></Route>
          <Route path={`${match.url}/Blog`} component={Blog}></Route>
          <Route exact path={`${match.url}/test`} component={PostList}></Route>
          <Route exact path={`${match.url}/imageDetail`} component={ImageDetail}></Route>
          {/* <Redirect to="/Login"></Redirect> */}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
export default Home
