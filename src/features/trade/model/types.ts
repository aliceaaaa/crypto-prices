export type TradeStats = {
  count: number;
  avgPrice: number;
};

export type TradeState = {
  connected: boolean;
  stats: TradeStats | null;
};
