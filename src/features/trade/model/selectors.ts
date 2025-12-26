import { RootState } from '../../../store/types';

export const selectTradeStats = (state: RootState) => state.trades.stats;

export const selectTradeConnected = (state: RootState) =>
  state.trades.connected;
