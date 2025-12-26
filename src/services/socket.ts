export function createSocket(url: string) {
  const ws = new WebSocket(url);

  return {
    ws,
    send: (data: unknown) => ws.send(JSON.stringify(data)),
  };
}
