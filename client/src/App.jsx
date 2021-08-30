import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Dashboard from './Dashboard'

const { ipcRenderer } = window.require('electron')

ipcRenderer.on('log-to-renderer', (_event, arg) => {
  console.log(arg)
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      code: ''
    }
  }

  render() {
    ipcRenderer.on('login-flow-resolve', (_event, arg) => {
      this.setState({
        code: arg
      })
    });
    return (this.state.code !== '') ? <Dashboard code={this.state.code} /> : <Login />
  }
}

export default App;
