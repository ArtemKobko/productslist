import axios from 'axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { GET_PRODUCTS, GET_TOTALPAGES, CHANGE_MODAL_STATE } from './constants';
import { ApiProduct, ApiProducts, Product } from '../../types';
import {
  ActionGetProducts,
  ActionGetPage,
  ActionChangeModalState,
} from './types';

export const getProducts = (payload: Product[]): ActionGetProducts => ({
  type: GET_PRODUCTS,
  payload,
});

export const getPages = (payload: number): ActionGetPage => ({
  type: GET_TOTALPAGES,
  payload,
});

export const changeModalState = (payload: boolean): ActionChangeModalState => ({
  type: CHANGE_MODAL_STATE,
  payload,
});

export const fetchProducts = (page: string) => (dispatch: Dispatch) => {
  axios.get(`https://reqres.in/api/products?page=${page}&per_page=5`)
    .then((response: ApiProducts) => {
      dispatch(getPages(response.data.total_pages));
      dispatch(getProducts(response.data.data));
    })
    .catch((error: Error) => {
      toast.error(`Something goes wrong. ${error.message} `);
    });
};

export const getProductById = (id: number) => (dispatch: Dispatch) => {
  axios.get(`https://reqres.in/api/products/${id}`)
    .then((response: ApiProduct) => dispatch(getProducts([response.data.data])))
    .catch((error: Error) => {
      toast.error(`Something goes wrong. ${error.message}. Check the entered id`);
      dispatch(getProducts([]));
    });
};
