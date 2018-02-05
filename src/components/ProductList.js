import React from 'react';
import { connect } from 'react-redux'


class ProductList extends React.Component {




  render() {
    return (
      <div>
        Hello
        <ul>
          {this.props.products.map(
            item => <li onClick={this.handleClick}> {item.name} </li>
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
