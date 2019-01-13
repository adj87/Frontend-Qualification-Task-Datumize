import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

let initialState = {
  users: [],
  roles: [],
  projects: [],
  relations: {}
}
const middleware = [
  thunk
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
]

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
  //
)
