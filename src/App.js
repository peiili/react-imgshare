import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        <div style={{ margin: '20px auto' }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/Home" component={Home}></Route>
              <Route path="/Login" component={Login}></Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default App
