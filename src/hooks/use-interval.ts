import { useEffect, useRef } from "react";

type CallBackType = () => void;

export function useInterval(callback: CallBackType, delay: number) {
  const savedCallback = useRef<CallBackType>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
