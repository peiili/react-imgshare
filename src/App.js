import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/Login" component={Login}></Route>
            <Route path="/Admin" component={Admin}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
