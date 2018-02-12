const GET_BEGIN = 'GET_BEGIN';
const GET_SUCCESS = 'GET_SUCCESS';
const GET_FAIL = 'GET_FAIL';

const GET_PRODUCT_BEGIN = 'GET_PRODUCT_BEGIN';
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';

const PUT_DETAILS_BEGIN = 'PUT_DETAILS_BEGIN';
const PUT_DETAILS_SUCCESS = 'PUT_DETAILS_SUCCESS';
const PUT_DETAILS_FAIL = 'PUT_DETAILS_FAIL';

const SET_INDEX = 'SET_INDEX_BEGIN';

const initialState = {
  data: [],
  index: null,
  getting: false,
  adding: false,
  details: []
}

const API_URL = 'https://product-list.getsandbox.com/products';

export const getProducts = () => dispatch => {
  dispatch({type: GET_BEGIN})
  fetch(
    API_URL
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: GET_SUCCESS, data: data})
  ).catch(
    error => dispatch({ type: GET_FAIL, error})
  )
}

export const getProduct = (index) => dispatch => {
  dispatch({type: GET_PRODUCT_BEGIN})
  fetch(
      `${API_URL}/${index}`
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: GET_PRODUCT_SUCCESS, details: data})
  ).catch (
    error => dispatch({ type: GET_PRODUCT_FAIL, error})
  )
}

export const updateProduct = (name, number, description, index) => dispatch => {
  dispatch({type: PUT_DETAILS_BEGIN})
  fetch(
    `${API_URL}/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        number,
        description
      })

    }
  ).then(
    response => response.json()
  ).then(
    data => {
      dispatch({ type: PUT_DETAILS_SUCCESS, data })
      dispatch(getProduct(index))
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
    case GET_PRODUCT_BEGIN:
      return {
        ...state,
        getting: true,
        error: null
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        getting: false,
        details: action.details
      }
    case GET_PRODUCT_FAIL:
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