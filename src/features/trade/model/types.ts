import { btcusdt, ethusdt } from '../../../constants/strings';

export type Symb = typeof btcusdt | typeof ethusdt;

export type TradeStats = {
  count: number;
  avgPrice: number;
  timestamp: number;
};

export type TradeState = {
  connected: boolean;
  stats: TradeStats | null;
  symbol: Symb;
  history: TradeStats[];
};
