import { GET_PRODUCTS, GET_TOTALPAGES } from './constants';

const initialState = { products: [], totalPages: 1 };

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_TOTALPAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    default:
      return state;
  }
}

export default productsReducer;
