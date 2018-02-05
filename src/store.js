import { compose, combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import firebase from 'firebase'
import productList from "./state/productList"


const reducer = combineReducers({
  productList
})

const config = {
  apiKey: "AIzaSyBp2K_39Vb21w1odCNc147YNLbfhIdgUZ8",
  authDomain: "product-list-45bca.firebaseapp.com",
  databaseURL: "https://product-list-45bca.firebaseio.com",
  projectId: "product-list-45bca",
  storageBucket: "product-list-45bca.appspot.com",
  messagingSenderId: "683787719844"
}

firebase.initializeApp(config)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = composeEnhancers(
  applyMiddleware(thunk),
    persistState([])
)

const store = createStore(
  reducer,
  enhancer
)

window.store = store

export default store