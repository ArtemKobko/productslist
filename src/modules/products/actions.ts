import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_PRODUCTS, GET_TOTALPAGES, CHANGE_MODAL_STATE } from './constants';
import { Product, ActionGetProducts, ActionGetPage, ActionChangeModalState  } from '../../types';
import { AppDispatch } from '../../store/store';


export const getProducts = (payload: Product[]):ActionGetProducts => ({
  type: GET_PRODUCTS,
  payload,
});
export const getPages = (payload: number):ActionGetPage => ({
  type: GET_TOTALPAGES,
  payload,
});
export const changeModalState = (payload:boolean): ActionChangeModalState => ({
  type: CHANGE_MODAL_STATE,
  payload,
});

export const fetchProducts = (page:string | null) => (dispatch: AppDispatch) => {
  axios.get(`https://reqres.in/api/products?page=${page}&per_page=5`)
    .then((response) => {
      dispatch(getPages(response.data.total_pages));
      dispatch(getProducts(response.data.data));
    })
    .catch((error) => {
      toast.error(`Something goes wrong. ${error.message} `);
    });
};

export const getProductById = (id: number) => (dispatch: AppDispatch) => {
  axios.get(`https://reqres.in/api/products/${id}`)
    .then((response) => dispatch(getProducts([response.data.data])))
    .catch((error) => {
      toast.error(`Something goes wrong. ${error.message}. Check the entered id`);
      dispatch(getProducts([]));
    });
};
