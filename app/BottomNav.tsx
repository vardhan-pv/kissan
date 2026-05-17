'use client';
import { useRouter, usePathname } from 'next/navigation';

const TABS = [
  { path: '/dashboard', icon: '🏠', label: 'Home' },
  { path: '/crops',     icon: '🌾', label: 'Crops' },
  { path: '/scan',      icon: '📸', label: 'Scan' },
  { path: '/market',    icon: '🏪', label: 'Market' },
  { path: '/community', icon: '👥', label: 'Community' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {TABS.map(t => (
        <button
          key={t.path}
          className={`nav-item ${pathname === t.path ? 'active' : ''}`}
          onClick={() => router.push(t.path)}
        >
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
