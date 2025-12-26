import { useEffect, useState } from 'react';

export function useLerp(value: number, speed = 0.1) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let raf: number;

    function tick() {
      setDisplay((prev) => prev + (value - prev) * speed);
      raf = requestAnimationFrame(tick);
    }

    tick();

    return () => cancelAnimationFrame(raf);
  }, [value, speed]);

  return display;
}
