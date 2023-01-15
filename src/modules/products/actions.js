import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_PRODUCTS, GET_TOTALPAGES, CHANGE_MODAL_STATE } from './constants';

export const getProducts = (payload) => ({
  type: GET_PRODUCTS,
  payload,
});
export const getPages = (payload) => ({
  type: GET_TOTALPAGES,
  payload,
});
export const changeModalState = (payload) => ({
  type: CHANGE_MODAL_STATE,
  payload,
});

export const fetchProducts = (page) => (dispatch) => {
  axios.get(`https://reqres.in/api/products?page=${page}&per_page=5`)
    .then((response) => {
      dispatch(getPages(response.data.total_pages));
      dispatch(getProducts(response.data.data));
    })
    .catch((error) => {
      toast.error(`Something goes wrong. ${error.message} `);
    });
};

export const getProductById = (id) => (dispatch) => {
  axios.get(`https://reqres.in/api/products/${id}`)
    .then((response) => dispatch(getProducts([response.data.data])))
    .catch((error) => {
      toast.error(`Something goes wrong. ${error.message}. Check the entered id`);
      dispatch(getProducts([]));
    });
};
