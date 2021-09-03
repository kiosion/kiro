import React, { Component } from 'react'

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
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(AUTH_URL) {
    console.log('[App.jsx] [clickHandler]')

    // if (e.ctrlKey || e.shiftKey || e.altKey) {
    //     ipcRenderer.invoke('login-flow-initiate', 'https://www.youtube.com/watch?v=jeg_TJvkSjg')
    //     console.log(`[App.jsx] [clickHandler] ipcRenderer.invoke('login-flow-initiate', 'https://www.youtube.com/watch?v=jeg_TJvkSjg')`)
    // }

    ipcRenderer.invoke('login-flow-initiate', AUTH_URL)
    console.log(`[App.jsx] [clickHandler] ipcRenderer.invoke('login-flow-initiate', '${AUTH_URL}')`)

    ipcRenderer.on('login-flow-resolve', (_event, arg) => {
      console.log(arg)
      this.setState({
        code: arg
      })
    })
  } 

  render() {
    return this.state.code === '' ? <Login onClick={this.clickHandler} /> : <Dashboard code={this.state.code} />
  }
}

export default App;
