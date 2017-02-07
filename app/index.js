import React from 'react'
import { AppContainer } from './containers'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider,StatusBar } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux'
import devToolsExtension from 'remote-redux-devtools'
import { LOGGING_OUT } from './redux/modules/authentication'

const appReducer = combineReducers(reducers)

function rootReducer (state, action){
  if (action.type === LOGGING_OUT){
    state = undefined
  }

  return appReducer(state,action)
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devToolsExtension()
    //window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)


export default function ReactKappa (props){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
}
