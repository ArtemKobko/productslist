import { RootState } from "../../store/rootReduser";

export const selectProducts = (state:RootState) => state.products.products;
export const selectPages = (state:RootState) => state.products.totalPages;
export const selectModalState = (state:RootState) => state.products.isModalActive;
