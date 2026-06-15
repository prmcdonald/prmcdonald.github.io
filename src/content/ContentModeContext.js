import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'content-mode';

const ContentModeContext = createContext({ mode: 'lorem', toggle: () => {} });

/**
 * Provides the active content mode ('lorem' | 'ai'). Defaults to 'lorem' so a
 * first-time visitor always sees the placeholder copy. The choice persists in
 * localStorage so revealing the AI copy survives navigation and refresh.
 */
export function ContentModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'ai' ? 'ai' : 'lorem';
    } catch {
      return 'lorem';
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, mode); }
    catch {}
  }, [mode]);

  const value = useMemo(
    () => ({ mode, toggle: () => setMode((m) => (m === 'ai' ? 'lorem' : 'ai')) }),
    [mode]
  );

  return <ContentModeContext.Provider value={value}>{children}</ContentModeContext.Provider>;
}

export function useContentMode() {
  return useContext(ContentModeContext);
}
