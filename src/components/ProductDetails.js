import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { getDetails, updateProduct } from "../state/productList"


class ProductDetails extends React.Component {

  state = {
    readMode: true,
    imgLoading: true,
    name: '',
    number: '',
    description: '',
    images: [],
    changed: false
  }

  handleSubmit = event => {

    event.preventDefault()

    const productName = this.state.name === '' ? this.props.details.name : this.state.name
    const productNumber = this.state.number === '' ? this.props.details.number : this.state.number
    const productDescription = this.state.description === '' ? this.props.details.description : this.state.description
    const index = this.props.match.params.id

    this.toggleEditMode()
    this.props.updateProduct(productName, productNumber, productDescription, index)
  }

  handleChange = event => {

    this.setState({
      [event.target.id]: event.target.value,
      changed: true
    })
  }

  handleCancel = () => {

    this.setState({
      readMode: true,
      changed: false,
      name: this.props.details.name,
      number: this.props.details.number,
      description: this.props.details.description,
    })
  }

  handleImageLoad = () => {
    this.setState({
      imgLoading: false
    })
  }

  toggleEditMode = () => {
    this.setState({
      readMode: !this.state.readMode
    })
  }

  componentDidMount() {
    this.props.getDetails(this.props.match.params.id)
  }


  render() {

    const productImages = this.props.details.images === undefined ? this.state.images : this.props.details.images
    const productName = this.state.changed ? (this.state.name === '' ? this.props.details.name : this.state.name) : this.props.details.name
    const productNumber = this.state.changed ? (this.state.number === '' ? this.props.details.number : this.state.number) : this.props.details.number
    const productDetails = this.state.changed ? (this.state.description === '' ? this.props.details.description : this.state.description) : this.props.details.description

    return (
      <div>
        <Button>
          <Link to='/'>
            BACK
          </Link>
        </Button>
        <Form
          onSubmit={this.handleSubmit}
          id="form"
        >
          <FormGroup>
            <Label for="name">
              Name:
            </Label>
            <Input
              type="text"
              readOnly={this.state.readMode}
              value={productName}
              style={{border: '0px', width: '100%', backgroundColor: 'none'}}
              id="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="number">
              Number:
            </Label>
            <Input
              type="text"
              readOnly={this.state.readMode}
              value={productNumber}
              style={{border: '0px', width: '100%'}}
              id="number"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">
              Description:
            </Label>
            <Input
              type="textarea"
              readOnly={this.state.readMode}
              value={productDetails}
              style={{border: '0px', width: '100%'}}
              id="description"
              onChange={this.handleChange}
            />
          </FormGroup>
          {
            this.state.readMode ?
              <Button
                onClick={this.toggleEditMode}
              >
                Update
              </Button> :
              <div>
                <Button
                  type='submit'
                >
                  Save
                </Button>
                < Button
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
              </div>
          }
        </Form>
        {
          productImages.length > 0 ?
            productImages.map(
              (ele, ind) =>
                <a
                  key={ind}
                  href="https://bluestonepim.com"
                >
                  <img
                    onLoad={this.handleImageLoad}
                    src={`${ele.url}`}
                    alt="Example pic"
                  />
                  {
                    this.state.imgLoading && <p>Getting images...</p>
                  }
                </a>
            ) :
            <p>No picture available</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.productList.data,
  index: state.productList.index,
  details: state.productList.details
})

const mapDispatchToProps = dispatch => ({
  getDetails: (index) => dispatch(getDetails(index)),
  updateProduct: (productName, productNumber, productDescription, index) => dispatch(updateProduct(productName, productNumber, productDescription, index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails)