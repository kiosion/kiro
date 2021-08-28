import { ipcRenderer } from 'electron'

import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Dashboard from './Dashboard'

class App {
  constructor() {
    this.state = {
      code: ''
    }
  }

  render() {
    ipcRenderer.on('login-flow-resolve', (event, arg) => {
      this.setState({
        code: arg
      })
    });
    return this.state.code !== '' ? <Dashboard code={this.state.code} /> : <Login />
  }
}

export default App;
