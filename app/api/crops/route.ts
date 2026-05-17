import { NextResponse } from 'next/server';
import { CROP_DATABASE, ALL_CROPS, searchCrops } from '@/lib/cropDatabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const season = searchParams.get('season');

  // Single crop detail
  if (id) {
    const crop = CROP_DATABASE[id];
    if (!crop) return NextResponse.json({ error: 'Crop not found' }, { status: 404 });
    return NextResponse.json(crop);
  }

  // Search
  if (query) {
    return NextResponse.json(searchCrops(query));
  }

  // Filter by category
  let crops = ALL_CROPS;
  if (category && category !== 'All') {
    crops = crops.filter(c => c.category === category);
  }
  if (season) {
    crops = crops.filter(c => c.seasons.some(s => s.toLowerCase().includes(season.toLowerCase())));
  }

  // Return list (without full phases/schedules for performance)
  return NextResponse.json(crops.map(c => ({
    id: c.id, name: c.name, localName: c.localName, emoji: c.emoji,
    category: c.category, tagline: c.tagline, heroColor: c.heroColor,
    seasons: c.seasons, daysToHarvest: c.daysToHarvest,
    yieldPerAcre: c.yieldPerAcre, profitPerAcre: c.profitPerAcre,
    marketPrice: c.marketPrice, sowingMonths: c.sowingMonths,
  })));
}
