// hooks/useCurrentTime.ts
import { useState, useEffect } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default useCurrentTime;
