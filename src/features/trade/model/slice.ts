import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TradeState, TradeStats } from './types';

const initialState: TradeState = {
  connected: false,
  stats: null,
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    socketConnected(state) {
      state.connected = true;
    },
    socketDisconnected(state) {
      state.connected = false;
    },
    statsUpdated(state, action: PayloadAction<TradeStats>) {
      state.stats = action.payload;
    },
  },
});

export const { socketConnected, socketDisconnected, statsUpdated } =
  tradesSlice.actions;

export default tradesSlice.reducer;
