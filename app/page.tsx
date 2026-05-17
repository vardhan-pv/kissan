'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [lang, setLang] = useState<'en' | 'hi' | 'kn'>('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', name: '', phone: '', location: '', acres: '', role: 'Farmer' });

  const labels: Record<string, Record<string, string>> = {
    en: { title: 'Grow Smarter,', titleSpan: 'Harvest More', sub: 'AI-powered insights for every farmer.', login: 'Login', register: 'Create Account', email: 'Email', password: 'Password', confirm: 'Confirm Password', name: 'Full Name', phone: 'Mobile Number', location: 'Village / District', acres: 'Land Size (Acres)', btnLogin: 'Enter Dashboard', btnReg: 'Register Now', switchToReg: "Don't have an account?", switchToLogin: 'Already have an account?', switchLink: 'Register', switchLoginLink: 'Login', demo: 'Try Demo (No account needed)' },
    hi: { title: 'समझदारी से उगाएं,', titleSpan: 'अधिक काटें', sub: 'हर किसान के लिए AI जानकारी।', login: 'लॉगिन', register: 'खाता बनाएं', email: 'ईमेल', password: 'पासवर्ड', confirm: 'पासवर्ड दोबारा', name: 'पूरा नाम', phone: 'मोबाइल', location: 'गांव / जिला', acres: 'जमीन (एकड़)', btnLogin: 'डैशबोर्ड खोलें', btnReg: 'रजिस्टर करें', switchToReg: 'खाता नहीं है?', switchToLogin: 'खाता है?', switchLink: 'बनाएं', switchLoginLink: 'लॉगिन', demo: 'डेमो आज़माएं' },
    kn: { title: 'ಜಾಣತನದಿಂದ ಬೆಳೆಯಿರಿ,', titleSpan: 'ಹೆಚ್ಚು ಕೊಯ್ಯಿರಿ', sub: 'ಪ್ರತಿ ರೈತನಿಗೂ AI ಮಾಹಿತಿ.', login: 'ಲಾಗಿನ್', register: 'ಖಾತೆ ತೆರೆಯಿರಿ', email: 'ಇಮೇಲ್', password: 'ಪಾಸ್‌ವರ್ಡ್', confirm: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ', name: 'ಪೂರ್ಣ ಹೆಸರು', phone: 'ಮೊಬೈಲ್', location: 'ಹಳ್ಳಿ / ಜಿಲ್ಲೆ', acres: 'ಜಮೀನು (ಎಕರೆ)', btnLogin: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ', btnReg: 'ನೋಂದಾಯಿಸಿ', switchToReg: 'ಖಾತೆ ಇಲ್ಲವೇ?', switchToLogin: 'ಖಾತೆ ಇದೆಯೇ?', switchLink: 'ತೆರೆಯಿರಿ', switchLoginLink: 'ಲಾಗಿನ್', demo: 'ಡೆಮೋ ಪ್ರಯತ್ನಿಸಿ' },
  };
  const L = labels[lang];

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleDemo = () => {
    localStorage.setItem('kisanai_user', JSON.stringify({ id: 'demo', name: 'Raju Patil', location: 'Nashik', acres: 8, phone: '9876543210', avatar: '👨‍🌾', points: 340, level: 3 }));
    localStorage.setItem('kisanai_lang', lang);
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    setError(''); setLoading(true);
    try {
      if (mode === 'register') {
        if (form.password !== form.confirmPassword) { setError('Passwords do not match'); setLoading(false); return; }
        const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        const d = await res.json();
        if (d.error) { setError(d.error); setLoading(false); return; }
        setMode('login');
        setError('✅ Registered! Please login.');
      } else {
        const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email, password: form.password }) });
        const d = await res.json();
        if (d.error) { setError(d.error); setLoading(false); return; }
        localStorage.setItem('kisanai_user', JSON.stringify(d.user));
        localStorage.setItem('kisanai_lang', lang);
        router.push('/dashboard');
      }
    } catch { setError('Network error. Try demo mode.'); }
    setLoading(false);
  };

  return (
    <div className="onboard-screen">
      <div className="onboard-content">
        {/* Logo */}
        <div className="logo-container">
          <span className="logo-icon">🌱</span>
          <div className="logo-text">
            <div className="app-name">KisanAI</div>
            <div className="app-tagline">Smart Farming Assistant</div>
          </div>
          {/* Language */}
          <div className="lang-pills" style={{ marginLeft: 'auto' }}>
            {(['en', 'hi', 'kn'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`lang-pill ${lang === l ? 'lang-pill-active' : 'lang-pill-inactive'}`}>
                {l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'ಕ'}
              </button>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="hero-title">{L.title}<br /><span>{L.titleSpan}</span></div>
        <div className="hero-sub">{L.sub}</div>

        {/* Form Card */}
        <div className="form-card">
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button onClick={() => setMode('login')} className="btn btn-sm" style={{ flex: 1, background: mode === 'login' ? 'rgba(255,255,255,0.25)' : 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}>{L.login}</button>
            <button onClick={() => setMode('register')} className="btn btn-sm" style={{ flex: 1, background: mode === 'register' ? 'rgba(255,255,255,0.25)' : 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}>{L.register}</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mode === 'register' && (
              <>
                <div className="input-group">
                  <label className="input-label">{L.name}</label>
                  <div className="input-wrap"><span>👤</span><input placeholder="Raju Patil" value={form.name} onChange={e => set('name', e.target.value)} /></div>
                </div>
                <div className="input-group">
                  <label className="input-label">{L.phone}</label>
                  <div className="input-wrap"><span>📱</span><input type="tel" placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
                </div>
                <div className="input-group">
                  <label className="input-label">{L.location}</label>
                  <div className="input-wrap"><span>📍</span><input placeholder="Nashik, Maharashtra" value={form.location} onChange={e => set('location', e.target.value)} /></div>
                </div>
                <div className="input-group">
                  <label className="input-label">{L.acres}</label>
                  <div className="input-wrap"><span>🌾</span><input type="number" placeholder="5" value={form.acres} onChange={e => set('acres', e.target.value)} /></div>
                </div>
              </>
            )}
            <div className="input-group">
              <label className="input-label">{L.email}</label>
              <div className="input-wrap"><span>✉️</span><input type="email" placeholder="farmer@gmail.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            </div>
            <div className="input-group">
              <label className="input-label">{L.password}</label>
              <div className="input-wrap"><span>🔒</span><input type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} /></div>
            </div>
            {mode === 'register' && (
              <div className="input-group">
                <label className="input-label">{L.confirm}</label>
                <div className="input-wrap"><span>🔒</span><input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} /></div>
              </div>
            )}
          </div>

          {error && <div style={{ marginTop: 10, fontSize: 13, color: error.startsWith('✅') ? '#86efac' : '#fca5a5', textAlign: 'center' }}>{error}</div>}

          <button className="btn btn-primary btn-full" style={{ marginTop: 16, background: '#84cc16', color: '#1a2e05' }} onClick={handleSubmit} disabled={loading}>
            {loading ? '...' : mode === 'login' ? L.btnLogin : L.btnReg}
          </button>
        </div>

        {/* Demo */}
        <button className="btn btn-full" style={{ marginTop: 12, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.2)' }} onClick={handleDemo}>
          🚀 {L.demo}
        </button>

        {/* Features strip */}
        <div style={{ display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🎙️ Voice', '🌦️ Weather', '📸 AI Scan', '📊 Market', '👥 Community'].map(f => (
            <div key={f} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
