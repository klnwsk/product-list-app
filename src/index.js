import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductList from './components/ProductList';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductDetails from "./components/ProductDetails";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={ProductList}/>
        <Route path="/details" component={ProductDetails}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
