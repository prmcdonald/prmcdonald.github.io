import { useContentMode } from '../content/ContentModeContext';
import styles from './StarToggle.module.css';

/**
 * Small star button that toggles between placeholder (lorem) and AI copy.
 * Filled ★ when AI copy is shown, outline ☆ when showing the default placeholder.
 * `fg` lets the surrounding header pass its text color so the star matches.
 */
export default function StarToggle({ fg }) {
  const { mode, toggle } = useContentMode();
  const showingAI = mode === 'ai';

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.button}
      style={fg ? { '--star-fg': fg } : undefined}
      aria-pressed={showingAI}
      aria-label={showingAI ? 'Show placeholder copy' : 'Show original copy'}
      title={showingAI ? 'Show placeholder copy' : 'Show original copy'}
    >
      {showingAI ? '★' : '☆'}
    </button>
  );
}
