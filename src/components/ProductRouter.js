import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

class ProductRouter extends React.Component {

  render() {
    return(
      <Router>
        <div>
          <Route exact path='/' component={ProductList}/>
          <Route path={`/details/:id`} component={ProductDetails}/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state =>({
  currentIndex: state.productList.index,
})

export default connect(
  mapStateToProps
)(ProductRouter)