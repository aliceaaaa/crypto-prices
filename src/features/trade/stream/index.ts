import { bufferTime, filter, fromEvent, map } from 'rxjs';
import { createSocket } from '../../../services/socket';
import { store } from '../../../store';
import {
  socketConnected,
  socketDisconnected,
  statsUpdated,
} from '../model/slice';

export function startTradeStream() {
  const { ws, send } = createSocket('wss://stream.binance.com:9443/ws');

  ws.onopen = () => {
    store.dispatch(socketConnected());

    send({
      method: 'SUBSCRIBE',
      params: ['btcusdt@trade'],
      id: 1,
    });
  };

  ws.onclose = () => {
    store.dispatch(socketDisconnected());
  };

  fromEvent<MessageEvent>(ws, 'message')
    .pipe(
      map((e) => JSON.parse(e.data)),
      filter((msg) => msg.e === 'trade'),
      map((msg) => Number(msg.p)),
      bufferTime(1000),
      filter((prices) => prices.length > 0),
      map((prices) => {
        const sum = prices.reduce((a, b) => a + b, 0);
        return {
          count: prices.length,
          avgPrice: sum / prices.length,
        };
      })
    )
    .subscribe((stats) => {
      store.dispatch(statsUpdated(stats));
    });
}
