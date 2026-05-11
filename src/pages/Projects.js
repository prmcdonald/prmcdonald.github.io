import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { useHour } from '../hooks/useHour';
import { useWeather } from '../hooks/useWeather';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { fontSerif, fontSans } from '../data/posts';

export default function Projects() {
  const hour = useHour();
  const weather = useWeather();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isNight = hour < 6.5 || hour > 19;

  const bg = isNight ? '#1a1814' : '#faf6ee';
  const fg = isNight ? '#f5f1ea' : '#1a1814';

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: bg, color: fg, fontFamily: fontSans }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <WeatherSky weather={weather} />
        <NavDesktop active="projects" />
      </div>

      <div style={{ padding: isMobile ? '24px 20px 48px' : '48px 56px 80px' }}>
        <MonoLabel style={{ marginBottom: 18 }}>Projects · coming soon</MonoLabel>
        <h1 style={{
          fontFamily: fontSerif,
          fontSize: 'clamp(32px, 8vw, 76px)',
          lineHeight: 0.86,
          letterSpacing: isMobile ? -2 : -7,
          fontWeight: 400,
          margin: 0,
        }}>
          Things I've <em>built</em>.
        </h1>
      </div>
    </div>
  );
}
