import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class ProductList extends React.Component {




  render() {
    return (
      <div>
        <h2>Products list:</h2>
        <ul>
          {this.props.products.map(
            item =>
              <li
                onClick={this.handleClick}
                data-item-id={item.name}
              >
                <Link to={`/details`}>
                {item.name}
                </Link>
              </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  products: state.productList.data,
})


export default connect(
  mapStateToProps,
)(ProductList);
