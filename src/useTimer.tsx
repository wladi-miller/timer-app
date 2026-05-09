import { useEffect, useMemo, useRef, useState } from "react";

type UseTimerResult = {
  isRunning: boolean;
  formattedTime: string;
  applyInputAsTime: (inputValue: string) => boolean;
  start: (inputValue: string) => void;
  pause: () => void;
  reset: () => void;
};

export function useTimer(): UseTimerResult {
  const [startMs, setStartMs] = useState(0);
  const [remainingMs, setRemainingMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof window.setInterval> | null>(
    null,
  );

  const clearTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const applyInputAsTime = (inputValue: string) => {
    const parsed = Number(inputValue);
    if (Number.isNaN(parsed) || parsed <= 0) return false;

    const totalMs = Math.round(parsed * 1000);
    setStartMs(totalMs);
    setRemainingMs(totalMs);
    return true;
  };

  const start = (inputValue: string) => {
    if (isRunning) return;

    if (remainingMs <= 0) {
      const ok = applyInputAsTime(inputValue);
      if (!ok) return;
    }

    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    clearTimer();
  };

  const reset = () => {
    setIsRunning(false);
    clearTimer();
    setRemainingMs(startMs);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setRemainingMs((prevMs) => {
        if (prevMs <= 10) {
          clearTimer();
          setIsRunning(false);
          return 0;
        }
        return prevMs - 10;
      });
    }, 10);

    return clearTimer;
  }, [isRunning]);

  const formattedTime = useMemo(
    () => `${(remainingMs / 1000).toFixed(3)}s`,
    [remainingMs],
  );

  return {
    isRunning,
    formattedTime,
    applyInputAsTime,
    start,
    pause,
    reset,
  };
}
