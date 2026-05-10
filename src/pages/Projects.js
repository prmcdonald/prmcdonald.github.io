import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { useWeather } from '../hooks/useWeather';
import { fontSerif, fontSans } from '../data/posts';

export default function Projects() {
  const weather = useWeather();

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#faf6ee', color: '#1a1814', fontFamily: fontSans }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <WeatherSky weather={weather} />
        <NavDesktop active="projects" />
      </div>

      <div style={{ padding: '48px 56px 80px' }}>
        <MonoLabel style={{ marginBottom: 18 }}>Projects · coming soon</MonoLabel>
        <h1 style={{ fontFamily: fontSerif, fontSize: 76, lineHeight: 0.86, letterSpacing: -7, fontWeight: 400, margin: 0 }}>
          Things I've <em>built</em>.
        </h1>
      </div>
    </div>
  );
}
