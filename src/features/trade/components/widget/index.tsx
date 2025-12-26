import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTradeConnected, selectTradeStats } from '../../model/selectors';

import styles from './widget.module.scss';

export function TradeWidget() {
  const stats = useSelector(selectTradeStats);
  const connected = useSelector(selectTradeConnected);

  const prevPrice = useRef<number | null>(null);

  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (!stats) {
      return;
    }

    if (prevPrice.current !== null) {
      if (stats.avgPrice > prevPrice.current) {
        setDirection('up');
      }

      if (stats.avgPrice < prevPrice.current) {
        setDirection('down');
      }
    }

    prevPrice.current = stats.avgPrice;
  }, [stats]);

  if (!connected) {
    return <div className={styles.card}>Disconnected</div>;
  }

  if (!stats) {
    return <div className={styles.card}>Waiting for data…</div>;
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.price} ${styles[direction || '']}`}>
        ${stats.avgPrice.toFixed(2)}
      </div>

      <div className={styles.meta}>Trades/sec: {stats.count}</div>
    </div>
  );
}
