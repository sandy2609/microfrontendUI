import { configureStore, Reducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const emptyReducer: Reducer = (state = {}, action) => state;

let dynamicReducers: Record<string, Reducer> = {}; 

const store = configureStore({
  reducer: emptyReducer, 
  devTools: process.env.NODE_ENV !== 'production',
});

export const injectReducer = (appName: string, reducer: Reducer) => {

  dynamicReducers[appName] = reducer;
  store.replaceReducer(combineReducers({ ...dynamicReducers }));
};

export const removeReducer = (appName: string) => {
  delete dynamicReducers[appName];
  store.replaceReducer(combineReducers({ ...dynamicReducers }));
};

export default store;
