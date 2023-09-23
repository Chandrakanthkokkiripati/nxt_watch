import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ThemeAndVideoContext from './components/context/ThemeAndVideoContext'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {isDarkTheme} = this.state

    return (
      <ThemeAndVideoContext.Provider
        value={{isDarkTheme, toggleTheme: this.toggleTheme}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default App
