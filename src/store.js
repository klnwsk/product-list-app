import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'


const reducer = combineReducers({

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = composeEnhancers(
  applyMiddleware(thunk),
    persistState([])
)

const store = createStore(
  reducer,
  enhancer
)

export default store