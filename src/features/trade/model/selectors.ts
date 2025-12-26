import { RootState } from '../../../store/types';

export const selectHistory = (state: RootState) => state.trades.history;
export const selectSymbol = (state: RootState) => state.trades.symbol;
export const selectTradeStats = (state: RootState) => state.trades.stats;

export const selectTradeConnected = (state: RootState) =>
  state.trades.connected;
