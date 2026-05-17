import { NextResponse } from 'next/server';

function getWeatherIcon(main: string) {
  const icons: Record<string, string> = {
    Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
    Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️',
  };
  return icons[main] || '🌤️';
}

function generateFarmingAlerts(weather: any, forecast: any[]): string[] {
  const alerts: string[] = [];
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const mainCond = weather.weather[0].main;

  if (temp > 35) alerts.push('🔥 High temperature — Irrigate crops early morning or evening');
  if (temp < 10) alerts.push('❄️ Cold weather — Protect sensitive crops from frost');
  if (mainCond === 'Rain') alerts.push('🌧️ Rain today — Avoid spraying fertilizer or pesticide');
  if (humidity > 80) alerts.push('💧 High humidity — Risk of fungal disease, apply fungicide');
  if (humidity < 30) alerts.push('🌵 Low humidity — Increase irrigation frequency');

  // Check tomorrow for rain
  if (forecast.length > 0 && forecast[0].weather[0].main === 'Rain') {
    alerts.push('🌧️ Rain expected tomorrow — Complete field work today');
  }

  if (alerts.length === 0) alerts.push('✅ Weather is good for farming today');
  return alerts;
}

// Fallback mock data when API key not available
function getMockWeather(location: string) {
  return {
    location,
    current: {
      temp: 32, humidity: 58, description: 'partly cloudy',
      main: 'Clouds', high: 36, low: 24, wind: 3.2,
      icon: '⛅',
    },
    forecast: [
      { day: 'Today', temp: 32, cond: 'Clouds', icon: '⛅' },
      { day: 'Sat', temp: 34, cond: 'Clear', icon: '☀️' },
      { day: 'Sun', temp: 28, cond: 'Rain', icon: '🌧️' },
      { day: 'Mon', temp: 30, cond: 'Drizzle', icon: '🌦️' },
      { day: 'Tue', temp: 33, cond: 'Clear', icon: '☀️' },
      { day: 'Wed', temp: 35, cond: 'Clear', icon: '☀️' },
      { day: 'Thu', temp: 31, cond: 'Clouds', icon: '⛅' },
    ],
    alerts: [
      '🌧️ Rain expected Sunday — Complete field work by Saturday',
      '🔥 High temperature Wed/Thu — Plan extra irrigation',
    ],
    coords: { lat: 19.9975, lon: 73.7898 },
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location') || 'Nashik';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_openweather_key') {
    return NextResponse.json(getMockWeather(location));
  }

  try {
    const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`);
    const geoData = await geoRes.json();
    if (!geoData?.length) return NextResponse.json(getMockWeather(location));

    const { lat, lon, name } = geoData[0];

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
    ]);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    const dailyForecast = forecastData.list
      .filter((_: any, i: number) => i % 8 === 0)
      .map((f: any) => ({
        day: new Date(f.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(f.main.temp),
        cond: f.weather[0].main,
        icon: getWeatherIcon(f.weather[0].main),
      }));

    const alerts = generateFarmingAlerts(weatherData, forecastData.list.slice(0, 8));

    return NextResponse.json({
      location: name,
      current: {
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
        main: weatherData.weather[0].main,
        high: Math.round(weatherData.main.temp_max),
        low: Math.round(weatherData.main.temp_min),
        wind: weatherData.wind.speed,
        icon: getWeatherIcon(weatherData.weather[0].main),
      },
      forecast: dailyForecast,
      alerts,
      coords: { lat, lon },
    });
  } catch (error) {
    console.error('Weather error:', error);
    return NextResponse.json(getMockWeather(location));
  }
}
