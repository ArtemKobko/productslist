import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReduser';
// import productsReducer from '../modules/products/reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export type AppDispatch = typeof store.dispatch
export default store;
