'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';

export default function FarmPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'crops' | 'expenses' | 'profit'>('crops');
  const [showAdd, setShowAdd] = useState(false);
  const [newCrop, setNewCrop] = useState({ name: 'Tomato', acres: '', plantedDate: '' });

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    fetch('/api/farm-tracker').then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, []);

  const addCrop = async () => {
    if (!newCrop.name || !newCrop.acres) return;
    const res = await fetch('/api/farm-tracker', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCrop) });
    const d = await res.json();
    if (d.success) { setShowAdd(false); alert('Crop added! Refresh to see updates.'); }
  };

  const CROP_EMOJIS: Record<string, string> = { Tomato: '🍅', Onion: '🧅', Wheat: '🌾', Cotton: '🌿', Rice: '🍚', Potato: '🥔', Chili: '🌶️' };

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>📋 Farm Tracker</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Track growth, expenses & profit</div>
              </div>
              <button className="btn btn-sm" onClick={() => setShowAdd(true)} style={{ background: '#84cc16', color: '#1a2e05', fontWeight: 800 }}>+ Add Crop</button>
            </div>

            {/* Summary stats */}
            {data && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {[
                  { label: 'Total Area', value: `${data.totalAcres} acres` },
                  { label: 'Expenses', value: `₹${(data.totalExpenses / 1000).toFixed(1)}K` },
                  { label: 'Est. Profit', value: `₹${(data.profitEstimate / 1000).toFixed(0)}K` },
                ].map(m => (
                  <div key={m.label} style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
              {[['crops', '🌱 Crops'], ['expenses', '💸 Expenses'], ['profit', '📈 Profit']].map(([v, l]) => (
                <button key={v} onClick={() => setTab(v as any)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', background: tab === v ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)', color: 'white' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : data ? (
            <>
              {tab === 'crops' && (
                <>
                  {data.crops.map((crop: any) => (
                    <div key={crop.id} className={`crop-card ${crop.status}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 28 }}>{CROP_EMOJIS[crop.name] || '🌱'}</span>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 800 }}>{crop.name} · {crop.acres} acres</div>
                            <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Planted {new Date(crop.plantedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · Day {crop.daysOld}</div>
                          </div>
                        </div>
                        <span className={`badge ${crop.status === 'growing' ? 'badge-success' : crop.status === 'ready' ? 'badge-warning' : 'badge-danger'}`}>{crop.statusLabel}</span>
                      </div>

                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>Growth progress</span>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>{crop.progressPct}%</span>
                        </div>
                        <div className="progress-bg">
                          <div className={`progress-fill ${crop.progressPct > 75 ? 'progress-yellow' : 'progress-green'}`} style={{ width: `${crop.progressPct}%` }} />
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>Harvest: {crop.harvestDate}</div>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ flex: 1, background: 'var(--gray-50)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--red)' }}>₹{crop.expenses.toLocaleString()}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Spent</div>
                        </div>
                        <div style={{ flex: 1, background: 'var(--gray-50)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)' }}>₹{crop.projectedRevenue.toLocaleString()}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Expected</div>
                        </div>
                        <div style={{ flex: 1, background: 'var(--gray-50)', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)' }}>₹{(crop.projectedRevenue - crop.expenses).toLocaleString()}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Profit</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 10, background: '#f0fdf4', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#166534' }}>
                        ⚡ Next: {crop.nextAction}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {tab === 'expenses' && (
                <div className="card" style={{ padding: '4px 16px' }}>
                  {data.expenseLog.map((e: any, i: number) => (
                    <div key={i} className="price-row">
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{e.item}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{e.date} · {e.category}</div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--red)' }}>₹{e.amount.toLocaleString()}</div>
                    </div>
                  ))}
                  <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>Total Expenses</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--red)' }}>₹{data.totalExpenses.toLocaleString()}</div>
                  </div>
                </div>
              )}

              {tab === 'profit' && (
                <>
                  <div className="card" style={{ background: '#f0fdf4', border: '2px solid #bbf7d0' }}>
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>Estimated Season Profit</div>
                      <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--green)' }}>₹{data.profitEstimate.toLocaleString()}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>After all expenses</div>
                    </div>
                  </div>
                  <div className="card" style={{ padding: '4px 16px' }}>
                    {data.crops.map((c: any) => (
                      <div key={c.id} className="price-row">
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{CROP_EMOJIS[c.name] || '🌱'} {c.name} ({c.acres} acres)</div>
                          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Revenue ₹{c.projectedRevenue.toLocaleString()} − Cost ₹{c.expenses.toLocaleString()}</div>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green)' }}>₹{(c.projectedRevenue - c.expenses).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>

      {/* Add crop modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', width: '100%', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Add New Crop</div>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="input-group">
                <label className="input-label">Crop Name</label>
                <select value={newCrop.name} onChange={e => setNewCrop(p => ({ ...p, name: e.target.value }))} style={{ padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-200)', fontSize: 15, background: 'var(--gray-50)' }}>
                  {Object.keys(CROP_EMOJIS).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Area (Acres)</label>
                <div className="input-wrap"><span>🌾</span><input type="number" placeholder="2.5" value={newCrop.acres} onChange={e => setNewCrop(p => ({ ...p, acres: e.target.value }))} /></div>
              </div>
              <div className="input-group">
                <label className="input-label">Planted Date</label>
                <div className="input-wrap"><span>📅</span><input type="date" value={newCrop.plantedDate} onChange={e => setNewCrop(p => ({ ...p, plantedDate: e.target.value }))} /></div>
              </div>
            </div>
            <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={addCrop}>Add Crop</button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
