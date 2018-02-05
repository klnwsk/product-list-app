import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductList from './components/ProductList';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router ,Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={ProductList}/>
    </Router>
  </Provider>,
document.getElementById('root')
)
registerServiceWorker();
