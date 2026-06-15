import WeatherSky from '../components/WeatherSky';
import MonoLabel from '../components/MonoLabel';
import NavDesktop from '../components/NavDesktop';
import { usePageTheme } from '../hooks/usePageTheme';
import { useContent } from '../content/useContent';
import styles from './Projects.module.css';

export default function Projects() {
  const { weather, isNight, vars } = usePageTheme();
  const { projects } = useContent();

  return (
    <div className={styles.page} data-night={isNight} style={vars}>
      <div className={styles.skyHeader}>
        <WeatherSky weather={weather} />
        <NavDesktop active="projects" />
      </div>

      <div className={styles.heading}>
        <MonoLabel style={{ marginBottom: 18 }}>Projects · coming soon</MonoLabel>
        <h1 className={styles.title}>{projects.title}</h1>
      </div>
    </div>
  );
}
