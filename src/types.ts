export interface Product {
  name: string;
  id: number;
  color: string;
  year: number;
  pantone_value: string;
}

export interface ProductsState {
  products: Product[];
  totalPages: number;
  isModalActive: boolean;
}

export interface ApiProducts {
  data: {
    total_pages: number;
    data: Product[]
  }
}

export interface ApiProduct {
  data: {
    data: Product
  }
}
