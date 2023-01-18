import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './store/rootReducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useDispatch = () => useDispatchRedux<TypedDispatch<RootState>>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
