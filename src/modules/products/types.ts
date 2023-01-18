import { Product } from '../../types';
import { GET_PRODUCTS, GET_TOTALPAGES, CHANGE_MODAL_STATE } from './constants';

export interface ActionGetProducts {
  type: typeof GET_PRODUCTS;
  payload: Product[];
}

export interface ActionGetPage {
  type: typeof GET_TOTALPAGES;
  payload: number;
}

export interface ActionChangeModalState {
  type: typeof CHANGE_MODAL_STATE;
  payload: boolean;
}

export type Actions = ActionGetProducts | ActionGetPage | ActionChangeModalState;
