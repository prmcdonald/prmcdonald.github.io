import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// WeatherSky draws to a <canvas>, which jsdom doesn't implement.
// useWeather hits a live API. Stub both so route smoke tests stay
// offline, deterministic, and focused on what App actually renders.
jest.mock('./components/WeatherSky', () => () => null);
jest.mock('./hooks/useWeather', () => ({ useWeather: () => 'clear' }));

// Content mode persists in localStorage; reset so each test starts at the
// default (lorem placeholder copy).
beforeEach(() => window.localStorage.clear());

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

test('home route renders the hero name', () => {
  renderAt('/');
  expect(screen.getByText('Preston')).toBeInTheDocument();
  expect(screen.getByText('McDonald')).toBeInTheDocument();
});

test('about route renders the bio header', () => {
  renderAt('/about');
  expect(screen.getByText(/long version/i)).toBeInTheDocument();
});

test('writing route renders the post index', () => {
  renderAt('/writing');
  expect(screen.getByText(/of \d+ posts/i)).toBeInTheDocument();
});

test('post route renders the back link', () => {
  renderAt('/writing/outer-wilds');
  expect(screen.getByText(/back to writing/i)).toBeInTheDocument();
});

test('projects route renders its heading', () => {
  renderAt('/projects');
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
});

test('defaults to placeholder copy with an unpressed star', () => {
  renderAt('/');
  const star = screen.getByRole('button', { name: /show original copy/i });
  expect(star).toHaveTextContent('☆');
  expect(star).toHaveAttribute('aria-pressed', 'false');
  // AI-only copy is hidden by default
  expect(screen.queryByText(/reluctant baker/i)).not.toBeInTheDocument();
});

test('clicking the star reveals the AI copy', () => {
  renderAt('/');
  fireEvent.click(screen.getByRole('button', { name: /show original copy/i }));
  expect(screen.getByText(/reluctant baker/i)).toBeInTheDocument();
  const star = screen.getByRole('button', { name: /show placeholder copy/i });
  expect(star).toHaveTextContent('★');
  expect(star).toHaveAttribute('aria-pressed', 'true');
});

test('reveal persists via localStorage across remount', () => {
  window.localStorage.setItem('content-mode', 'ai');
  renderAt('/');
  expect(screen.getByText(/reluctant baker/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /show placeholder copy/i })).toBeInTheDocument();
});
