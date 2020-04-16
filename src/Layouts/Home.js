import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Footer from '@/component/Footer'
import MenuCom from '@/component/Menu'
import PostList from '@/component/PostList'
import FullView from '@/pages/FullView'
import Imgblock from '@/pages/Imgblock'
import './../css/Home.css'
// import Login from './Login'
class Home extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const { match } = this.props
    return (
      <div id="Home">
        {/* nav导航组件 */}
        <MenuCom></MenuCom>
        <div style={{ marginTop: '10px' }}>
          <Route exact path="/" component={Imgblock}></Route>
          <Route path={`${match.url}/Bing`} component={Imgblock}></Route>
          <Route path={`${match.url}/FullView`} component={FullView}></Route>
          <Route exact path={`${match.url}/test`} component={PostList}></Route>
          {/* <Redirect to="/Login"></Redirect> */}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
export default Home
