'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';
import VoiceButton from '../VoiceButton';

export default function AdvisorPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<'recommend' | 'plan' | 'fertilizer'>('recommend');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [askLoading, setAskLoading] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    const parsed = JSON.parse(u);
    setUser(parsed);
    fetchAdvisor(parsed);
  }, []);

  const fetchAdvisor = async (u: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: u.location, acres: u.acres, soilType: 'red soil', season: 'Kharif', currentCrops: ['Tomato', 'Onion'] }),
      });
      const d = await res.json();
      setData(d);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const askAI = async () => {
    if (!aiQuestion.trim()) return;
    setAskLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [{ role: 'user', content: `You are KisanAI, an expert agricultural advisor for Indian farmers. Answer concisely and practically in 2-3 sentences. Farmer context: location ${user?.location}, ${user?.acres} acres. Question: ${aiQuestion}` }],
        }),
      });
      const d = await res.json();
      setAiAnswer(d.content?.[0]?.text || 'Please configure your Anthropic API key to use the AI advisor.');
    } catch {
      setAiAnswer('AI advisor requires an Anthropic API key. Contact support to enable it.');
    }
    setAskLoading(false);
  };

  const speak = (text: string) => {
    const utt = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>🧠 AI Smart Advisor</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Personalized farming decisions</div>
              </div>
              <VoiceButton onResult={q => { setAiQuestion(q); }} />
            </div>

            {/* Ask AI */}
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <div className="input-wrap" style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }}>
                <input
                  placeholder="Ask anything about your farm..."
                  value={aiQuestion}
                  onChange={e => setAiQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && askAI()}
                  style={{ color: 'white', fontSize: 14 }}
                />
              </div>
              <button className="btn btn-sm" onClick={askAI} disabled={askLoading} style={{ background: '#84cc16', color: '#1a2e05', flexShrink: 0 }}>
                {askLoading ? '...' : 'Ask'}
              </button>
            </div>

            {aiAnswer && (
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', marginTop: 10, fontSize: 13, color: 'white', lineHeight: 1.5 }}>
                💡 {aiAnswer}
                <button onClick={() => speak(aiAnswer)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', marginLeft: 6, fontSize: 14 }}>🔊</button>
              </div>
            )}
          </div>
        </div>

        <div className="page-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div className="spinner" style={{ margin: '0 auto 12px' }} />
              <div style={{ color: 'var(--gray-400)' }}>Analyzing your farm...</div>
            </div>
          ) : data ? (
            <>
              {/* Urgent action */}
              <div className="alert alert-warning">
                <span className="alert-icon">⚡</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>Urgent Action</div>
                  <div style={{ fontSize: 13, color: '#92400e', marginTop: 2 }}>{data.urgentAction}</div>
                </div>
                <button onClick={() => speak(data.urgentAction)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}>🔊</button>
              </div>

              {/* Primary recommendation */}
              <div className="card" style={{ border: '2px solid var(--green)', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>🌱 AI Recommendation</div>
                  <span className="badge badge-success">✓ Verified</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--gray-900)' }}>
                  {data.primary.emoji} Grow {data.primary.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4, marginBottom: 14, lineHeight: 1.5 }}>{data.primary.aiReason}</div>
                <div className="metric-grid" style={{ marginBottom: 0 }}>
                  <div className="metric-card" style={{ padding: '10px 12px' }}>
                    <div className="metric-label">Expected Yield</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{data.primary.expectedYield}</div>
                  </div>
                  <div className="metric-card" style={{ padding: '10px 12px' }}>
                    <div className="metric-label">Profit Estimate</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green)' }}>{data.primary.aiProfit || data.primary.roi}</div>
                  </div>
                  <div className="metric-card" style={{ padding: '10px 12px' }}>
                    <div className="metric-label">Duration</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{data.primary.duration} days</div>
                  </div>
                  <div className="metric-card" style={{ padding: '10px 12px' }}>
                    <div className="metric-label">Risk Level</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: data.primary.risk === 'Low' ? 'var(--green)' : data.primary.risk === 'High' ? 'var(--red)' : 'var(--yellow)' }}>{data.primary.risk}</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {[['recommend', '🌾 Alternatives'], ['plan', '📅 Action Plan'], ['fertilizer', '🧪 Fertilizer']].map(([v, l]) => (
                  <button key={v} onClick={() => setTab(v as any)} style={{ flex: 1, padding: '8px 4px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', background: tab === v ? 'var(--green)' : 'var(--gray-100)', color: tab === v ? 'white' : 'var(--gray-600)' }}>{l}</button>
                ))}
              </div>

              {tab === 'recommend' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.recommendations.map((c: any) => (
                    <div key={c.key} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 28 }}>{c.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{c.season} · {c.duration} days · {c.roi}</div>
                      </div>
                      <span className={`badge ${c.risk === 'Low' ? 'badge-success' : c.risk === 'High' ? 'badge-danger' : 'badge-warning'}`}>{c.risk} risk</span>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'plan' && (
                <div className="card" style={{ padding: '4px 16px' }}>
                  <div className="step-list">
                    {data.weeklyPlan.map((s: any, i: number) => (
                      <div key={i} className="step-item">
                        <div className={`step-dot ${i === 0 ? 'step-dot-red' : i === 1 ? 'step-dot-yellow' : 'step-dot-green'}`}>
                          {i === 0 ? '⚡' : i === 1 ? '📅' : '✅'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="step-day">Day {s.day}</div>
                          <div className="step-text">{s.action}</div>
                        </div>
                        <button onClick={() => speak(s.action)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16 }}>🔊</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'fertilizer' && (
                <div className="card" style={{ padding: '4px 16px' }}>
                  <div className="step-list">
                    {data.fertilizerPlan.map((f: any, i: number) => (
                      <div key={i} className="step-item">
                        <div className="step-dot step-dot-blue">🧪</div>
                        <div style={{ flex: 1 }}>
                          <div className="step-day">Week {f.week}</div>
                          <div className="step-text" style={{ fontWeight: 600 }}>{f.item}</div>
                          <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{f.qty}</div>
                          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{f.note}</div>
                        </div>
                        <button onClick={() => speak(`${f.item}, ${f.qty}, ${f.note}`)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16 }}>🔊</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Market tip */}
              <div className="alert alert-success" style={{ marginTop: 12 }}>
                <span className="alert-icon">📈</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>Market Tip</div>
                  <div style={{ fontSize: 13, color: '#166534', marginTop: 2 }}>{data.marketTip}</div>
                </div>
                <button onClick={() => router.push('/market')} style={{ background: 'var(--green)', border: 'none', borderRadius: 8, padding: '6px 10px', color: 'white', fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>Prices →</button>
              </div>
            </>
          ) : <div style={{ textAlign: 'center', padding: 40, color: 'var(--gray-400)' }}>Failed to load. Please try again.</div>}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
