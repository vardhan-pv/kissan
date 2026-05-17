import { NextResponse } from 'next/server';

const CROP_DATABASE: Record<string, any> = {
  tomato: {
    name: 'Tomato', emoji: '🍅', season: 'Kharif/Rabi',
    soilTypes: ['red', 'loamy', 'sandy loam'],
    climates: ['tropical', 'subtropical', 'semi-arid'],
    duration: 90, expectedYield: '18-25 tonnes/acre',
    roi: '₹45,000 - ₹80,000/acre',
    risk: 'Medium',
    steps: [
      { day: 0, action: 'Prepare soil — deep plough 2-3 times, add organic compost 5 tonnes/acre' },
      { day: 3, action: 'Sow seeds in nursery trays with cocopeat media' },
      { day: 25, action: 'Transplant seedlings to main field — 60×45 cm spacing' },
      { day: 35, action: 'Apply DAP fertilizer 50 kg/acre as basal dose' },
      { day: 40, action: 'First irrigation — drip at 4 litres/plant/day' },
      { day: 50, action: 'Apply Urea 25 kg/acre top dressing' },
      { day: 55, action: 'Stake plants with bamboo poles for support' },
      { day: 60, action: 'Spray Mancozeb 2g/L for early blight prevention' },
      { day: 75, action: 'Second dose Urea 25 kg/acre' },
      { day: 90, action: 'First harvest — pick when 50% red colour appears' },
    ],
    fertilizerPlan: [
      { week: 1, item: 'FYM / compost', qty: '5 tonnes/acre', note: 'Mix into soil before transplanting' },
      { week: 2, item: 'DAP', qty: '50 kg/acre', note: 'Basal dose at transplanting' },
      { week: 5, item: 'Urea', qty: '25 kg/acre', note: '15 days after transplant' },
      { week: 8, item: 'Urea', qty: '25 kg/acre', note: 'Before flowering' },
      { week: 10, item: 'Potash (MOP)', qty: '25 kg/acre', note: 'At fruit development stage' },
    ],
  },
  onion: {
    name: 'Onion', emoji: '🧅', season: 'Rabi',
    soilTypes: ['loamy', 'sandy loam', 'red'],
    climates: ['semi-arid', 'subtropical'],
    duration: 120, expectedYield: '8-12 tonnes/acre',
    roi: '₹30,000 - ₹60,000/acre',
    risk: 'Low',
    steps: [
      { day: 0, action: 'Prepare nursery bed — raised beds, add compost' },
      { day: 7, action: 'Sow onion seeds thinly in nursery rows' },
      { day: 45, action: 'Transplant seedlings — 15×10 cm spacing in main field' },
      { day: 55, action: 'Apply DAP 40 kg/acre + Urea 20 kg/acre basal' },
      { day: 70, action: 'Top dress with Urea 20 kg/acre' },
      { day: 90, action: 'Reduce irrigation to allow bulb development' },
      { day: 110, action: 'Stop irrigation 10 days before harvest' },
      { day: 120, action: 'Harvest when 50% tops fall over naturally' },
    ],
    fertilizerPlan: [
      { week: 1, item: 'FYM / compost', qty: '4 tonnes/acre', note: 'Before nursery sowing' },
      { week: 6, item: 'DAP + Urea', qty: '40+20 kg/acre', note: 'At transplanting' },
      { week: 10, item: 'Urea', qty: '20 kg/acre', note: '4 weeks after transplant' },
    ],
  },
  wheat: {
    name: 'Wheat', emoji: '🌾', season: 'Rabi',
    soilTypes: ['loamy', 'clay loam', 'alluvial'],
    climates: ['temperate', 'subtropical'],
    duration: 120, expectedYield: '15-20 quintals/acre',
    roi: '₹25,000 - ₹45,000/acre',
    risk: 'Low',
    steps: [
      { day: 0, action: 'Deep plough field, apply FYM 4 tonnes/acre' },
      { day: 3, action: 'Sow wheat seeds at 40-45 kg/acre using seed drill' },
      { day: 5, action: 'First irrigation (Crown root irrigation)' },
      { day: 25, action: 'Apply Urea 60 kg/acre — first top dressing' },
      { day: 40, action: 'Second irrigation at tillering stage' },
      { day: 55, action: 'Apply Urea 30 kg/acre — second top dressing' },
      { day: 65, action: 'Third irrigation at jointing stage' },
      { day: 80, action: 'Fourth irrigation at grain filling stage' },
      { day: 120, action: 'Harvest when golden yellow, moisture below 14%' },
    ],
    fertilizerPlan: [
      { week: 1, item: 'DAP', qty: '50 kg/acre', note: 'Basal dose at sowing' },
      { week: 4, item: 'Urea', qty: '60 kg/acre', note: 'First top dressing after 1st irrigation' },
      { week: 8, item: 'Urea', qty: '30 kg/acre', note: 'Second top dressing at jointing' },
    ],
  },
  cotton: {
    name: 'Cotton', emoji: '🌿', season: 'Kharif',
    soilTypes: ['black cotton soil', 'loamy', 'red'],
    climates: ['tropical', 'semi-arid'],
    duration: 180, expectedYield: '6-10 quintals/acre',
    roi: '₹40,000 - ₹70,000/acre',
    risk: 'High',
    steps: [
      { day: 0, action: 'Deep summer ploughing, apply FYM 5 tonnes/acre' },
      { day: 5, action: 'Sow BT cotton seeds — 2 seeds per hole, 90×60 cm spacing' },
      { day: 20, action: 'Thinning — keep 1 healthy plant per hole' },
      { day: 30, action: 'Apply DAP 50 kg/acre + Potash 25 kg/acre' },
      { day: 45, action: 'Spray profenofos for bollworm prevention' },
      { day: 60, action: 'Apply Urea 40 kg/acre top dressing' },
      { day: 90, action: 'Monitor for whitefly and bollworm — spray if needed' },
      { day: 180, action: 'Manual picking — pick 3-4 rounds over 6 weeks' },
    ],
    fertilizerPlan: [
      { week: 1, item: 'FYM', qty: '5 tonnes/acre', note: 'Before sowing' },
      { week: 4, item: 'DAP + Potash', qty: '50+25 kg/acre', note: '30 days after sowing' },
      { week: 8, item: 'Urea', qty: '40 kg/acre', note: 'At flowering stage' },
    ],
  },
};

function getSeasonRecommendation(location: string, month: number): string[] {
  // Kharif: June-October, Rabi: November-March, Zaid: March-June
  const isKharif = month >= 5 && month <= 9;
  const isRabi = month >= 10 || month <= 2;
  
  if (isKharif) return ['tomato', 'cotton'];
  if (isRabi) return ['wheat', 'onion'];
  return ['tomato', 'onion']; // Zaid/transitional
}

async function getAIAdvisorResponse(userContext: any): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey || apiKey === 'your_anthropic_key') {
    // Fallback to rule-based recommendations
    return null;
  }

  try {
    const prompt = `You are an expert agricultural advisor for Indian farmers. 
A farmer has these details:
- Location: ${userContext.location || 'Maharashtra'}
- Land: ${userContext.acres || 5} acres
- Soil type: ${userContext.soilType || 'red soil'}
- Current season: ${userContext.season || 'Kharif'}
- Current crops: ${userContext.currentCrops?.join(', ') || 'None'}
- Weather: ${userContext.weather || 'Normal'}

Give a JSON response with:
{
  "topCrop": "crop name",
  "reason": "brief reason in 1 sentence",
  "expectedProfit": "₹X range",
  "risk": "Low/Medium/High",
  "urgentAction": "most urgent thing to do today",
  "marketTip": "1 market timing tip"
}
Respond ONLY with the JSON, no other text.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const userContext = await req.json();
    const month = new Date().getMonth();
    const recommendedCrops = getSeasonRecommendation(userContext.location, month);
    
    const aiResponse = await getAIAdvisorResponse(userContext);
    
    const primaryCropKey = aiResponse?.topCrop?.toLowerCase() || recommendedCrops[0];
    const primaryCrop = CROP_DATABASE[primaryCropKey] || CROP_DATABASE[recommendedCrops[0]];
    const altCrop = CROP_DATABASE[recommendedCrops[1]];

    const recommendations = recommendedCrops.map(key => {
      const crop = CROP_DATABASE[key];
      return {
        key,
        name: crop.name,
        emoji: crop.emoji,
        season: crop.season,
        duration: crop.duration,
        expectedYield: crop.expectedYield,
        roi: crop.roi,
        risk: crop.risk,
      };
    });

    return NextResponse.json({
      primary: {
        ...primaryCrop,
        aiReason: aiResponse?.reason || `Best suited for ${userContext.location || 'your location'} based on current season and soil conditions`,
        aiProfit: aiResponse?.expectedProfit || primaryCrop.roi,
        aiRisk: aiResponse?.risk || primaryCrop.risk,
      },
      recommendations,
      urgentAction: aiResponse?.urgentAction || 'Check soil moisture and irrigate if needed',
      marketTip: aiResponse?.marketTip || 'Monitor APMC prices daily — sell when weekly trend is upward',
      weeklyPlan: primaryCrop.steps.slice(0, 5),
      fertilizerPlan: primaryCrop.fertilizerPlan,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ crops: Object.keys(CROP_DATABASE).map(k => ({ key: k, ...CROP_DATABASE[k] })) });
}
