import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as str from '../../../../constants/strings';
import * as sel from '../../model/selectors';
import { MiniChart } from '../chart';
import { setSymbol } from '../../model/slice';
import { useLerp } from '../../hooks/use-lerp';
import { Toggle } from '../toggle';

import styles from './widget.module.scss';

export const TradeWidget = () => {
  const stats = useSelector(sel.selectTradeStats);
  const history = useSelector(sel.selectHistory);
  const connected = useSelector(sel.selectTradeConnected);
  const symbol = useSelector(sel.selectSymbol);

  const dispatch = useDispatch();

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

  const smoothPrice = useLerp(stats?.avgPrice || 0);

  const onToggleSymb = () =>
    dispatch(setSymbol(symbol === str.btcusdt ? str.ethusdt : str.btcusdt));

  return (
    <div className={styles.card}>
      <Toggle
        val={symbol}
        vals={[
          { title: str.btcusdt, onClick: onToggleSymb },
          { title: str.ethusdt, onClick: onToggleSymb },
        ]}
      />
      {!connected && <div>Disconnected</div>}
      {!stats && <div>Waiting for data…</div>}
      {connected && stats && (
        <>
          <div className={`${styles.price} ${styles[direction || '']}`}>
            ${smoothPrice.toFixed(2)}
          </div>
          <div className={styles.meta}>Trades/sec: {stats.count}</div>
          <MiniChart data={history} />
        </>
      )}
    </div>
  );
};
