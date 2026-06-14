import { useHour } from './useHour';
import { useWeather } from './useWeather';
import { tintForHour } from '../data/posts';

/**
 * Single source of truth for the time-of-day / weather theme.
 *
 * Returns the raw pieces (hour, weather, tint, isNight) plus `vars`: a style
 * object of CSS custom properties to spread onto a page's root element. CSS
 * modules then reference var(--fg) etc., so JS owns theming and CSS owns layout.
 *
 * `vars` is tuned for the solid inner pages (About / Writing / Post / Projects).
 * Home renders over the live sky and builds its own light-on-sky vars.
 */
export function usePageTheme() {
  const hour = useHour();
  const weather = useWeather();
  const tint = tintForHour(hour);
  const isNight = hour < 6.5 || hour > 19;

  const vars = {
    '--accent': tint.accent,
    '--bg': isNight ? '#1a1814' : '#faf6ee',
    '--fg': isNight ? '#f5f1ea' : '#1a1814',
    '--sub-fg': isNight ? 'rgba(245,241,234,0.70)' : 'rgba(26,24,20,0.70)',
    '--stroke': isNight ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,20,0.14)',
  };

  return { hour, weather, tint, isNight, vars };
}
