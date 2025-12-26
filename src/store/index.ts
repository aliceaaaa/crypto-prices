import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from '../features/trade/model/slice';

export const store = configureStore({
  reducer: {
    trades: tradesReducer,
  },
});
