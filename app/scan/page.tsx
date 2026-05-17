'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';

const CROPS = ['Tomato', 'Onion', 'Wheat', 'Cotton', 'Rice', 'Soybean', 'Potato', 'Chili'];
const SEVERITY_COLORS: Record<string, string> = { none: '#16a34a', medium: '#eab308', high: '#ef4444' };

export default function ScanPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [imgData, setImgData] = useState<string | null>(null);
  const [cropName, setCropName] = useState('Tomato');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [step, setStep] = useState<'select' | 'preview' | 'result'>('select');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    setUser(JSON.parse(u));
    // Load scan history from localStorage
    const h = localStorage.getItem('kisanai_scan_history');
    if (h) setHistory(JSON.parse(h));
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      setImgData(e.target?.result as string);
      setStep('preview');
    };
    reader.readAsDataURL(file);
  };

  const doScan = async () => {
    if (!imgData) return;
    setScanning(true);
    setProgress(0);

    // Animate progress
    const interval = setInterval(() => setProgress(p => Math.min(p + 15, 85)), 300);

    try {
      // Extract base64
      const base64 = imgData.split(',')[1];
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, userId: user?.id, cropName }),
      });
      const d = await res.json();
      clearInterval(interval);
      setProgress(100);
      await new Promise(r => setTimeout(r, 400));
      setResult(d);
      setStep('result');

      // Save to history
      const newHistory = [{ ...d, cropName, date: new Date().toLocaleDateString(), imgData }, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('kisanai_scan_history', JSON.stringify(newHistory));

      // Add XP
      const u = JSON.parse(localStorage.getItem('kisanai_user') || '{}');
      u.points = (u.points || 0) + 20;
      localStorage.setItem('kisanai_user', JSON.stringify(u));

      // Speak result
      const msg = d.severity === 'none' ? `Your ${cropName} crop is healthy!` : `${d.finding} detected on your ${cropName}. ${d.actionSteps?.[0] || d.treatment}`;
      const utt = new SpeechSynthesisUtterance(msg);
      window.speechSynthesis.speak(utt);
    } catch (e) {
      clearInterval(interval);
    }
    setScanning(false);
  };

  const reset = () => { setImgData(null); setResult(null); setStep('select'); setProgress(0); };

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>📸 AI Crop Scanner</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Take a photo → Get instant diagnosis</div>

            {/* Step indicator */}
            <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
              {['Select Crop', 'Take Photo', 'Get Result'].map((s, i) => {
                const stepNum = step === 'select' ? 0 : step === 'preview' ? 1 : 2;
                return (
                  <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ height: 4, borderRadius: 2, background: i <= stepNum ? '#84cc16' : 'rgba(255,255,255,0.2)' }} />
                    <div style={{ fontSize: 10, color: i <= stepNum ? '#84cc16' : 'rgba(255,255,255,0.5)' }}>{s}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="page-body">
          {step === 'select' && (
            <>
              {/* Crop selector */}
              <div className="section-header"><span className="section-title">Select your crop</span></div>
              <div className="crop-chips" style={{ marginBottom: 16 }}>
                {CROPS.map(c => (
                  <button key={c} className={`crop-chip ${cropName === c ? 'active' : ''}`} onClick={() => setCropName(c)}>{c}</button>
                ))}
              </div>

              {/* Scan area */}
              <div className="scan-area" onClick={() => fileRef.current?.click()}>
                <div className="scan-overlay">
                  <div className="scan-frame" />
                  <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>📷 Tap to take photo</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>or upload from gallery</div>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

              <div style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: 12, marginBottom: 20 }}>
                📌 Focus on the leaf or affected area for best results
              </div>

              {/* Scan history */}
              {history.length > 0 && (
                <>
                  <div className="section-header"><span className="section-title">Recent Scans</span></div>
                  {history.slice(0, 3).map((h, i) => (
                    <div key={i} className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      {h.imgData && <img src={h.imgData} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} alt="scan" />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{h.cropName} — {h.finding}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{h.date}</div>
                      </div>
                      <span className="badge" style={{ background: h.severity === 'none' ? '#dcfce7' : h.severity === 'high' ? '#fef2f2' : '#fef9c3', color: SEVERITY_COLORS[h.severity] }}>{h.severity === 'none' ? 'Healthy' : h.severity}</span>
                    </div>
                  ))}
                </>
              )}
            </>
          )}

          {step === 'preview' && imgData && (
            <>
              <img src={imgData} className="photo-preview" alt="crop" />
              <div className="card" style={{ marginTop: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Crop: {cropName}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={reset}>← Retake</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={doScan} disabled={scanning}>
                    {scanning ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="spinner" style={{ width: 18, height: 18 }} />
                        Analysing... {progress}%
                      </span>
                    ) : '🔍 Analyse Crop'}
                  </button>
                </div>
                {scanning && (
                  <div style={{ marginTop: 12 }}>
                    <div className="progress-bg">
                      <div className="progress-fill progress-green" style={{ width: `${progress}%` }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6, textAlign: 'center' }}>
                      {progress < 30 ? '🔍 Scanning image...' : progress < 60 ? '🧬 Detecting patterns...' : progress < 85 ? '💊 Identifying disease...' : '✅ Preparing report...'}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 'result' && result && (
            <>
              {imgData && <img src={imgData} className="photo-preview" alt="crop" />}

              {/* Result card */}
              <div className="card" style={{ marginTop: 12, border: `2px solid ${SEVERITY_COLORS[result.severity]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: SEVERITY_COLORS[result.severity] }}>
                    {result.severity === 'none' ? '✅ Healthy Crop!' : result.severity === 'high' ? '🔴 Disease Detected' : '🟡 Attention Needed'}
                  </div>
                  <span className="badge" style={{ background: result.severity === 'none' ? '#dcfce7' : result.severity === 'high' ? '#fef2f2' : '#fef9c3', color: SEVERITY_COLORS[result.severity] }}>
                    {Math.round(result.confidence * 100)}% confident
                  </span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{result.finding}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 14, lineHeight: 1.5 }}>{result.treatment}</div>

                <div style={{ display: 'flex', gap: 10, marginBottom: 14, fontSize: 12, flexWrap: 'wrap' }}>
                  <span className="badge badge-gray">🌱 {result.growth_stage}</span>
                  <span className="badge badge-gray">🗓️ Harvest in {result.days_to_harvest} days</span>
                </div>

                {/* Action steps */}
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>What to do now:</div>
                {(result.actionSteps || [result.treatment]).map((step: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < (result.actionSteps?.length - 1) ? '1px solid var(--gray-100)' : 'none' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: i === 0 ? '#fef2f2' : i === 1 ? '#fef9c3' : '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: i === 0 ? 'var(--red)' : i === 1 ? '#a16207' : 'var(--green)', flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-700)', flex: 1 }}>{step}</div>
                  </div>
                ))}
              </div>

              {/* Buy medicine button */}
              {result.medicine && (
                <button className="btn btn-primary btn-full" style={{ marginBottom: 10 }} onClick={() => router.push('/market?tab=products')}>
                  🛒 Buy {result.medicine} →
                </button>
              )}
              <button className="btn btn-outline btn-full" onClick={reset}>📸 Scan Another Crop</button>
            </>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
