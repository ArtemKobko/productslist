import { GET_PRODUCTS, GET_TOTALPAGES, CHANGE_MODAL_STATE } from './constants';

const initialState = { products: [], totalPages: 1, isModalActive: false };

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
    case CHANGE_MODAL_STATE:
      return {
        ...state,
        isModalActive: action.payload,
      };
    default:
      return state;
  }
}

export default productsReducer;
