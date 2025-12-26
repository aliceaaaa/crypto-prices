import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { btcusdt } from '../../../constants/strings';

import { Symb, TradeState, TradeStats } from './types';

const initialState: TradeState = {
  connected: false,
  stats: null,
  symbol: btcusdt,
  history: [],
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<Symb>) {
      state.symbol = action.payload;
      state.history = [];
      state.stats = null;
    },
    socketConnected(state) {
      state.connected = true;
    },
    socketDisconnected(state) {
      state.connected = false;
    },
    statsUpdated(state, action: PayloadAction<TradeStats>) {
      state.stats = action.payload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [first, ...rest] = state.history;
      state.history =
        state.history.length < 30
          ? [...state.history, action.payload]
          : [...rest, action.payload];
    },
  },
});

export const { socketConnected, socketDisconnected, setSymbol, statsUpdated } =
  tradesSlice.actions;

export default tradesSlice.reducer;
