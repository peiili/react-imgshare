import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Footer from './../component/Footer'
import MenuCom from './../component/Menu'
import PostList from './../component/PostList'
import Imgblock from './Imgblock'
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
        <MenuCom></MenuCom>
        <div style={{ marginTop: '10px' }}>
          <Route exact path="/" component={Imgblock}></Route>
          <Route path={`${match.url}/Bing`} component={Imgblock}></Route>
          <Route exact path={`${match.url}/test`} component={PostList}></Route>
          {/* <Redirect to="/Login"></Redirect> */}
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
export default Home
