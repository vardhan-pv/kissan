import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  // Return mock farm data for demo — in production, fetch from Supabase
  return NextResponse.json({
    totalAcres: 8,
    totalExpenses: 32400,
    profitEstimate: 120000,
    crops: [
      {
        id: 1, name: 'Tomato', emoji: '🍅', acres: 3,
        plantedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        daysOld: 10, duration: 90, progressPct: 11,
        status: 'growing', statusLabel: 'Growing well',
        expenses: 12000, projectedRevenue: 54000,
        nextAction: 'Apply Urea fertilizer in 5 days',
        harvestDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 2, name: 'Onion', emoji: '🧅', acres: 5,
        plantedDate: new Date(Date.now() - 61 * 24 * 60 * 60 * 1000).toISOString(),
        daysOld: 61, duration: 120, progressPct: 85,
        status: 'ready', statusLabel: 'Ready soon',
        expenses: 20400, projectedRevenue: 96000,
        nextAction: 'Stop irrigation in 5 days — 10 days before harvest',
        harvestDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
    ],
    expenseLog: [
      { date: '2026-04-22', item: 'Tomato seeds', amount: 550, category: 'Seeds' },
      { date: '2026-04-23', item: 'Soil preparation labor', amount: 2500, category: 'Labor' },
      { date: '2026-04-25', item: 'DAP fertilizer (3 bags)', amount: 2400, category: 'Fertilizer' },
      { date: '2026-04-28', item: 'Drip irrigation maintenance', amount: 800, category: 'Equipment' },
      { date: '2026-03-01', item: 'Onion seeds (Bhima Raj)', amount: 1920, category: 'Seeds' },
      { date: '2026-03-02', item: 'Soil preparation + labor', amount: 5000, category: 'Labor' },
      { date: '2026-03-10', item: 'DAP + Urea fertilizers', amount: 4230, category: 'Fertilizer' },
      { date: '2026-04-01', item: 'Pesticide spray', amount: 1200, category: 'Pesticide' },
      { date: '2026-04-15', item: 'Second fertilizer dose', amount: 2800, category: 'Fertilizer' },
    ],
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  // In production: save to Supabase farm_crops table
  return NextResponse.json({ success: true, crop: { id: Date.now(), ...body } });
}
