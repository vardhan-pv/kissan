'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';
import { ALL_CROPS, CROP_DATABASE, type CropData, type FertilizerSchedule, type CropPhase } from '@/lib/cropDatabase';

const CATEGORIES = ['All', 'Cereals', 'Vegetables', 'Oilseeds / Legumes', 'Cash Crops'];

export default function CropsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<CropData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'phases' | 'fertilizer' | 'pests' | 'tips'>('overview');
  const [crops, setCrops] = useState(ALL_CROPS);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
  }, []);

  useEffect(() => {
    let filtered = ALL_CROPS;
    if (category !== 'All') filtered = filtered.filter(c => c.category === category);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.localName.toLowerCase().includes(q)
      );
    }
    setCrops(filtered);
  }, [category, search]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utt);
  };

  const TABS: [string, string][] = [
    ['overview', '📋 Overview'],
    ['phases', '📅 Growth Phases'],
    ['fertilizer', '🧪 Fertilizer Plan'],
    ['pests', '🦠 Pests & Disease'],
    ['tips', '💡 Pro Tips'],
  ];

  if (selected) {
    return (
      <div className="app-shell">
        <div className="screen">
          {/* Crop Header */}
          <div style={{ background: `linear-gradient(135deg, ${selected.heroColor}dd, ${selected.heroColor}99)`, padding: '48px 20px 20px', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 48, left: 16, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, padding: '6px 12px', color: 'white', cursor: 'pointer', fontSize: 13 }}>← Back</button>
            <button onClick={() => speak(`${selected.name}. ${selected.tagline}. Season: ${selected.seasons.join(', ')}. Yield: ${selected.yieldPerAcre}. Profit: ${selected.profitPerAcre} per acre.`)} style={{ position: 'absolute', top: 48, right: 16, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, padding: '6px 12px', color: 'white', cursor: 'pointer', fontSize: 16 }}>🔊</button>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontSize: 60 }}>{selected.emoji}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'white', marginTop: 4 }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{selected.localName}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{selected.tagline}</div>
            </div>
            {/* Key stats */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Duration', value: `${selected.daysToHarvest.min}–${selected.daysToHarvest.max} days` },
                { label: 'Yield/acre', value: selected.yieldPerAcre.split('(')[0].trim() },
                { label: 'Profit/acre', value: selected.profitPerAcre },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '8px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ overflowX: 'auto', display: 'flex', gap: 0, borderBottom: '2px solid var(--gray-100)', background: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
            {TABS.map(([v, l]) => (
              <button key={v} onClick={() => setActiveTab(v as any)} style={{ padding: '12px 10px', border: 'none', borderBottom: activeTab === v ? '2px solid var(--green)' : '2px solid transparent', background: 'transparent', fontWeight: 700, fontSize: 11, cursor: 'pointer', color: activeTab === v ? 'var(--green)' : 'var(--gray-500)', flexShrink: 0, marginBottom: -2 }}>{l}</button>
            ))}
          </div>

          <div className="page-body">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                <div className="section-header"><span className="section-title">📅 Seasons & Sowing</span></div>
                <div className="card">
                  {[
                    { label: 'Seasons', value: selected.seasons.join(' · ') },
                    { label: 'Sow in', value: selected.sowingMonths.join(', ') },
                    { label: 'Harvest in', value: selected.harvestMonths.join(', ') },
                    { label: 'Days to harvest', value: `${selected.daysToHarvest.min}–${selected.daysToHarvest.max} days` },
                    { label: 'Seed rate', value: selected.seedRate },
                    { label: 'Spacing', value: selected.spacing },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid var(--gray-100)', gap: 12 }}>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', width: 100, flexShrink: 0 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)', flex: 1 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="section-header"><span className="section-title">🌱 Soil Requirements</span></div>
                <div className="card">
                  {[
                    { label: 'Soil Type', value: selected.soilRequirements.type.join(', ') },
                    { label: 'pH Range', value: selected.soilRequirements.pH },
                    { label: 'Drainage', value: selected.soilRequirements.drainage },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid var(--gray-100)', gap: 12 }}>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', width: 100, flexShrink: 0 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)', flex: 1 }}>{item.value}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 13, color: 'var(--gray-600)', padding: '10px 0', lineHeight: 1.6 }}>
                    <strong>Field Prep:</strong> {selected.soilRequirements.preparation}
                  </div>
                </div>

                <div className="section-header"><span className="section-title">🌡️ Climate Requirements</span></div>
                <div className="card">
                  {[
                    { label: 'Temperature', value: selected.climate.temperature },
                    { label: 'Rainfall', value: selected.climate.rainfall },
                    { label: 'Humidity', value: selected.climate.humidity },
                    { label: 'Best States', value: selected.climate.states.join(', ') },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)', marginTop: 2 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="section-header"><span className="section-title">💧 Irrigation Guide</span></div>
                <div className="card">
                  {[
                    { label: 'Frequency', value: selected.irrigation.frequency },
                    { label: 'Best Method', value: selected.irrigation.method },
                    { label: 'Total Water', value: selected.irrigation.totalWater },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)', marginTop: 2 }}>{item.value}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 6 }}>Critical Irrigation Stages:</div>
                    {selected.irrigation.criticalStages.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>•</span>
                        <span style={{ fontSize: 13, color: 'var(--gray-700)' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-header"><span className="section-title">🌾 Varieties</span></div>
                {selected.varieties.map(v => (
                  <div key={v.name} className="card card-sm" style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{v.name}</div>
                      <span className="badge badge-success">{v.days} days</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>{v.feature}</div>
                  </div>
                ))}

                <div className="section-header"><span className="section-title">✅ Harvest Indicators</span></div>
                <div className="card">
                  {selected.harvestIndicators.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < selected.harvestIndicators.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                      <span style={{ fontSize: 16 }}>✅</span>
                      <span style={{ fontSize: 13, color: 'var(--gray-700)' }}>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="section-header"><span className="section-title">🏛️ Government Schemes</span></div>
                <div className="card">
                  {selected.governmentSchemes.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < selected.governmentSchemes.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                      <span>🏛️</span>
                      <span style={{ fontSize: 13, color: 'var(--gray-700)' }}>{s}</span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={() => router.push('/market?tab=products&crop=' + selected.name)}>
                  🛒 Shop for {selected.name} inputs →
                </button>
              </>
            )}

            {/* GROWTH PHASES TAB */}
            {activeTab === 'phases' && (
              <>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 12 }}>
                  Complete step-by-step guide from seed to harvest
                </div>
                {selected.phases.map((phase, idx) => (
                  <div key={idx} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{phase.emoji}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800 }}>Phase {idx + 1}: {phase.phase}</div>
                        <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>⏱ {phase.days}</div>
                      </div>
                      <button onClick={() => speak(`${phase.phase}. ${phase.description}. Activities: ${phase.activities.join('. ')}`)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}>🔊</button>
                    </div>
                    <div className="card" style={{ borderLeft: '3px solid var(--green)', padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 10, lineHeight: 1.6 }}>{phase.description}</div>

                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 6 }}>✅ Activities:</div>
                      {phase.activities.map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                          <span style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.5 }}>{a}</span>
                        </div>
                      ))}

                      {phase.watchFor.length > 0 && (
                        <>
                          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)', marginTop: 10, marginBottom: 6 }}>⚠️ Watch for:</div>
                          {phase.watchFor.map((w, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 12, color: 'var(--red)', flexShrink: 0 }}>⚠</span>
                              <span style={{ fontSize: 12, color: 'var(--gray-600)', lineHeight: 1.5 }}>{w}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* FERTILIZER PLAN TAB */}
            {activeTab === 'fertilizer' && (
              <>
                <div className="alert alert-info">
                  <span className="alert-icon">💡</span>
                  <div style={{ fontSize: 13, color: '#1d4ed8' }}>Follow this schedule strictly for maximum yield. Timing is as important as quantity.</div>
                </div>
                {selected.fertilizerSchedule.map((f, idx) => (
                  <div key={idx} className="card" style={{ marginBottom: 10, borderLeft: '3px solid #3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--gray-900)' }}>{f.stage}</div>
                      <span className="badge badge-info">{f.daysAfterSowing}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                      <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Fertilizer</div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{f.fertilizer}</div>
                      </div>
                      <div style={{ background: 'var(--green-light)', borderRadius: 8, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: 'var(--green)' }}>Quantity</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{f.quantity}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>
                      <strong>Method:</strong> {f.method}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-600)', background: '#f0fdf4', borderRadius: 6, padding: '6px 10px' }}>
                      💡 <strong>Why:</strong> {f.purpose}
                    </div>
                    <button onClick={() => speak(`${f.stage}. Apply ${f.fertilizer}, ${f.quantity}. ${f.method}. Purpose: ${f.purpose}`)} style={{ marginTop: 8, background: 'transparent', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', fontSize: 13 }}>🔊 Read aloud</button>
                  </div>
                ))}
              </>
            )}

            {/* PESTS & DISEASES TAB */}
            {activeTab === 'pests' && (
              <>
                {selected.pestsAndDiseases.map((p, idx) => (
                  <div key={idx} className="card" style={{ marginBottom: 12, borderLeft: `3px solid ${p.type === 'pest' ? 'var(--orange)' : 'var(--red)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>{p.name}</div>
                      <span className={`badge ${p.type === 'pest' ? 'badge-warning' : 'badge-danger'}`}>
                        {p.type === 'pest' ? '🐛 Pest' : '🦠 Disease'}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)', marginBottom: 4 }}>Symptoms:</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 10, lineHeight: 1.5 }}>{p.symptoms}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 4 }}>Control:</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 10, lineHeight: 1.5 }}>{p.control}</div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ background: '#fef2f2', borderRadius: 8, padding: '6px 10px', flex: 1 }}>
                        <div style={{ fontSize: 10, color: 'var(--red)' }}>Medicine</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)' }}>{p.medicine}</div>
                      </div>
                      <div style={{ background: 'var(--sky)', borderRadius: 8, padding: '6px 10px', flex: 1 }}>
                        <div style={{ fontSize: 10, color: '#1d4ed8' }}>When to spray</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#1d4ed8' }}>{p.timing}</div>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-outline" style={{ marginTop: 10, width: '100%' }} onClick={() => router.push('/market?tab=products&search=' + encodeURIComponent(p.medicine.split(' ')[0]))}>
                      🛒 Buy {p.medicine.split('(')[0].trim()} →
                    </button>
                  </div>
                ))}
              </>
            )}

            {/* PRO TIPS TAB */}
            {activeTab === 'tips' && (
              <>
                <div className="section-header"><span className="section-title">✅ Pro Tips</span></div>
                {selected.proTips.map((tip, i) => (
                  <div key={i} className="card card-sm" style={{ marginBottom: 8, borderLeft: '3px solid var(--green)', display: 'flex', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--green)', fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>{tip}</div>
                  </div>
                ))}

                <div className="section-header"><span className="section-title">⛔ What NOT to do</span></div>
                {selected.doNots.map((d, i) => (
                  <div key={i} className="card card-sm" style={{ marginBottom: 8, borderLeft: '3px solid var(--red)', display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>⛔</span>
                    <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>{d}</div>
                  </div>
                ))}

                <div className="section-header"><span className="section-title">📦 Post Harvest</span></div>
                <div className="card">
                  {selected.postHarvest.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < selected.postHarvest.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 800 }}>→</span>
                      <span style={{ fontSize: 13, color: 'var(--gray-700)' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Crop LIST view
  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>🌾 Crop Encyclopedia</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Deep research for every crop</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', marginTop: 14 }}>
              <span style={{ fontSize: 16 }}>🔍</span>
              <input
                placeholder="Search tomato, wheat, rice..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: 14, outline: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="page-body">
          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 12 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', fontWeight: 600, fontSize: 12, cursor: 'pointer', background: category === c ? 'var(--green)' : 'var(--gray-100)', color: category === c ? 'white' : 'var(--gray-600)', flexShrink: 0 }}>{c}</button>
            ))}
          </div>

          <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 10 }}>{crops.length} crops found · Tap for full growing guide</div>

          {crops.map(crop => (
            <div key={crop.id} onClick={() => { setSelected(crop); setActiveTab('overview'); }} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer', borderLeft: `4px solid ${crop.heroColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 36 }}>{crop.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>{crop.name}</div>
                    <span className="badge badge-gray" style={{ fontSize: 10 }}>{crop.category}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{crop.localName}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3 }}>{crop.tagline}</div>
                </div>
                <span style={{ color: 'var(--gray-300)', fontSize: 20 }}>›</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <span className="badge badge-success">📅 {crop.daysToHarvest.min}–{crop.daysToHarvest.max} days</span>
                <span className="badge badge-info">🌾 {crop.yieldPerAcre.split('(')[0].trim()}</span>
                <span className="badge badge-warning">💰 {crop.profitPerAcre.split('(')[0].trim()}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {crop.sowingMonths.slice(0, 3).map(m => (
                  <span key={m} style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>🗓 {m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
