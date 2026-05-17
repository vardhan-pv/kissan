'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';

const BADGE_LIST = [
  { icon: '🥇', name: 'Smart Farmer', desc: 'Used KisanAI for 7 days', earned: true, xp: 50 },
  { icon: '🦠', name: 'Disease Detector', desc: 'Scanned 5 crops', earned: true, xp: 40 },
  { icon: '📈', name: 'Market Expert', desc: 'Checked prices 10 times', earned: false, xp: 60 },
  { icon: '💧', name: 'Water Saver', desc: 'Used drip irrigation tips', earned: false, xp: 45 },
  { icon: '👥', name: 'Community Star', desc: 'Posted 3 tips', earned: false, xp: 35 },
  { icon: '🌦️', name: 'Weather Watcher', desc: 'Checked weather 7 days', earned: false, xp: 30 },
  { icon: '🧪', name: 'Fertilizer Pro', desc: 'Followed 5 fertilizer plans', earned: false, xp: 55 },
  { icon: '🏆', name: 'Top Farmer', desc: 'Earn all badges', earned: false, xp: 100 },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [lang, setLang] = useState('en');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    const parsed = JSON.parse(u);
    setUser(parsed);
    setForm(parsed);
    setLang(localStorage.getItem('kisanai_lang') || 'en');
  }, []);

  const saveProfile = () => {
    const updated = { ...user, ...form };
    setUser(updated);
    localStorage.setItem('kisanai_user', JSON.stringify(updated));
    localStorage.setItem('kisanai_lang', lang);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const logout = () => {
    localStorage.removeItem('kisanai_user');
    router.push('/');
  };

  const lvl = user?.level || 1;
  const points = user?.points || 0;
  const xpPct = ((points % 500) / 500) * 100;
  const earnedBadges = BADGE_LIST.filter(b => b.earned);

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
                {user?.avatar || '👨‍🌾'}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>{user?.name || 'Farmer'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>📍 {user?.location} · {user?.acres} acres</div>
                <div style={{ fontSize: 12, color: '#84cc16', marginTop: 4, fontWeight: 700 }}>⭐ Level {lvl} Farmer</div>
              </div>
            </div>

            {/* XP */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{points} XP</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Next level: {lvl * 500} XP</span>
              </div>
              <div className="xp-bar-container">
                <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          {saved && <div className="alert alert-success"><span className="alert-icon">✅</span><span style={{ fontSize: 13, fontWeight: 600, color: '#166534' }}>Profile saved!</span></div>}

          {/* Badges */}
          <div className="section-header"><span className="section-title">🏆 Badges ({earnedBadges.length}/{BADGE_LIST.length})</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
            {BADGE_LIST.map(b => (
              <div key={b.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: b.earned ? 1 : 0.3 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: b.earned ? '#fef9c3' : 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: b.earned ? '2px solid #fde68a' : '2px solid var(--gray-200)' }}>{b.icon}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: b.earned ? 'var(--gray-700)' : 'var(--gray-400)', textAlign: 'center', lineHeight: 1.2 }}>{b.name}</div>
                <div style={{ fontSize: 9, color: 'var(--green)', fontWeight: 600 }}>+{b.xp} XP</div>
              </div>
            ))}
          </div>

          {/* Language */}
          <div className="section-header"><span className="section-title">🌍 Language</span></div>
          <div className="card" style={{ display: 'flex', gap: 10 }}>
            {[['en', '🇬🇧 English'], ['hi', '🇮🇳 हिंदी'], ['kn', '🇮🇳 ಕನ್ನಡ']].map(([v, l]) => (
              <button key={v} onClick={() => { setLang(v); localStorage.setItem('kisanai_lang', v); }} style={{ flex: 1, padding: '10px 6px', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', background: lang === v ? 'var(--green)' : 'var(--gray-100)', color: lang === v ? 'white' : 'var(--gray-600)' }}>{l}</button>
            ))}
          </div>

          {/* Profile edit */}
          <div className="section-header">
            <span className="section-title">👤 Profile</span>
            <button onClick={() => setEditing(!editing)} style={{ background: 'transparent', border: 'none', color: 'var(--green)', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>{editing ? 'Cancel' : '✏️ Edit'}</button>
          </div>
          <div className="card">
            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { key: 'name', label: 'Full Name', icon: '👤', type: 'text' },
                  { key: 'phone', label: 'Mobile', icon: '📱', type: 'tel' },
                  { key: 'location', label: 'Location', icon: '📍', type: 'text' },
                  { key: 'acres', label: 'Land (acres)', icon: '🌾', type: 'number' },
                ].map(f => (
                  <div key={f.key} className="input-group">
                    <label className="input-label">{f.label}</label>
                    <div className="input-wrap"><span>{f.icon}</span><input type={f.type} value={form[f.key] || ''} onChange={e => setForm((p: any) => ({ ...p, [f.key]: e.target.value }))} /></div>
                  </div>
                ))}
                <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Name', icon: '👤', value: user?.name },
                  { label: 'Phone', icon: '📱', value: user?.phone || 'Not set' },
                  { label: 'Location', icon: '📍', value: user?.location },
                  { label: 'Land', icon: '🌾', value: `${user?.acres || 0} acres` },
                  { label: 'Role', icon: '💼', value: user?.role || 'Farmer' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* App info + logout */}
          <div className="card" style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: '🔔', label: 'Notifications', action: () => router.push('/notifications') },
                { icon: '📋', label: 'Farm Tracker', action: () => router.push('/farm') },
                { icon: '🛡️', label: 'Privacy Policy', action: () => {} },
                { icon: '⭐', label: 'Rate App', action: () => {} },
              ].map(item => (
                <button key={item.label} onClick={item.action} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', border: 'none', borderBottom: '1px solid var(--gray-100)', background: 'transparent', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', flex: 1 }}>{item.label}</span>
                  <span style={{ color: 'var(--gray-400)' }}>›</span>
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-danger btn-full" style={{ marginTop: 8 }} onClick={logout}>🚪 Logout</button>

          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-300)', marginTop: 16 }}>
            KisanAI v2.0 · Made for Indian Farmers 🇮🇳
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
