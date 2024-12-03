import {combineReducers} from '@reduxjs/toolkit';
import persistSlice from './persistSlice';
import langSlice from './langSLice';

export const combinedReducers = combineReducers({
  persistSlice,
  langSlice,
});
