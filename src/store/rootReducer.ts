import { combineReducers } from 'redux';
import productsReducer from '../modules/products/reducer';

const rootReducer = combineReducers({
  products: productsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
