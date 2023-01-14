import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_PRODUCTS, GET_TOTALPAGES } from './constants';

export const getProducts = (payload) => ({
  type: GET_PRODUCTS,
  payload,
});
export const getPages = (payload) => ({
  type: GET_TOTALPAGES,
  payload,
});

export const fetchProducts = (page) => (dispatch) => {
  axios.get(`https://reqres.in/api/products?page=${page}&per_page=5`)
    .then((response) => {
      dispatch(getPages(response.data.total_pages));
      dispatch(getProducts(response.data.data));
    })
    .catch((error) => {
      if (error.response.status >= 400) {
        toast.error(`Request failed with status code ${error.response.status} `);
      }
    });
};

export const getProductById = (id) => (dispatch) => {
  axios.get(`https://reqres.in/api/products/${id}`)
    .then((response) => dispatch(getProducts([response.data.data])))
    .catch((error) => {
      if (error.response.status >= 400) {
        toast.error(`Request failed with status code ${error.response.status}. Check the entered id`);
        dispatch(getProducts([]));
      }
    });
};
