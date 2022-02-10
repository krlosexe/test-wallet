import React, {useEffect, useState, useReducer, useContext} from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import FormCliente from './pages/FormCliente'
import Billetera from './pages/Billetera'
import { createBrowserHistory } from 'history'
import {GlobalState, reducer, initialState} from './store/store'
import { Router, Route, Switch } from 'react-router-dom'



export const hist = createBrowserHistory()


const App = () => {

  const initialState = useContext(GlobalState)
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    
      <Router history={hist}>
        <Header />
        <Switch>
          <GlobalState.Provider value={{state, dispatch}}>
            <Route exact path='/' component={Home} />
            <Route exact path='/cliente' component={FormCliente} /> 
            <Route exact path='/billetera' component={Billetera} /> 
          </GlobalState.Provider>
        </Switch>

      </Router>
    
  )
}

export default App
