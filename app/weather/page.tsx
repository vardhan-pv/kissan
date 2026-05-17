'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';
import { saveToCache, getFromCache, CACHE_KEYS } from '@/lib/cache';

export default function WeatherPage() {
  const router = useRouter();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Nashik');
  const [inputLoc, setInputLoc] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    const loc = u ? JSON.parse(u).location : 'Nashik';
    setLocation(loc || 'Nashik');
    setInputLoc(loc || 'Nashik');
    const cached = getFromCache(CACHE_KEYS.WEATHER);
    if (cached) { setWeather(cached); setLoading(false); }
    fetchWeather(loc || 'Nashik');
  }, []);

  const fetchWeather = async (loc: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      const d = await res.json();
      setWeather(d);
      saveToCache(CACHE_KEYS.WEATHER, d);
    } catch {}
    setLoading(false);
  };

  const speak = (t: string) => { const u = new SpeechSynthesisUtterance(t); window.speechSynthesis.speak(u); };

  const getTempColor = (temp: number) => temp > 38 ? '#ef4444' : temp > 32 ? '#f97316' : temp > 25 ? '#eab308' : '#3b82f6';

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>🌦️ Weather Forecast</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Smart alerts for your farm</div>

            {/* Current weather hero */}
            {weather && !loading && (
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 52, fontWeight: 800, color: 'white', lineHeight: 1 }}>{weather.current.temp}°</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{weather.current.icon} {weather.current.description}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>📍 {weather.location}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>↑ {weather.current.high}°  ↓ {weather.current.low}°</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>💧 {weather.current.humidity}%</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>💨 {weather.current.wind} m/s</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="page-body">
          {/* Location search */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div className="input-wrap" style={{ flex: 1 }}>
              <span>📍</span>
              <input placeholder="Enter location..." value={inputLoc} onChange={e => setInputLoc(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchWeather(inputLoc)} />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => fetchWeather(inputLoc)}>Search</button>
          </div>

          {loading && !weather ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : weather ? (
            <>
              {/* Smart farming alerts */}
              <div className="section-header"><span className="section-title">⚠️ Smart Farming Alerts</span>
                <button onClick={() => weather.alerts.forEach((a: string) => setTimeout(() => speak(a), 500))} style={{ background: 'transparent', border: 'none', color: 'var(--green)', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>🔊 Read All</button>
              </div>
              {weather.alerts.map((alert: string, i: number) => {
                const isRain = alert.includes('🌧️') || alert.includes('🌦️');
                const isDanger = alert.includes('🔥') || alert.includes('❄️');
                return (
                  <div key={i} className={`alert ${isDanger ? 'alert-danger' : isRain ? 'alert-info' : 'alert-warning'}`}>
                    <span className="alert-icon">{alert.split(' ')[0]}</span>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: isDanger ? '#dc2626' : isRain ? '#1d4ed8' : '#92400e' }}>
                      {alert.replace(/^[^\s]+\s/, '')}
                    </div>
                    <button onClick={() => speak(alert)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}>🔊</button>
                  </div>
                );
              })}

              {/* 7-day forecast */}
              <div className="section-header"><span className="section-title">📅 7-Day Forecast</span></div>
              <div className="forecast-row">
                {weather.forecast.map((f: any, i: number) => (
                  <div key={i} className={`forecast-day ${i === 0 ? 'today' : f.cond === 'Rain' || f.cond === 'Drizzle' || f.cond === 'Thunderstorm' ? 'rain' : ''}`}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? 'rgba(255,255,255,0.85)' : 'var(--gray-500)' }}>{i === 0 ? 'Today' : f.day}</div>
                    <div style={{ fontSize: 22, margin: '6px 0' }}>{f.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: i === 0 ? 'white' : getTempColor(f.temp) }}>{f.temp}°</div>
                  </div>
                ))}
              </div>

              {/* Farming calendar */}
              <div className="section-header"><span className="section-title">🗓️ Best Farming Days</span></div>
              <div className="card" style={{ padding: '4px 16px' }}>
                {weather.forecast.slice(0, 5).map((f: any, i: number) => {
                  const goodDay = f.cond === 'Clear' || f.cond === 'Clouds';
                  const rainDay = ['Rain', 'Drizzle', 'Thunderstorm'].includes(f.cond);
                  return (
                    <div key={i} className="step-item">
                      <div className={`step-dot ${goodDay ? 'step-dot-green' : rainDay ? 'step-dot-blue' : 'step-dot-yellow'}`}>
                        {f.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{i === 0 ? 'Today' : f.day} — {f.temp}°C</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                          {goodDay ? '✅ Good for spraying, field work' : rainDay ? '⛔ Avoid spraying, good for planting' : '⚡ Check moisture before irrigation'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Seasonal advice */}
              <div className="card" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>🌱 Seasonal Farm Advice</div>
                <div style={{ fontSize: 13, color: '#166534', lineHeight: 1.6 }}>
                  Based on {weather.location}'s current weather patterns, this is a good time for <strong>Kharif crops</strong> like tomato and cotton. 
                  Ensure drip irrigation is set up before temperatures rise above 36°C. Watch for fungal diseases when humidity exceeds 75%.
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
