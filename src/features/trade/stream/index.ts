import { bufferTime, filter, fromEvent, map, Subscription } from 'rxjs';
import { createSocket } from '../../../services/socket';
import { store } from '../../../store';
import {
  socketConnected,
  socketDisconnected,
  statsUpdated,
} from '../model/slice';
import { Symb } from '../model/types';

let currentSub: Subscription | null = null;
let currentWs: WebSocket | null = null;

export function connect(symbol: Symb) {
  currentSub?.unsubscribe();
  currentWs?.close();

  const { ws, send } = createSocket('wss://stream.binance.com:9443/ws');
  currentWs = ws;

  ws.onopen = () => {
    store.dispatch(socketConnected());

    send({
      method: 'SUBSCRIBE',
      params: [`${symbol.toLowerCase()}@trade`],
      id: 1,
    });
  };

  ws.onclose = () => {
    if (ws !== currentWs) {
      return;
    }

    store.dispatch(socketDisconnected());
    setTimeout(() => connect(store.getState().trades.symbol), 1000);
  };

  currentSub = fromEvent<MessageEvent>(ws, 'message')
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
          timestamp: Date.now(),
        };
      })
    )
    .subscribe((stats) => {
      store.dispatch(statsUpdated(stats));
    });
}

export function startTradeStream() {
  let prevSymbol = store.getState().trades.symbol;

  connect(prevSymbol);

  store.subscribe(() => {
    const nextSymbol = store.getState().trades.symbol;

    if (nextSymbol !== prevSymbol) {
      prevSymbol = nextSymbol;
      connect(nextSymbol);
    }
  });
}
