import { useState, useEffect } from 'react';

export function useHour() {
  const [hour, setHour] = useState(() => {
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setHour(d.getHours() + d.getMinutes() / 60);
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return hour;
}
