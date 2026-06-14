import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { usePageTheme } from '../hooks/usePageTheme';
import styles from './Projects.module.css';

export default function Projects() {
  const { weather, isNight, vars } = usePageTheme();

  return (
    <div className={styles.page} data-night={isNight} style={vars}>
      <div className={styles.skyHeader}>
        <WeatherSky weather={weather} />
        <NavDesktop active="projects" />
      </div>

      <div className={styles.heading}>
        <MonoLabel style={{ marginBottom: 18 }}>Projects · coming soon</MonoLabel>
        <h1 className={styles.title}>
          Things I've <em>built</em>.
        </h1>
      </div>
    </div>
  );
}
