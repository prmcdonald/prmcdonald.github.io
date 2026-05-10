import { useState, useEffect } from 'react';

// WMO weather interpretation codes → our palette keys
const WMO = {
  0: 'clear', 1: 'clear', 2: 'partly', 3: 'cloudy',
  45: 'fog', 48: 'fog',
  51: 'rain', 53: 'rain', 55: 'rain',
  56: 'rain', 57: 'rain',
  61: 'rain', 63: 'rain', 65: 'rain',
  66: 'rain', 67: 'rain',
  71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
  80: 'rain', 81: 'rain', 82: 'rain',
  85: 'snow', 86: 'snow',
  95: 'storm', 96: 'storm', 99: 'storm',
};

// Chicago, IL
const LAT = 41.8781;
const LON = -87.6298;

export function useWeather() {
  const [weather, setWeather] = useState('clear');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=weather_code&timezone=auto`
        );
        const data = await res.json();
        const code = data.current?.weather_code ?? 0;
        setWeather(WMO[code] ?? 'clear');
      } catch {
        // keep current value on network error
      }
    };

    fetchWeather();
    const id = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return weather;
}
