import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('dark-mode') === 'true'; }
    catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('dark-mode', String(isDark)); }
    catch {}
  }, [isDark]);

  return [isDark, setIsDark];
}
