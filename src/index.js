import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'
import ProductRouter from './components/ProductRouter'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store}>
    <ProductRouter/>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
