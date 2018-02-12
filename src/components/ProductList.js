import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, setIndex } from "../state/productList";


class ProductList extends React.Component {


  handleClick = event => {
    const target = event.currentTarget
    const id = target.dataset.itemId

    this.props.setIndex(id)
  }

  componentDidMount() {
    this.props.getProducts()
  }


  render() {
    return (
      <div>
        <h2>Products:</h2>

        {
          this.props.status.getting && <p>Getting products...</p>
        }

        {
          this.props.status.error && <p>Woops! Something went wrong :(</p>
        }

        <ul>
          {this.props.products.map(
            (item, ind) =>
              <li
                onClick={this.handleClick}
                data-item-id={ind}
                key={ind}
              >
                <Link to={`/details/${ind}`}>
                  {item.number}
                </Link>
              </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productList.data,
  status: state.productList
})

const mapDispatchToProps = dispatch => ({
  setIndex: (index) => dispatch(setIndex(index)),
  getProducts: () => dispatch(getProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
