export interface Product {
  name: string; 
  id: number;
  color: string;
  year: number; 
  pantone_value:string;
}

export interface productsState { 
  products: Product[]; 
  totalPages: number;
  isModalActive: boolean; 
}

export interface ActionGetProducts {
  type: string;
  payload: Product[];
}

export interface ActionGetPage {
  type: string;
  payload: number;
}

export interface ActionChangeModalState {
  type: string;
  payload: boolean;
}