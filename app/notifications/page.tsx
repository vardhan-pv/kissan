'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';

const REMINDERS = [
  { id: 1, icon: '💧', title: 'Irrigate tomato crop', note: 'Temperature 34°C — irrigate before 7 AM or after 5 PM', time: 'Today · Now', urgency: 'high', done: false },
  { id: 2, icon: '🐛', title: 'Spray neem oil for pest risk', note: 'Brown planthopper spotted 2 km away', time: 'Today · Morning', urgency: 'high', done: false },
  { id: 3, icon: '🧅', title: 'Check onion maturity', note: '85% grown — harvest window approaching in 10 days', time: 'Today · Anytime', urgency: 'medium', done: false },
  { id: 4, icon: '🧪', title: 'Apply Urea to tomato', note: '25 kg/acre — Day 15 after planting', time: 'May 7', urgency: 'upcoming', done: false },
  { id: 5, icon: '📊', title: 'Sell onion — price peak window', note: 'Price expected ₹3,400+ on May 8–9', time: 'May 8–9', urgency: 'upcoming', done: false },
  { id: 6, icon: '🌧️', title: 'Rain on Sunday — complete field work', note: 'Heavy rain forecast — avoid spraying Sat–Sun', time: 'Saturday', urgency: 'upcoming', done: false },
  { id: 7, icon: '💊', title: 'Second fungicide spray — tomato', note: 'Follow up from early blight detection last week', time: 'May 10', urgency: 'upcoming', done: false },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [reminders, setReminders] = useState(REMINDERS);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    setUser(JSON.parse(u));
  }, []);

  const markDone = (id: number) => setReminders(r => r.map(rem => rem.id === id ? { ...rem, done: !rem.done } : rem));
  const speak = (t: string) => { const u = new SpeechSynthesisUtterance(t); window.speechSynthesis.speak(u); };

  const urgent = reminders.filter(r => r.urgency === 'high' && !r.done);
  const today = reminders.filter(r => r.urgency === 'medium' && !r.done);
  const upcoming = reminders.filter(r => r.urgency === 'upcoming' && !r.done);
  const done = reminders.filter(r => r.done);

  const ReminderItem = ({ rem }: { rem: typeof REMINDERS[0] }) => (
    <div className="notif-item" style={{ opacity: rem.done ? 0.5 : 1 }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: rem.urgency === 'high' ? '#fef2f2' : rem.urgency === 'medium' ? '#fef9c3' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{rem.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: rem.done ? 'var(--gray-400)' : 'var(--gray-900)', textDecoration: rem.done ? 'line-through' : 'none' }}>{rem.title}</div>
        <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2, lineHeight: 1.4 }}>{rem.note}</div>
        <div style={{ fontSize: 11, color: 'var(--gray-300)', marginTop: 4 }}>⏰ {rem.time}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
        <button onClick={() => markDone(rem.id)} style={{ background: rem.done ? 'var(--gray-100)' : 'var(--green)', color: rem.done ? 'var(--gray-400)' : 'white', border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          {rem.done ? 'Undo' : '✓ Done'}
        </button>
        <button onClick={() => speak(`${rem.title}. ${rem.note}`)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16 }}>🔊</button>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>🔔 Reminders</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Your farming schedule</div>
              </div>
              {urgent.length > 0 && <span className="badge badge-danger" style={{ fontSize: 13 }}>{urgent.length} urgent</span>}
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {[
                { count: urgent.length, label: 'Urgent', color: '#fef2f2', text: '#dc2626' },
                { count: today.length, label: 'Today', color: '#fef9c3', text: '#a16207' },
                { count: upcoming.length, label: 'Upcoming', color: 'rgba(255,255,255,0.15)', text: 'rgba(255,255,255,0.8)' },
              ].map(m => (
                <div key={m.label} style={{ flex: 1, background: m.color, borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: m.text }}>{m.count}</div>
                  <div style={{ fontSize: 11, color: m.text, opacity: 0.8 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">
          {urgent.length > 0 && (
            <>
              <div className="section-header"><span className="section-title" style={{ color: 'var(--red)' }}>🚨 Urgent — Do Today</span></div>
              <div className="card" style={{ border: '2px solid #fecaca', padding: '4px 16px' }}>
                {urgent.map(r => <ReminderItem key={r.id} rem={r} />)}
              </div>
            </>
          )}

          {today.length > 0 && (
            <>
              <div className="section-header"><span className="section-title">📌 Today</span></div>
              <div className="card" style={{ padding: '4px 16px' }}>
                {today.map(r => <ReminderItem key={r.id} rem={r} />)}
              </div>
            </>
          )}

          {upcoming.length > 0 && (
            <>
              <div className="section-header"><span className="section-title">📅 This Week</span></div>
              <div className="card" style={{ padding: '4px 16px' }}>
                {upcoming.map(r => <ReminderItem key={r.id} rem={r} />)}
              </div>
            </>
          )}

          {done.length > 0 && (
            <>
              <div className="section-header"><span className="section-title" style={{ color: 'var(--gray-400)' }}>✅ Completed ({done.length})</span></div>
              <div className="card" style={{ padding: '4px 16px', opacity: 0.7 }}>
                {done.map(r => <ReminderItem key={r.id} rem={r} />)}
              </div>
            </>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
