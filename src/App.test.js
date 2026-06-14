import { render, screen } from '@testing-library/react';
import App from './App';

// WeatherSky draws to a <canvas>, which jsdom doesn't implement.
// useWeather hits a live API. Stub both so route smoke tests stay
// offline, deterministic, and focused on what App actually renders.
jest.mock('./components/WeatherSky', () => () => null);
jest.mock('./hooks/useWeather', () => ({ useWeather: () => 'clear' }));

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
