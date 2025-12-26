import { TradeStats } from '../../model/types';

type Props = {
  data: TradeStats[];
};

export const MiniChart = ({ data }: Props) => {
  if (data.length < 2) {
    return null;
  }

  const max = Math.max(...data.map((d) => d.avgPrice));
  const min = Math.min(...data.map((d) => d.avgPrice));

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.avgPrice - min) / (max - min)) * 100;

      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100">
      <polyline fill="none" stroke="white" strokeWidth="2" points={points} />
    </svg>
  );
};
