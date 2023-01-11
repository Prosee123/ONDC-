
 import { createStore, applyMiddleware } from 'redux';
 import createSagaMiddleware from 'redux-saga';
 import IndexReducer from "./index-reducer";
 import IndexSaga from './index-saga';
 
 
 const sagaMiddleware = createSagaMiddleware();
 const middleware = [sagaMiddleware];
 
 export const store = createStore(IndexReducer, applyMiddleware(...middleware));
 
 sagaMiddleware.run(IndexSaga);

