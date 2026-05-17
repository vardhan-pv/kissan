import { NextResponse } from 'next/server';
import { filterProducts, getRecommendedProducts, MARKETPLACE_PRODUCTS } from '@/lib/marketplaceData';

const MARKET_PRICES = [
  { id: 1, name: 'Tomato', emoji: '🍅', price: 2450, unit: 'quintal', change: 4.2, changeDir: 'up', decision: 'hold', decisionReason: 'Hold 5 days — price rising 12%', forecast: 'Rising due to reduced Nashik supply. Hold for 5 more days.', market: 'Nashik APMC', lastUpdated: '1h ago', weekTrend: [2100, 2200, 2300, 2380, 2450] },
  { id: 2, name: 'Onion', emoji: '🧅', price: 3200, unit: 'quintal', change: 5.8, changeDir: 'up', decision: 'sell', decisionReason: 'Sell now — peak this week', forecast: 'Peak season price. New arrivals next week will drop price.', market: 'Nashik APMC', lastUpdated: '1h ago', weekTrend: [2800, 3000, 3100, 3150, 3200] },
  { id: 3, name: 'Wheat', emoji: '🌾', price: 2300, unit: 'quintal', change: -3.1, changeDir: 'down', decision: 'wait', decisionReason: 'Wait — price declining', forecast: 'Government procurement slowing. Wait for post-procurement season.', market: 'Pune APMC', lastUpdated: '3h ago', weekTrend: [2450, 2400, 2380, 2350, 2300] },
  { id: 4, name: 'Cotton', emoji: '☁️', price: 6800, unit: 'quintal', change: 2.1, changeDir: 'up', decision: 'hold', decisionReason: 'Hold — steady rise', forecast: 'Export demand improving. Steady upward trend expected.', market: 'Akola APMC', lastUpdated: '4h ago', weekTrend: [6500, 6600, 6700, 6750, 6800] },
  { id: 5, name: 'Soybean', emoji: '🟡', price: 4100, unit: 'quintal', change: -1.8, changeDir: 'down', decision: 'sell', decisionReason: 'Sell now — further decline likely', forecast: 'Import pressure keeping prices low.', market: 'Latur APMC', lastUpdated: '2h ago', weekTrend: [4200, 4180, 4150, 4120, 4100] },
  { id: 6, name: 'Rice (Paddy)', emoji: '🍚', price: 2183, unit: 'quintal', change: 0.5, changeDir: 'up', decision: 'sell', decisionReason: 'Sell at MSP via FCI', forecast: 'Government MSP procurement open. Register at PACS.', market: 'FCI Procurement', lastUpdated: '6h ago', weekTrend: [2100, 2120, 2150, 2175, 2183] },
  { id: 7, name: 'Potato', emoji: '🥔', price: 1200, unit: 'quintal', change: -2.3, changeDir: 'down', decision: 'hold', decisionReason: 'Hold in cold store 2–3 months', forecast: 'Store for better price. Cold storage price doubles in 3 months.', market: 'Agra APMC', lastUpdated: '4h ago', weekTrend: [1400, 1350, 1300, 1250, 1200] },
  { id: 8, name: 'Cotton', emoji: '☁️', price: 6800, unit: 'quintal', change: 2.1, changeDir: 'up', decision: 'hold', decisionReason: 'Hold — steady rise expected', forecast: 'Export demand improving steadily.', market: 'Akola APMC', lastUpdated: '4h ago', weekTrend: [6500, 6600, 6700, 6750, 6800] },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'prices';
  const category = searchParams.get('category') || 'All';
  const crop = searchParams.get('crop') || '';
  const search = searchParams.get('search') || '';
  const id = searchParams.get('id');

  if (type === 'single' && id) {
    const product = MARKETPLACE_PRODUCTS.find(p => p.id === id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  }

  if (type === 'recommended' && crop) {
    return NextResponse.json(getRecommendedProducts(crop));
  }

  if (type === 'products') {
    const filtered = filterProducts(category, crop || undefined, search || undefined);
    return NextResponse.json(filtered);
  }

  return NextResponse.json({
    prices: MARKET_PRICES,
    aiInsight: 'Best to sell Onion and Rice this week. Hold Potato in cold storage. Cotton trending upward.',
    topSell: 'Onion',
    topHold: 'Tomato',
    updatedAt: new Date().toISOString(),
  });
}
