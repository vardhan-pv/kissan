'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';
import VoiceButton from '../VoiceButton';
import { saveToCache, getFromCache, CACHE_KEYS } from '@/lib/cache';

interface User { id: string; name: string; location: string; acres: number; avatar: string; points: number; level: number; }
interface Weather { location: string; current: { temp: number; humidity: number; description: string; main: string; high: number; low: number; icon: string }; forecast: any[]; alerts: string[]; }

const QUICK_ACTIONS = [
  { label: 'Grow Crop', icon: '🌱', path: '/advisor' },
  { label: 'Check Prices', icon: '📊', path: '/market' },
  { label: 'Scan Crop', icon: '📸', path: '/scan' },
  { label: 'Weather', icon: '🌦️', path: '/weather' },
];

const BADGES = [
  { icon: '🥇', name: 'Smart Farmer', earned: true },
  { icon: '🦠', name: 'Disease Detector', earned: true },
  { icon: '💧', name: 'Water Saver', earned: false },
  { icon: '📈', name: 'Market Expert', earned: false },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [voiceText, setVoiceText] = useState('');
  const [offline, setOffline] = useState(false);
  const [greeting, setGreeting] = useState('Good morning');
  const [showNotif, setShowNotif] = useState<string | null>(null);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    setUser(JSON.parse(u));

    const hr = new Date().getHours();
    setGreeting(hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening');
    setOffline(!navigator.onLine);

    // Show welcome notification
    setTimeout(() => setShowNotif('💧 Reminder: Irrigate tomato crop today — temperature 34°C'), 1500);
    setTimeout(() => setShowNotif(null), 5000);

    fetchWeather(JSON.parse(u).location || 'Nashik');
  }, []);

  const fetchWeather = async (loc: string) => {
    const cached = getFromCache<Weather>(CACHE_KEYS.WEATHER);
    if (cached) { setWeather(cached); }
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      const d = await res.json();
      setWeather(d);
      saveToCache(CACHE_KEYS.WEATHER, d);
    } catch { setOffline(true); }
  };

  const handleVoice = (text: string) => {
    setVoiceText(text);
    const t = text.toLowerCase();
    if (t.includes('price') || t.includes('market') || t.includes('bhav')) router.push('/market');
    else if (t.includes('weather') || t.includes('mausam') || t.includes('rain')) router.push('/weather');
    else if (t.includes('scan') || t.includes('disease') || t.includes('bimari')) router.push('/scan');
    else if (t.includes('advisor') || t.includes('grow') || t.includes('crop') || t.includes('fasal')) router.push('/advisor');
    else if (t.includes('community') || t.includes('farmer')) router.push('/community');
    else if (t.includes('farm') || t.includes('track')) router.push('/farm');
    else router.push('/advisor');
  };

  const speak = (text: string) => {
    const u = window.speechSynthesis.getVoices().find(v => v.lang.includes('en-IN')) || window.speechSynthesis.getVoices()[0];
    const utt = new SpeechSynthesisUtterance(text);
    if (u) utt.voice = u;
    window.speechSynthesis.speak(utt);
  };

  const xpPct = ((((user?.points || 0) % 500) / 500) * 100);
  const lvl = user?.level || 1;

  return (
    <div className="app-shell">
      {showNotif && (
        <div className="popup-notif">
          <span style={{ fontSize: 20 }}>🔔</span>
          <span style={{ fontSize: 13, color: 'var(--gray-700)', flex: 1 }}>{showNotif}</span>
          <span style={{ cursor: 'pointer', color: 'var(--gray-400)' }} onClick={() => setShowNotif(null)}>✕</span>
        </div>
      )}

      <div className="screen">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{greeting} 👋</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{user?.name || 'Farmer'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
                  📍 {user?.location || 'Maharashtra'} · {user?.acres || 0} acres
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: 'white', fontWeight: 600 }}>
                  ⭐ {user?.points || 0} XP · Lv{lvl}
                </div>
                <button onClick={() => router.push('/profile')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: 'white', cursor: 'pointer' }}>
                  {user?.avatar || '👨‍🌾'} Profile
                </button>
              </div>
            </div>

            {/* XP bar */}
            <div className="xp-bar-container">
              <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{user?.points || 0} / {lvl * 500} XP to Level {lvl + 1}</div>

            {/* Voice */}
            <div className="voice-btn-container" style={{ marginTop: 14 }}>
              <VoiceButton onResult={handleVoice} />
              <div>
                <div style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>🎙️ Tap to speak</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{voiceText || '"Check tomato price" · "Check weather"'}</div>
              </div>
            </div>

            {/* Weather strip */}
            {weather && (
              <div className="weather-strip">
                <div>
                  <div className="weather-temp">{weather.current.icon} {weather.current.temp}°C</div>
                  <div className="weather-desc">{weather.current.description}</div>
                  <div className="weather-loc">📍 {weather.location}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>H:{weather.current.high}° L:{weather.current.low}°</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>💧 {weather.current.humidity}%</div>
                  <button onClick={() => router.push('/weather')} style={{ fontSize: 11, color: '#86efac', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: 4 }}>7-day forecast →</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="page-body">
          {offline && (
            <div className="offline-banner">
              <span>📶</span> Offline mode — showing cached data
            </div>
          )}

          {/* Weather alerts */}
          {weather?.alerts?.slice(0, 2).map((a, i) => (
            <div key={i} className={`alert ${a.includes('🔥') ? 'alert-danger' : a.includes('🌧️') ? 'alert-info' : 'alert-warning'}`}>
              <span className="alert-icon">{a.split(' ')[0]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.slice(2)}</div>
              </div>
              <button onClick={() => speak(a)} style={{ background: 'transparent', border: 'none', fontSize: 16, cursor: 'pointer' }}>🔊</button>
            </div>
          ))}

          {/* Quick Actions */}
          <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 600, marginBottom: 8 }}>What do you want to do?</div>
          <div className="quick-actions">
            {QUICK_ACTIONS.map(a => (
              <button key={a.path} className="quick-btn" onClick={() => router.push(a.path)}>
                <div className="quick-btn-icon">{a.icon}</div>
                <div className="quick-btn-label">{a.label}</div>
              </button>
            ))}
          </div>

          {/* Today's actions */}
          <div className="section-header">
            <span className="section-title">📅 Today's Actions</span>
            <span className="section-link" onClick={() => router.push('/notifications')}>All →</span>
          </div>
          <div className="card" style={{ padding: '4px 16px' }}>
            {[
              { icon: '💧', label: 'Irrigate tomato crop', note: 'Temperature 34°C', badge: 'Urgent', color: 'danger', step: 'step-dot-red' },
              { icon: '🧪', label: 'Apply Urea to onion', note: 'Scheduled — Day 65', badge: 'Today', color: 'warning', step: 'step-dot-yellow' },
              { icon: '📊', label: 'Hold tomato — sell in 5 days', note: 'Price rising 12%', badge: 'Tip', color: 'info', step: 'step-dot-blue' },
            ].map((item, i) => (
              <div key={i} className="step-item">
                <div className={`step-dot ${item.step}`}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{item.note}</div>
                </div>
                <span className={`badge badge-${item.color}`}>{item.badge}</span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="section-header">
            <span className="section-title">📈 Farm Status</span>
            <span className="section-link" onClick={() => router.push('/farm')}>Details →</span>
          </div>
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-label">🌱 Tomato Health</div>
              <div className="metric-value" style={{ color: 'var(--green)', fontSize: 18 }}>Good</div>
              <div className="metric-change change-up">Last scan 2h ago</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">🧅 Onion Progress</div>
              <div className="metric-value" style={{ fontSize: 18 }}>85%</div>
              <div className="metric-change" style={{ color: 'var(--yellow)' }}>Harvest in 10 days</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">🍅 Tomato Price</div>
              <div className="metric-value" style={{ fontSize: 18 }}>₹2,450</div>
              <div className="metric-change change-up">↑ 4.2% this week</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">💰 Est. Profit</div>
              <div className="metric-value" style={{ fontSize: 18, color: 'var(--green)' }}>₹1.2L</div>
              <div className="metric-change change-up">This season</div>
            </div>
          </div>

          {/* Badges */}
          <div className="section-header">
            <span className="section-title">🏆 Badges</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {BADGES.map(b => (
              <div key={b.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: b.earned ? 1 : 0.35 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: b.earned ? '#fef9c3' : 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: b.earned ? '2px solid #fde68a' : '2px solid var(--gray-200)' }}>{b.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: b.earned ? 'var(--gray-700)' : 'var(--gray-400)', textAlign: 'center', maxWidth: 60 }}>{b.name}</div>
              </div>
            ))}
          </div>

          {/* More links */}
          <div className="section-header" style={{ marginTop: 20 }}>
            <span className="section-title">More</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '📋', label: 'Farm Tracker', path: '/farm' },
              { icon: '🔔', label: 'Reminders', path: '/notifications' },
              { icon: '👥', label: 'Community', path: '/community' },
              { icon: '👤', label: 'My Profile', path: '/profile' },
            ].map(m => (
              <button key={m.path} onClick={() => router.push(m.path)} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: 'none', textAlign: 'left', padding: '14px' }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-700)' }}>{m.label}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--gray-400)' }}>›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
