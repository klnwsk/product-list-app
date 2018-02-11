const GET_BEGIN = 'GET_BEGIN'
const GET_SUCCESS = 'GET_SUCCESS'
const GET_FAIL = 'GET_FAIL'

const GET_DETAILS_BEGIN = 'GET_DETAILS_BEGIN'
const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS'
const GET_DETAILS_FAIL = 'GET_DETAILS_FAIL'

const PUT_DETAILS_BEGIN = 'PUT_DETAILS_BEGIN'
const PUT_DETAILS_SUCCESS = 'PUT_DETAILS_SUCCESS'
const PUT_DETAILS_FAIL = 'PUT_DETAILS_FAIL'

const SET_INDEX = 'SET_INDEX_BEGIN'

const initialState = {
  data: [],
  index: null,
  getting: false,
  adding: false,
  details: []
}

export const getProducts = () => dispatch => {
  dispatch({type: GET_BEGIN})
  fetch(
    `https://product-list.getsandbox.com/products`
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: GET_SUCCESS, data: data})
  ).catch(
    error => dispatch({ type: GET_FAIL, error})
  )
}

export const getDetails = (index) => dispatch => {
  dispatch({type: GET_DETAILS_BEGIN})
  fetch(
    `https://product-list.getsandbox.com/products/${index}`
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: GET_DETAILS_SUCCESS, details: data})
  ).catch (
    error => dispatch({ type: GET_DETAILS_FAIL, error})
  )
}

export const updateProduct = (productName, productNumber, productDescription, index) => dispatch => {
  dispatch({type: PUT_DETAILS_BEGIN})
  fetch(
    `https://product-list.getsandbox.com/products/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: productName,
        number: productNumber,
        description: productDescription
      })

    }
  ).then(
    response => response.json()
  ).then(
    data => {
      dispatch({ type: PUT_DETAILS_SUCCESS, data })
      dispatch(getDetails(index))
    }
  ).catch(
    error => dispatch({ type: PUT_DETAILS_FAIL, error })
  )
}



export const setIndex = index => ({
  type: SET_INDEX, currentIndex: index
})


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_BEGIN:
      return {
        ...state,
        getting: true,
        error: null
      }
    case GET_SUCCESS:
      return {
        ...state,
        getting: false,
        data: action.data
      }
    case GET_FAIL:
      return {
        ...state,
        getting: false,
        error: action.error
      }
    case GET_DETAILS_BEGIN:
      return {
        ...state,
        getting: true,
        error: null
      }
    case GET_DETAILS_SUCCESS:
      return {
        ...state,
        getting: false,
        details: action.details
      }
    case GET_DETAILS_FAIL:
      return {
        ...state,
        getting: false,
        error: action.error
      }
    case PUT_DETAILS_BEGIN:
      return {
        ...state,
        adding: true,
      }
    case PUT_DETAILS_SUCCESS:
      return {
        ...state,
        adding: false
      }
    case PUT_DETAILS_FAIL:
      return {
        ...state,
        adding: false,
        error: action.error
      }
    case SET_INDEX:
      return {
        ...state,
        index: action.currentIndex
      }
    default:
      return state
  }
}