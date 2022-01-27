import React, { Component } from 'react'
// import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useRouter } from 'next/router'
// import Login from './pages/Login'
// import Home from './Layouts/Home'
// import Admin from '@/Layouts/Admin'

// import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        首页
        {/* <a href={href} onClick={handleClick} style={style}>
          {Home}
        </a> */}
        {/* <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/Home" component={Home}></Route>
          </Switch>
        </Router> */}
      </div>
    )
  }
}

export default App
