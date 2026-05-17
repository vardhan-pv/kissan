export interface CropPhase {
  phase: string;
  days: string;
  emoji: string;
  description: string;
  activities: string[];
  watchFor: string[];
}

export interface FertilizerSchedule {
  stage: string;
  daysAfterSowing: string;
  fertilizer: string;
  quantity: string;
  method: string;
  purpose: string;
}

export interface PestDisease {
  name: string;
  type: 'pest' | 'disease';
  symptoms: string;
  control: string;
  medicine: string;
  timing: string;
}

export interface CropData {
  id: string;
  name: string;
  localName: string;
  emoji: string;
  category: string;
  tagline: string;
  heroColor: string;
  seasons: string[];
  sowingMonths: string[];
  harvestMonths: string[];
  daysToHarvest: { min: number; max: number };
  varieties: { name: string; days: number; feature: string }[];
  soilRequirements: {
    type: string[];
    pH: string;
    drainage: string;
    preparation: string;
  };
  climate: {
    temperature: string;
    rainfall: string;
    humidity: string;
    states: string[];
  };
  seedRate: string;
  spacing: string;
  irrigation: {
    frequency: string;
    method: string;
    criticalStages: string[];
    totalWater: string;
  };
  fertilizerSchedule: FertilizerSchedule[];
  phases: CropPhase[];
  pestsAndDiseases: PestDisease[];
  harvestIndicators: string[];
  postHarvest: string[];
  yieldPerAcre: string;
  marketPrice: string;
  profitPerAcre: string;
  governmentSchemes: string[];
  proTips: string[];
  doNots: string[];
}

export const CROP_DATABASE: Record<string, CropData> = {
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    localName: 'Tamatar / ಟೊಮೇಟೊ',
    emoji: '🍅',
    category: 'Vegetables',
    tagline: 'India\'s most profitable vegetable crop',
    heroColor: '#dc2626',
    seasons: ['Kharif (Jun–Sep)', 'Rabi (Oct–Jan)', 'Summer (Feb–May)'],
    sowingMonths: ['June', 'July', 'October', 'November', 'February'],
    harvestMonths: ['September', 'October', 'January', 'February', 'May'],
    daysToHarvest: { min: 75, max: 120 },
    varieties: [
      { name: 'Arka Rakshak (Hybrid)', days: 75, feature: 'Disease resistant, 18–22 t/acre' },
      { name: 'Arka Vikas', days: 90, feature: 'Determinate, good shelf life' },
      { name: 'Pusa Ruby', days: 100, feature: 'Open pollinated, early bearing' },
      { name: 'NS-538 (Hybrid)', days: 80, feature: 'High yield, heat tolerant' },
      { name: 'Mahyco MHT-10', days: 85, feature: 'Best for processing' },
    ],
    soilRequirements: {
      type: ['Sandy loam', 'Red soil', 'Black cotton soil', 'Loamy'],
      pH: '6.0 – 7.0 (slightly acidic to neutral)',
      drainage: 'Well-drained — waterlogging kills roots',
      preparation: 'Deep plough 3 times to 30cm. Add 5 tonnes FYM/acre. Form raised beds 15cm high. Ridge-and-furrow layout for drainage.',
    },
    climate: {
      temperature: '20°C–30°C optimal. Below 10°C and above 38°C stunts growth.',
      rainfall: '75–125 cm/year. Avoid heavy rain during flowering.',
      humidity: '40–70%. High humidity causes fungal disease.',
      states: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Uttar Pradesh', 'Himachal Pradesh'],
    },
    seedRate: '150–200g/acre (200–250g for direct sowing)',
    spacing: '60cm × 45cm (row × plant). High density: 45cm × 30cm for hybrid varieties.',
    irrigation: {
      frequency: 'Every 5–7 days in summer. Every 10–12 days in winter. Reduce at fruit ripening.',
      method: 'Drip irrigation preferred (saves 40% water). Furrow irrigation for large farms.',
      criticalStages: ['Transplanting', 'Flowering (55–65 days)', 'Fruit setting (70–80 days)', 'Fruit development'],
      totalWater: '18–24 inches total per season',
    },
    fertilizerSchedule: [
      { stage: 'Land Preparation', daysAfterSowing: 'Before transplanting', fertilizer: 'FYM + Compost', quantity: '5 tonnes/acre + 2 tonnes/acre compost', method: 'Mix thoroughly into soil during ploughing', purpose: 'Soil organic matter, micronutrients, structure' },
      { stage: 'Basal Dose', daysAfterSowing: 'Day 0 (at transplanting)', fertilizer: 'DAP 18:46:00', quantity: '50 kg/acre', method: 'Apply in furrows before transplanting', purpose: 'Phosphorus for root development and establishment' },
      { stage: 'Basal Dose', daysAfterSowing: 'Day 0 (at transplanting)', fertilizer: 'Potash (MOP 0:0:60)', quantity: '25 kg/acre', method: 'Mix with DAP in furrows', purpose: 'Potassium for stem strength and disease resistance' },
      { stage: 'First Top Dressing', daysAfterSowing: 'Day 15–20', fertilizer: 'Urea (46% N)', quantity: '25 kg/acre', method: 'Band application 5cm from plant base + irrigation', purpose: 'Nitrogen boost for vegetative growth' },
      { stage: 'Second Top Dressing', daysAfterSowing: 'Day 35–40 (pre-flowering)', fertilizer: 'Urea (46% N)', quantity: '25 kg/acre', method: 'Ring application around plants', purpose: 'Nitrogen for vigorous vegetative growth before flowering' },
      { stage: 'Micronutrient Spray', daysAfterSowing: 'Day 45 (early flowering)', fertilizer: 'Boron (Solubor) + Zinc Sulphate', quantity: '100g Boron + 250g ZnSO4 per 100L water', method: 'Foliar spray in evening, cover all leaves', purpose: 'Boron prevents blossom drop. Zinc improves fruit set.' },
      { stage: 'Third Top Dressing', daysAfterSowing: 'Day 55–60 (full flowering)', fertilizer: 'NPK 13:00:45 (potassium nitrate)', quantity: '4 kg/acre (fertigation) or 20 kg broadcast', method: 'Drip fertigation preferred', purpose: 'Potassium for fruit development, firmness, sugar content' },
      { stage: 'Fruit Development', daysAfterSowing: 'Day 70–80', fertilizer: 'Calcium Nitrate', quantity: '5 kg/200L water (foliar)', method: 'Spray on fruits and leaves', purpose: 'Prevents blossom end rot, improves shelf life' },
    ],
    phases: [
      { phase: 'Nursery Preparation', days: 'Day 1–25', emoji: '🌱', description: 'Raise healthy seedlings in protected nursery before transplanting to main field.', activities: ['Fill nursery trays with cocopeat + compost (2:1 mix)', 'Sow seeds 1cm deep, 2 seeds per cell', 'Maintain 25–30°C temperature, shade net 50%', 'Water twice daily — morning and evening', 'Spray Carbendazim 1g/L at day 10 to prevent damping off', 'Harden seedlings 5 days before transplant (reduce shade)'], watchFor: ['Damping off (stem rot at base) → spray Copper Oxychloride', 'Pale yellow leaves → increase light, reduce watering', 'Aphids → spray Imidacloprid 0.5mL/L'] },
      { phase: 'Field Preparation', days: 'Day 20–25 (before transplant)', emoji: '🚜', description: 'Prepare main field with deep ploughing, bed formation and basal fertilizer.', activities: ['Deep plough 30cm (2–3 passes)', 'Apply FYM 5 tonnes + compost 2 tonnes/acre', 'Form raised beds 15cm high, 120cm wide', 'Apply DAP 50 kg + Potash 25 kg/acre in furrows', 'Install drip lines if using drip irrigation', 'Fumigate soil with Carbofuran 1kg/acre for nematode control'], watchFor: ['Hard compacted soil → extra ploughing needed', 'Poor drainage → raise beds higher', 'Previous crop residue → remove fully'] },
      { phase: 'Transplanting', days: 'Day 25–28', emoji: '🌿', description: 'Move healthy 25-day-old seedlings from nursery to main field in evening.', activities: ['Transplant only in evening (5–7 PM) to reduce wilting', 'Maintain 60cm × 45cm spacing', 'Dig holes slightly bigger than root ball', 'Apply Trichoderma 5g per planting hole', 'Water immediately after transplanting', 'Provide shade with dry grass for 2–3 days', 'Gap fill within 3 days for any dead seedlings'], watchFor: ['Wilting first 3 days → normal, keep soil moist', 'Yellowing → transplant shock, apply 2% DAP foliar spray', 'Root exposure → replant properly'] },
      { phase: 'Vegetative Growth', days: 'Day 28–55', emoji: '🍃', description: 'Rapid leaf and stem development. Focus on nutrition, pest monitoring and staking.', activities: ['Irrigation every 7–10 days depending on rain', 'Apply Urea 25 kg/acre at day 35 (top dressing)', 'Install bamboo stakes 60–75cm tall per plant', 'Tie plants loosely with soft twine at 2–3 points', 'First weeding at day 30, second at day 45', 'Spray Chlorpyrifos 2mL/L for soil insects at day 30', 'Spray Mancozeb 2g/L at day 40 for early blight prevention'], watchFor: ['Curled/distorted leaves → Mites or virus, spray Abamectin', 'Yellow mosaic → Virus (remove plant immediately)', 'White powdery coating → Powdery mildew spray Sulfur 3g/L'] },
      { phase: 'Flowering', days: 'Day 55–70', emoji: '🌸', description: 'Critical stage — protect flowers from drop, spray boron, reduce nitrogen.', activities: ['Apply Boron foliar spray 100g/100L at early flowering', 'Reduce nitrogen fertilizer — too much N causes flower drop', 'Apply Potash 20 kg/acre top dressing for fruit set', 'Spray 2,4-D 10ppm or Tomato-tone for fruit set promotion', 'Maintain steady irrigation — irregular water causes blossom end rot', 'Install yellow sticky traps for whitefly monitoring'], watchFor: ['Blossom drop → check temperature (>35°C causes drop)', 'No fruit set → poor pollination, use hand pollination or vibrate plants at 9–11 AM', 'Flower discoloration → thrips, spray Spinosad 0.5mL/L'] },
      { phase: 'Fruit Development', days: 'Day 70–90', emoji: '🍅', description: 'Fruits swell and develop. Maintain nutrition, prevent cracking, monitor quality.', activities: ['Apply Calcium Nitrate 5kg/200L foliar spray', 'Reduce irrigation frequency — irregular water causes cracking', 'Spray Potassium nitrate 1% foliar for fruit quality', 'Monitor for fruit borer — spray Emamectin Benzoate 0.5g/L', 'Remove diseased or cracked fruits immediately', 'Apply Azoxystrobin 1mL/L for fungal diseases'], watchFor: ['Fruit cracking → irregular irrigation, mulch to conserve moisture', 'Blossom end rot (black base) → calcium deficiency, apply Calcium foliar', 'Catfacing (deformed fruits) → cold stress or poor pollination'] },
      { phase: 'Harvest', days: 'Day 75–120 (multiple picks)', emoji: '🧺', description: 'Tomatoes bear over 6–10 weeks. Pick every 3–4 days at right maturity.', activities: ['Harvest at "breaker stage" (25–50% red) for long transport', 'Full red for local market — higher price but short shelf life', 'Use sharp knife or hand-snap stem above calyx', 'Handle gently — bruising causes rapid spoilage', 'Grade by size: A (>70g), B (50–70g), C (<50g)', 'Store at 12–15°C for 2 weeks (do not refrigerate below 10°C)', 'Pack in wooden crates or bamboo baskets lined with newspaper'], watchFor: ['Irregular ripening → boron/calcium deficiency', 'Soft watery fruits → late blight, harvest immediately and treat field', 'Fruit fly entry → use Spinosad baits, seal puncture holes with wax'] },
    ],
    pestsAndDiseases: [
      { name: 'Fruit Borer (Helicoverpa armigera)', type: 'pest', symptoms: 'Circular holes in fruits. Larvae inside fruit. Frass (droppings) around entry hole.', control: 'Spray Emamectin Benzoate 0.5g/L. Install pheromone traps 5/acre. Pick and destroy infected fruits.', medicine: 'Emamectin Benzoate 5% SG', timing: 'Monitor from day 60. Spray if >1 larva per 10 plants.' },
      { name: 'Whitefly (Bemisia tabaci)', type: 'pest', symptoms: 'Tiny white insects under leaves. Sticky honeydew. Sooty mold. Yellowing leaves. Transmits viral diseases.', control: 'Spray Imidacloprid 0.5mL/L or Thiamethoxam. Use yellow sticky traps. Remove heavily infested leaves.', medicine: 'Imidacloprid 17.8% SL', timing: 'Spray at first sighting. Repeat every 10 days.' },
      { name: 'Early Blight (Alternaria solani)', type: 'disease', symptoms: 'Dark brown spots with yellow rings (target board pattern) on lower leaves. Moves upward.', control: 'Remove infected leaves. Spray Mancozeb 2g/L or Azoxystrobin 1mL/L. Improve air circulation.', medicine: 'Mancozeb 75% WP + Copper Oxychloride', timing: 'Preventive spray from day 40. Curative spray every 7 days.' },
      { name: 'Late Blight (Phytophthora infestans)', type: 'disease', symptoms: 'Water-soaked lesions on leaves. White fuzzy growth on leaf undersides. Brown lesions on stems and fruits. Spreads rapidly in humid conditions.', control: 'Spray Metalaxyl-M + Mancozeb 2g/L. Remove and burn infected plants. Avoid overhead irrigation.', medicine: 'Ridomil Gold (Metalaxyl-M 4% + Mancozeb 64%)', timing: 'Emergency — spray immediately when detected. Repeat every 5 days.' },
      { name: 'Leaf Curl Virus (ToLCV)', type: 'disease', symptoms: 'Upward curling of leaves. Yellowing. Stunted growth. Distorted new growth. Spread by whitefly.', control: 'Remove and destroy infected plants. Control whitefly vector. No chemical cure — prevention only.', medicine: 'No cure — prevent whitefly with Imidacloprid', timing: 'Prevention by controlling whitefly from day 1.' },
    ],
    harvestIndicators: ['25–50% red colour for market', 'Full red for local/processing', 'Slight softness when pressed', 'Uniform colour development', 'Fruit separates easily from stem'],
    postHarvest: ['Grade by size (A/B/C)', 'Pack in crates with paper lining', 'Pre-cool to 12–15°C before transport', 'Transport in covered vehicles', 'Store max 14 days at 13°C', 'Do NOT store below 10°C — chill injury'],
    yieldPerAcre: '18–25 tonnes (Hybrid) / 10–15 tonnes (Open Pollinated)',
    marketPrice: '₹800 – ₹4,000 per quintal (seasonal variation)',
    profitPerAcre: '₹40,000 – ₹1,20,000 per season',
    governmentSchemes: ['PM Kisan Samman Nidhi (direct income support)', 'PMFBY crop insurance', 'NHM subsidy on drip irrigation (80–90%)', 'eNAM for online market access', 'Vegetable cluster scheme — Maharashtra, Karnataka'],
    proTips: ['Use drip + mulch combination — increases yield 30%, reduces disease 50%', 'Stake plants at 3–4 weeks for better fruit quality and air circulation', 'Harvest in morning hours for better shelf life', 'Sell in nearest APMC when price is above ₹2,500/quintal', 'Keep 10% area for late variety for price diversification', 'Apply Trichoderma at transplanting to prevent soil-borne diseases'],
    doNots: ['Don\'t transplant in afternoon — wilting causes stress', 'Don\'t over-irrigate — root rot and blossom end rot follows', 'Don\'t grow tomato after tomato — rotate with legumes or cereals', 'Don\'t use high nitrogen before flowering — causes flower drop', 'Don\'t store at below 10°C — chilling injury ruins fruit'],
  },

  onion: {
    id: 'onion',
    name: 'Onion',
    localName: 'Pyaaz / ಈರುಳ್ಳಿ',
    emoji: '🧅',
    category: 'Vegetables',
    tagline: 'India\'s high-value bulb crop with year-round demand',
    heroColor: '#a21caf',
    seasons: ['Kharif (Jun–Sep)', 'Late Kharif (Aug–Nov)', 'Rabi (Oct–Mar)'],
    sowingMonths: ['June', 'August', 'October', 'November'],
    harvestMonths: ['September', 'November', 'January', 'February', 'March'],
    daysToHarvest: { min: 90, max: 150 },
    varieties: [
      { name: 'Bhima Raj', days: 110, feature: 'Large bulbs, high yield, Kharif + Rabi' },
      { name: 'Bhima Super (Rabi)', days: 95, feature: 'Dark red, good storage, Rabi' },
      { name: 'Agrifound Dark Red', days: 120, feature: 'Export quality, Nashik standard' },
      { name: 'N-53 (Local)', days: 130, feature: 'Open-pollinated, low cost' },
      { name: 'Arka Kirtiman (Hybrid)', days: 100, feature: 'Very high yield 20–25 t/acre' },
    ],
    soilRequirements: {
      type: ['Sandy loam', 'Loamy', 'Red sandy loam', 'Alluvial'],
      pH: '6.0 – 7.5',
      drainage: 'Excellent drainage essential. Waterlogging causes purple blotch and basal rot.',
      preparation: 'Deep plough 25–30cm. Form raised beds 15cm high, 100cm wide. Apply FYM 4 tonnes/acre before bed formation.',
    },
    climate: {
      temperature: '13°C–24°C for bulb development. Short-day (Rabi) and long-day (Kharif) varieties.',
      rainfall: '50–75 cm/year. No rain during bulb maturity needed.',
      humidity: '50–70% during growth. Low humidity needed at maturity.',
      states: ['Maharashtra (Nashik, Pune)', 'Karnataka', 'Madhya Pradesh', 'Gujarat', 'Rajasthan'],
    },
    seedRate: '3–4 kg/acre (for nursery, 10×10m per acre field)',
    spacing: '15cm × 10cm (Rabi) / 10cm × 7.5cm (Kharif)',
    irrigation: {
      frequency: 'Every 8–10 days. Stop irrigation 10–12 days before harvest.',
      method: 'Sprinkler or furrow. Drip suitable for large farms. Avoid overhead during maturity.',
      criticalStages: ['Transplanting', 'Active vegetative (30–60 days after transplant)', 'Bulb initiation (60–90 days)', 'Stop 10–12 days before harvest'],
      totalWater: '12–18 inches total per season',
    },
    fertilizerSchedule: [
      { stage: 'Nursery (before sowing)', daysAfterSowing: 'Day 0 (nursery)', fertilizer: 'FYM + Compost', quantity: '10 kg per 10 sq.m nursery bed', method: 'Mix well into nursery soil', purpose: 'Good seedling establishment' },
      { stage: 'Basal Dose (at transplanting)', daysAfterSowing: 'Day 40–45 (at transplant)', fertilizer: 'DAP + MOP', quantity: 'DAP 40 kg + MOP 25 kg/acre', method: 'Apply in furrows, mix into soil before transplanting', purpose: 'Root development and early growth' },
      { stage: 'First Top Dressing', daysAfterSowing: 'Day 60–65 (3 weeks after transplant)', fertilizer: 'Urea', quantity: '30 kg/acre', method: 'Side dressing 5cm from plants + irrigation', purpose: 'Leaf development and nitrogen supply' },
      { stage: 'Second Top Dressing', daysAfterSowing: 'Day 80–85 (6 weeks after transplant)', fertilizer: 'Urea + Potash', quantity: 'Urea 20 kg + MOP 20 kg/acre', method: 'Band application + irrigation immediately', purpose: 'Bulb initiation and bulbing' },
      { stage: 'Sulphur Application', daysAfterSowing: 'Day 70 (bulbing stage)', fertilizer: 'Sulphur 90% WDG or Gypsum', quantity: '8 kg sulphur/acre or 100 kg gypsum/acre', method: 'Broadcast and irrigate', purpose: 'Sulfur improves flavour, pungency, and shelf life of onion' },
      { stage: 'Micronutrient Foliar', daysAfterSowing: 'Day 75 (bulbing)', fertilizer: 'Zinc Sulphate + Boron', quantity: '250g ZnSO4 + 100g Boron per 100L', method: 'Foliar spray in evening', purpose: 'Zinc for enzyme activity. Boron for bulb quality.' },
    ],
    phases: [
      { phase: 'Nursery', days: 'Day 1–40', emoji: '🌱', description: 'Raise seedlings in raised nursery beds. Good nursery = good yield.', activities: ['Prepare raised nursery beds 1m × 3m, 10cm high', 'Mix FYM + soil + sand in 1:1:1 ratio', 'Sow seeds in rows 5cm apart, cover lightly', 'Water twice daily with watering can — avoid flooding', 'Apply Thiram 3g/kg seed (seed treatment)', 'Spray Carbendazim 1g/L at day 15 for damping off prevention', 'Harden plants 7 days before transplant'], watchFor: ['Damping off → spray Copper Oxychloride 3g/L', 'Yellow seedlings → iron deficiency, spray Ferrous Sulphate 0.5%', 'Thrips on nursery → spray Fipronil 2mL/L'] },
      { phase: 'Transplanting', days: 'Day 40–45', emoji: '🌿', description: 'Transplant 5–6 leaf stage seedlings in evening or cloudy day.', activities: ['Irrigate nursery 2 hours before uprooting', 'Trim roots to 2cm and shoots to 10cm before transplant', 'Dip roots in Carbendazim solution (2g/L) for 30 min', 'Plant 2–3cm deep at 15×10cm spacing', 'Irrigate immediately after transplanting', 'Re-irrigate after 2 days for establishment'], watchFor: ['Wilting first week → normal, keep soil moist', 'Death of transplanted seedlings → check spacing depth'] },
      { phase: 'Vegetative Growth', days: 'Day 45–90', emoji: '🍃', description: 'Leaf development stage. 6–8 leaves needed before bulbing starts.', activities: ['Irrigation every 8–10 days', 'Apply Urea 30 kg/acre at day 60', 'First weeding at 20 days after transplant', 'Second weeding at 40 days after transplant', 'Spray Mancozeb 2g/L at day 60 for purple blotch prevention', 'Monitor for thrips — primary pest of onion'], watchFor: ['Purple/silver streaking on leaves → Thrips (spray Spinosad)', 'Orange-yellow elongated spots → Purple blotch fungus', 'Twisted/distorted leaves → Onion fly'] },
      { phase: 'Bulbing (Bulb Formation)', days: 'Day 90–120', emoji: '🧅', description: 'Critical phase — bulb swells rapidly. Reduce N, increase K and S.', activities: ['Apply Urea 20 kg + Potash 20 kg/acre at day 80', 'Apply Sulphur 8 kg/acre for pungency and shelf life', 'Maintain steady irrigation — irregular causes splitting', 'Reduce irrigation frequency to every 12–15 days', 'Spray Potassium nitrate 1% foliar for bulb size', 'Stop applying nitrogen after day 90 — causes soft bulbs'], watchFor: ['Bolting (flower stem) → remove immediately, harvest early', 'Multiple bulbing → too high density or N excess', 'Bulb splitting → irregular irrigation'] },
      { phase: 'Maturation & Harvest', days: 'Day 120–150', emoji: '🧺', description: 'Tops fall, neck constricts. Stop irrigation and harvest at right time.', activities: ['Stop irrigation 12–14 days before planned harvest', 'Harvest when 50–75% tops have fallen over naturally', 'Harvest early morning for better quality', 'Leave in field to cure 3–5 days in shade (do not sun cure Kharif)', 'Trim tops to 2cm above neck', 'Grade: A (>70g), B (50–70g), C (<50g)', 'Store in ventilated net bags in shade or cold store'], watchFor: ['Green tops still upright → not ready, wait more', 'Soft spongy necks → overripe, harvest immediately', 'Rotting at neck → Neck rot disease, harvest and dry quickly'] },
    ],
    pestsAndDiseases: [
      { name: 'Thrips (Thrips tabaci)', type: 'pest', symptoms: 'Silver streaking on leaves. Twisted new growth. Distorted leaves. Severe infestation stunts bulbing.', control: 'Spray Spinosad 0.5mL/L or Fipronil 2mL/L. Install blue sticky traps. Avoid dust mulch.', medicine: 'Spinosad 45% SC', timing: 'Monitor from week 3. Spray when >10 thrips per leaf.' },
      { name: 'Purple Blotch (Alternaria porri)', type: 'disease', symptoms: 'Small white sunken lesions that become purple with yellow border. Progresses from leaf tip downward.', control: 'Spray Mancozeb 2g/L or Difenoconazole 1mL/L. Improve drainage. Avoid overhead irrigation.', medicine: 'Mancozeb 75% WP', timing: 'Preventive spray from day 45. Repeat every 10 days.' },
      { name: 'Basal Rot (Fusarium oxysporum)', type: 'disease', symptoms: 'Plant wilts and dies. Pink-white fungal growth at base. Roots rotting. Spreads in wet soils.', control: 'Soil treatment with Trichoderma 2.5 kg/acre. Avoid waterlogging. Apply Carbendazim 2g/L soil drench.', medicine: 'Trichoderma viride + Carbendazim', timing: 'Prevention — soil treatment before planting.' },
    ],
    harvestIndicators: ['50–75% tops fallen', 'Neck becomes thin and soft', 'Outer skin turning papery', 'Bulb fully rounded and firm', 'No more green growth'],
    postHarvest: ['Field cure 3–5 days in shade (Kharif)', 'Sun cure 10–15 days for Rabi', 'Top trim to 2cm', 'Grade by size and colour', 'Store in net bags in cool ventilated shed', 'Cold storage 0–2°C for 6–8 months', 'Export: minimum 50mm diameter, dry skin, no sprouting'],
    yieldPerAcre: '8–12 tonnes (Open Pollinated) / 15–20 tonnes (Hybrid)',
    marketPrice: '₹500 – ₹5,000 per quintal (high variation)',
    profitPerAcre: '₹25,000 – ₹90,000 per season',
    governmentSchemes: ['NHRDF subsidy on seeds', 'Cold storage subsidy under NHM', 'Onion export support from APEDA', 'PM Kisan Samman Nidhi', 'PMFBY crop insurance'],
    proTips: ['Rabi onion (Oct–Mar) fetches best price — 70% of India\'s supply', 'Sell 30% immediately, store 70% for 2–3 months for better price', 'Proper curing doubles shelf life', 'Sulphur application improves pungency and export quality', 'Monitor Nashik APMC price daily — India\'s largest onion market'],
    doNots: ['Don\'t harvest with wet tops — neck rot during storage', 'Don\'t store in jute bags — poor air circulation', 'Don\'t over-irrigate after bulbing — causes splitting', 'Don\'t apply N after day 90 — soft watery bulbs result', 'Don\'t harvest before 50% top fall — premature harvest reduces shelf life'],
  },

  wheat: {
    id: 'wheat',
    name: 'Wheat',
    localName: 'Gehun / ಗೋಧಿ',
    emoji: '🌾',
    category: 'Cereals',
    tagline: 'India\'s staple Rabi cereal — steady income with MSP support',
    heroColor: '#d97706',
    seasons: ['Rabi only (Oct–Mar)'],
    sowingMonths: ['October', 'November', 'December'],
    harvestMonths: ['March', 'April'],
    daysToHarvest: { min: 110, max: 145 },
    varieties: [
      { name: 'HD-2967', days: 130, feature: 'High yield, popular North India' },
      { name: 'GW-496', days: 110, feature: 'Short duration, Gujarat, Rajasthan' },
      { name: 'K-307 (UP-262)', days: 145, feature: 'Good for irrigated areas' },
      { name: 'WH-711', days: 125, feature: 'Rust resistant, Haryana' },
      { name: 'Raj-4120', days: 120, feature: 'Rajasthan, low water requirement' },
    ],
    soilRequirements: {
      type: ['Loamy', 'Clay loam', 'Alluvial', 'Black cotton soil'],
      pH: '6.0 – 7.5',
      drainage: 'Moderate drainage. Waterlogging harmful at any stage.',
      preparation: 'Deep plough 20–25cm after Kharif harvest. Subsoil plough every 3 years. Apply FYM 4 tonnes/acre. Puddle for uniform seedbed.',
    },
    climate: {
      temperature: '10°C–25°C. Cool weather needed for grain filling. Frost tolerance moderate.',
      rainfall: '75–100 cm crop season. Supplement with irrigation in dry periods.',
      humidity: '30–70%. High humidity during grain fill causes karnal bunt.',
      states: ['Uttar Pradesh', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Rajasthan', 'Bihar'],
    },
    seedRate: '40–45 kg/acre (timely sowing) / 45–50 kg/acre (late sowing)',
    spacing: 'Rows 22.5cm apart (seed drill). Broadcast for small areas.',
    irrigation: {
      frequency: '5–6 irrigations total. Each at critical growth stages.',
      method: 'Flood irrigation (furrow/check basin). Sprinkler reduces water 25%.',
      criticalStages: ['Crown Root Initiation (20–25 DAS)', 'Tillering (40–45 DAS)', 'Jointing (60–65 DAS)', 'Heading/Flowering (80–85 DAS)', 'Grain Filling (100–105 DAS)', 'Dough Stage (115–120 DAS)'],
      totalWater: '15–18 inches total for the season',
    },
    fertilizerSchedule: [
      { stage: 'Basal Dose', daysAfterSowing: 'Day 0 (at sowing)', fertilizer: 'DAP (18:46:00)', quantity: '50 kg/acre', method: 'Apply in seed furrows with seed drill, 2cm below seed', purpose: 'Phosphorus for root system and early establishment' },
      { stage: 'Basal Dose', daysAfterSowing: 'Day 0 (at sowing)', fertilizer: 'Zinc Sulphate (21%)', quantity: '10 kg/acre (if zinc deficient soil)', method: 'Broadcast and mix before sowing', purpose: 'Zinc prevents khaira disease in zinc-deficient areas' },
      { stage: 'First Top Dressing', daysAfterSowing: 'Day 20–25 (Crown Root Initiation)', fertilizer: 'Urea (46% N)', quantity: '55 kg/acre', method: 'Broadcast before first irrigation', purpose: 'Main nitrogen dose for tillering and leaf area' },
      { stage: 'Second Top Dressing', daysAfterSowing: 'Day 40–45 (Tillering)', fertilizer: 'Urea (46% N)', quantity: '30 kg/acre', method: 'Broadcast before second irrigation', purpose: 'Nitrogen for tiller strengthening and spike initiation' },
      { stage: 'Foliar Spray', daysAfterSowing: 'Day 60 (Jointing)', fertilizer: '2% Urea Solution + Zinc Sulphate', quantity: '2 kg Urea + 250g ZnSO4 in 100L water', method: 'Foliar spray — cover all leaves', purpose: 'Top-up nutrition for spike and flag leaf development' },
      { stage: 'Grain Filling Support', daysAfterSowing: 'Day 85 (Heading)', fertilizer: '2% Potassium Nitrate foliar', quantity: '2 kg in 100L water', method: 'Foliar spray at heading', purpose: 'Potassium for grain weight and quality' },
    ],
    phases: [
      { phase: 'Sowing', days: 'Day 1–5', emoji: '🌾', description: 'Optimal sowing Nov 1–15 for North India. Late sowing reduces yield 30 kg/day delay after Nov 25.', activities: ['Treat seed with Carboxin 75% + Thiram 75% (2g/kg seed)', 'Use seed drill for uniform depth 5cm and spacing 22.5cm', 'Sow early morning or evening for best germination', 'Check soil moisture — sow in moist soil', 'Apply DAP 50 kg/acre as basal in seed furrow', 'Roll field lightly after sowing for seed-soil contact'], watchFor: ['Gaps in rows → seed drill blockage', 'Poor germination → seed quality issue, re-sow gaps', 'Irregular seedling emergence → uneven sowing depth'] },
      { phase: 'Germination & Establishment', days: 'Day 5–20', emoji: '🌱', description: 'Seeds germinate and seedlings establish. Crown root initiation begins around day 20.', activities: ['Watch for bird damage — install reflectors or scarecrows', 'Check for termites in dry areas — apply Chlorpyrifos 20 EC', 'Ensure good soil-seed contact — re-roll if needed', 'First irrigation at Crown Root Initiation (day 20–25)'], watchFor: ['Yellow seedlings → nitrogen or zinc deficiency', 'Dead-heart → shoot fly, apply Carbofuran', 'Poor tillering → late sowing or disease, apply Urea foliar'] },
      { phase: 'Tillering', days: 'Day 20–55', emoji: '🌿', description: 'Multiple tillers develop. More productive tillers = higher yield. Irrigation and N critical.', activities: ['First irrigation at day 20–25 (CRI stage)', 'Apply Urea 55 kg/acre before first irrigation', 'Second irrigation at day 40–45 (tillering)', 'Apply Urea 30 kg/acre before second irrigation', 'Weed control: apply Isoproturon 500g/acre for narrow-leaf weeds', '2,4-D 400g/acre for broad-leaf weeds at day 30–35'], watchFor: ['Aphid colonies on underside of leaves → spray Dimethoate 2mL/L', 'Yellow rust (yellow stripes on leaves) → spray Propiconazole 1mL/L', 'Powdery mildew white patches → spray Sulfur 3g/L'] },
      { phase: 'Jointing to Heading', days: 'Day 55–90', emoji: '🌸', description: 'Internodes elongate, flag leaf appears, head (spike) emerges. Protect flag leaf.', activities: ['Third irrigation at day 60–65 (jointing)', 'Fourth irrigation at day 80–85 (heading/flowering)', 'Spray Propiconazole 1mL/L preventively for rust control', 'Apply foliar Urea 2% + Zinc Sulphate for flag leaf health', 'Remove volunteer plants and weeds before heading'], watchFor: ['Brown rust (round orange pustules) → spray Tebuconazole 1mL/L immediately', 'Karnal bunt (black powder in grains) → Propiconazole preventive', 'Lodging (falling over) → N over-dose or heavy wind, spray CCC growth regulator'] },
      { phase: 'Grain Filling & Maturity', days: 'Day 90–130', emoji: '🌾', description: 'Grains fill with starch. Protein deposited. Harvest at golden yellow stage.', activities: ['Fifth irrigation at grain filling (day 100–105)', 'Last irrigation at dough stage (day 115–120) — only if dry', 'Stop all chemical sprays 21 days before harvest', 'Monitor for aphids which reduce grain filling — spray if >50/tiller', 'Check moisture content: harvest when grain moisture 12–14%'], watchFor: ['Premature senescence (early yellowing) → drought or disease', 'Black pointed grains → Helminthosporium', 'Shriveled grains → heat stress during filling, terminal drought'] },
      { phase: 'Harvest', days: 'Day 120–145', emoji: '🚜', description: 'Harvest at physiological maturity. Use combine harvester or reaper for efficiency.', activities: ['Harvest at golden yellow stage — grain hard, moisture 12–14%', 'Use combine harvester (saves 70% cost, 90% time)', 'Harvest early morning to avoid grain shatter', 'Thresh within 2 days to prevent weather damage', 'Clean grain to remove chaff, stones, weed seeds', 'Dry to <12% moisture before storage', 'Store in airtight bins or gunny bags in cool dry place'], watchFor: ['Green tinge in grains → not mature, wait 3–5 more days', 'Shattering grains → overripe, harvest immediately', 'Sprouting in field → rain damage, harvest immediately and dry'] },
    ],
    pestsAndDiseases: [
      { name: 'Yellow Rust (Stripe Rust)', type: 'disease', symptoms: 'Yellow-orange stripes along leaf veins. Produces powdery yellow spores. Spreads rapidly in cool humid weather.', control: 'Spray Propiconazole 25 EC (1mL/L) or Tebuconazole. Use resistant varieties (HD-2967).', medicine: 'Propiconazole 25% EC', timing: 'Spray immediately on first sighting. Repeat after 15 days.' },
      { name: 'Aphid (Sitobion avenae)', type: 'pest', symptoms: 'Green/black colonies on leaves and spike. Honeydew causes sooty mold. Reduces grain weight 20–30%.', control: 'Spray Dimethoate 2mL/L or Imidacloprid 0.5mL/L. Natural enemies (ladybirds) provide biological control.', medicine: 'Dimethoate 30 EC', timing: 'Spray when >50 aphids per tiller at heading stage.' },
      { name: 'Loose Smut (Ustilago tritici)', type: 'disease', symptoms: 'Black powdery spore masses replace grain. Entire head turns black and powdery. Spread by infected seed.', control: 'Seed treatment with Carboxin 75% WS (2.5g/kg). Use certified disease-free seed.', medicine: 'Vitavax Power (Carboxin + Thiram)', timing: 'Prevention only — seed treatment before sowing.' },
    ],
    harvestIndicators: ['Golden yellow colour of whole plant', 'Grain hard when pressed with nail', 'Grain moisture 12–14%', 'Leaf fully dried', 'Spike drooping under grain weight'],
    postHarvest: ['Thresh within 2 days', 'Clean — remove chaff and foreign material', 'Dry to <12% moisture (sun or mechanical)', 'Grade for size (FAO/USDA standard)', 'Store in airtight bins at <12% moisture', 'Fumigate with Aluminium Phosphide (1 tablet/tonne) for long storage', 'Sell at MSP or above through APMC'],
    yieldPerAcre: '15–22 quintals (with full irrigation, timely sowing)',
    marketPrice: '₹2,015 per quintal (MSP 2024–25) + premium for quality',
    profitPerAcre: '₹18,000 – ₹35,000 per season',
    governmentSchemes: ['MSP guarantee (₹2,015/quintal 2024–25)', 'PMFBY crop insurance', 'PM Kisan Samman Nidhi', 'FCI procurement through cooperatives', 'Input subsidy on certified seeds'],
    proTips: ['Timely sowing (Nov 1–15) gives 15–20% more yield than late sowing', 'Seed treatment with fungicide is mandatory to prevent smut', 'Irrigation at CRI stage is the single most critical input', 'HD-2967 variety best in North India for yield + rust resistance', 'Sell above MSP by getting quality certificate and using APMC wisely'],
    doNots: ['Don\'t sow after November 25 — each day delay loses 30 kg/acre yield', 'Don\'t skip CRI irrigation — single most critical irrigation', 'Don\'t apply excess N after jointing — causes lodging', 'Don\'t harvest at high moisture — storage losses follow', 'Don\'t store in damp conditions — weevil damage multiplies'],
  },

  rice: {
    id: 'rice',
    name: 'Rice (Paddy)',
    localName: 'Dhan / Chaval / ಭತ್ತ',
    emoji: '🍚',
    category: 'Cereals',
    tagline: 'India\'s most widely grown food crop — fed by monsoon',
    heroColor: '#16a34a',
    seasons: ['Kharif (Jun–Nov)', 'Rabi (Dec–Apr in South)', 'Summer (Feb–May in East)'],
    sowingMonths: ['June', 'July', 'December', 'February'],
    harvestMonths: ['October', 'November', 'April', 'May'],
    daysToHarvest: { min: 100, max: 150 },
    varieties: [
      { name: 'IR-64 (Short duration)', days: 110, feature: 'High yield, widely adapted, resistant to blast' },
      { name: 'Swarna (MTU-7029)', days: 145, feature: 'Most popular in East India, flood tolerant' },
      { name: 'Pusa Basmati 1121', days: 140, feature: 'Premium basmati, export quality, extra long grain' },
      { name: 'BPT-5204 (Samba Mahsuri)', days: 145, feature: 'Premium Andhra/Telangana, fine grain' },
      { name: 'DRR Dhan 45', days: 125, feature: 'Drought tolerant, aerobic rice system' },
    ],
    soilRequirements: {
      type: ['Clay', 'Clay loam', 'Loamy', 'Alluvial (river basin)'],
      pH: '5.5 – 7.0 (tolerates slightly acidic)',
      drainage: 'Low drainage preferred — paddy needs standing water 2–5cm in most phases.',
      preparation: 'Puddle field 2–3 times while flooded. Level perfectly for uniform water distribution. Apply FYM 3–4 tonnes/acre before puddling.',
    },
    climate: {
      temperature: '20°C–35°C. High temperatures during flowering (>35°C) cause spikelet sterility.',
      rainfall: '100–200 cm/year (supplemental irrigation even with monsoon)',
      humidity: '70–80% ideal. High humidity increases blast disease risk.',
      states: ['West Bengal', 'Uttar Pradesh', 'Punjab', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Odisha'],
    },
    seedRate: '20–25 kg/acre (transplanted nursery) / 40–50 kg/acre (direct seeded)',
    spacing: '20cm × 15cm (transplanted, 2–3 seedlings per hill)',
    irrigation: {
      frequency: 'Continuous flooding 2–5cm through most stages. Drain at panicle initiation for 5 days.',
      method: 'Flood (traditional). SRI method uses alternate wet-dry. AWD saves 30% water.',
      criticalStages: ['Transplanting (maintain 2cm water)', 'Tillering (5cm water)', 'Panicle initiation (drain then re-flood)', 'Flowering (maintain 2cm)', 'Grain filling', 'Drain 10 days before harvest'],
      totalWater: '40–60 inches (traditional) / 28–35 inches (AWD)',
    },
    fertilizerSchedule: [
      { stage: 'Basal (at transplanting)', daysAfterSowing: 'Day 0', fertilizer: 'DAP + Potash + Zinc Sulphate', quantity: 'DAP 40 kg + MOP 20 kg + ZnSO4 10 kg/acre', method: 'Broadcast in standing water and puddle into soil', purpose: 'Phosphorus and zinc for root establishment' },
      { stage: 'First Top Dressing', daysAfterSowing: 'Day 20–25 (active tillering)', fertilizer: 'Urea', quantity: '45 kg/acre', method: 'Broadcast in standing water (5cm level)', purpose: 'Nitrogen for vigorous tillering' },
      { stage: 'Second Top Dressing', daysAfterSowing: 'Day 45–50 (panicle initiation)', fertilizer: 'Urea + Potash', quantity: 'Urea 25 kg + MOP 15 kg/acre', method: 'Broadcast before draining field briefly', purpose: 'Nitrogen for panicle development, potassium for grain quality' },
      { stage: 'Foliar at Panicle Initiation', daysAfterSowing: 'Day 50 (PI stage)', fertilizer: '2% Urea + Silicon', quantity: '2 kg Urea + 1L Silicon in 100L water', method: 'Foliar spray — thoroughly wet all leaves', purpose: 'Silicon strengthens stem against lodging and blast. Urea for flag leaf.' },
      { stage: 'Grain Filling', daysAfterSowing: 'Day 70–80 (heading)', fertilizer: 'Potassium Sulphate foliar', quantity: '1 kg in 100L water', method: 'Foliar spray at heading', purpose: 'Potassium improves grain weight and milling quality' },
    ],
    phases: [
      { phase: 'Nursery (for transplanted rice)', days: 'Day 1–25', emoji: '🌱', description: 'Prepare healthy nursery. 1/10th area needed as nursery for the main field.', activities: ['Prepare wet nursery beds 1m wide, raised 10cm', 'Pre-germinate seed: soak 24h, then incubate 24h in bags', 'Sow germinated seeds uniformly on mud-pressed beds', 'Apply Nitrogen 2g/sq.m nursery after 7 days', 'Spray Carbendazim 1g/L at day 10 for blast prevention', 'Harden nursery 5 days before transplanting (reduce water)'], watchFor: ['Blast (diamond shaped lesions) → spray Tricyclazole 0.6g/L', 'Yellow leaves → nitrogen deficiency', 'Root rot → poor drainage, improve bed drainage'] },
      { phase: 'Transplanting & Establishment', days: 'Day 25–40', emoji: '🌿', description: 'Transplant 25-day-old seedlings. This is most labour-intensive stage.', activities: ['Puddle main field thoroughly — 2–3 puddle operations', 'Level field perfectly for uniform water management', 'Transplant 2–3 seedlings per hill at 20×15cm spacing', 'Maintain 2–3cm water after transplanting', 'Gap fill within 7 days for any dead hills', 'Apply basal dose of DAP + Potash + ZnSO4 at transplanting'], watchFor: ['Wilting transplants → normal for 3 days, keep flooded', 'Yellowing → nitrogen, apply Urea foliar 1%', 'Dead hills > 10% → replant gap fill'] },
      { phase: 'Tillering', days: 'Day 30–60', emoji: '🍃', description: 'Maximum tiller production period. Each productive tiller = one panicle. Target 20–25 tillers/hill.', activities: ['Maintain 5cm water level for active tillering', 'Apply Urea 45 kg/acre at day 25', 'Weed control: Bispyribac sodium 0.5mL/L at day 15 after transplant', 'Install light traps for Stem borer monitoring', 'Spray Cartap Hydrochloride 2g/L if stem borer detected'], watchFor: ['Dead hearts (white young leaves) → stem borer, spray immediately', 'Sheath blight (brown water-soaked lesions on sheath) → Hexaconazole 2mL/L', 'BPH (brown planthopper) → spray Buprofezin 2mL/L'] },
      { phase: 'Panicle Initiation to Heading', days: 'Day 60–90', emoji: '🌸', description: 'Panicle forms inside stem. Head emerges (heading). Flowering occurs. Protect heavily.', activities: ['Drain field for 5 days at PI (panicle initiation) for good tillering control', 'Re-flood after draining at PI', 'Apply Urea 25 kg + Potash 15 kg/acre at PI', 'Spray Tricyclazole 0.6g/L at PI for blast prevention', 'Spray Propiconazole 1mL/L at heading for sheath blight and false smut', 'Ensure 2cm water during flowering — drought causes 40% yield loss'], watchFor: ['Neck blast (dark constriction at base of panicle) → spray immediately with Isoprothiolane', 'False smut (green-black balls in panicle) → spray Copper Oxychloride 3g/L', 'Gall midge (silvery/dead tillers) → check for maggots, apply Carbofuran'] },
      { phase: 'Grain Filling & Maturity', days: 'Day 90–120', emoji: '🌾', description: 'Grains fill with starch. Keep field flooded until 10 days before harvest.', activities: ['Maintain 2cm water until dough stage (day 105–110)', 'Apply Potassium Sulphate foliar spray at heading', 'Drain field 10–14 days before harvest', 'Spray Monocrotophos 1.5mL/L if leaf roller or skipper damage seen', 'Do NOT apply fungicide after heading for premium/basmati markets'], watchFor: ['Grain discoloration → BPH, stem rot, harvest early if >30% affected', 'Green panicles in yellow field → late tillers, remove or wait', 'Rat damage → install rat traps or zinc phosphide bait stations'] },
      { phase: 'Harvest', days: 'Day 115–150', emoji: '🚜', description: 'Harvest at 20–25% grain moisture for threshing. 80–85% golden grains = ready.', activities: ['Drain field 10–14 days before harvest date', 'Harvest when 80–85% grains are golden yellow', 'Use combine harvester for large areas (cuts cost 60%)', 'Thresh same day as cutting to prevent losses', 'Dry immediately to 14% moisture for storage', 'Bag in moisture-proof jute bags or hermetic bags', 'Sell at MSP through government procurement or APMC'], watchFor: ['Bird flocks → install scarecrows, nets, fire crackers', 'Pre-harvest sprouting → harvest immediately', 'Lodging before harvest → harvest from upright plants first'] },
    ],
    pestsAndDiseases: [
      { name: 'Rice Blast (Pyricularia oryzae)', type: 'disease', symptoms: 'Diamond-shaped grey lesions with brown border on leaves. Neck blast: dark constriction at base of panicle causing entire panicle to die.', control: 'Spray Tricyclazole 0.6g/L (systemic). Preventive spray at PI stage. Use blast-resistant varieties (IR-64).', medicine: 'Tricyclazole 75% WP', timing: 'Preventive at tillering and panicle initiation. Curative within 24h of detection.' },
      { name: 'Brown Planthopper (BPH)', type: 'pest', symptoms: 'Circular brown patches (hopper burn) in field. Sucking insects at base of plant. Plants collapse.', control: 'Drain field for 5 days at first sighting. Spray Buprofezin 2mL/L or Ethiprole + Imidacloprid. Do NOT spray pyrethroids.', medicine: 'Buprofezin 25% SC', timing: 'Spray when >5 hoppers per plant. Avoid pyrethroids — resurgence trigger.' },
      { name: 'Stem Borer (Scirpophaga incertulas)', type: 'pest', symptoms: 'Dead hearts at tillering (central leaf dead). White ears at heading (panicle dies without grain).', control: 'Release Trichogramma cards (50,000 eggs/acre) at egg stage. Spray Chlorantraniliprole 0.4mL/L or Cartap Hydrochloride 2g/L.', medicine: 'Chlorantraniliprole 18.5% SC (Coragen)', timing: 'Spray at egg-hatching stage. Install light traps for monitoring.' },
    ],
    harvestIndicators: ['80–85% panicles golden yellow', 'Grain hard and non-doughy', 'Grain moisture 20–25%', 'Most leaves dried', 'Grains separate easily from panicle'],
    postHarvest: ['Thresh on same day as harvest', 'Dry paddy to 14% moisture', 'Clean to remove stones and chaff', 'Mill within 3 months for best quality', 'Store in hermetic bags or metal silos', 'Sell at MSP or process to value-added products'],
    yieldPerAcre: '18–28 quintals (Kharif) / 20–30 quintals (Rabi, irrigated)',
    marketPrice: '₹2,183 per quintal (MSP Kharif 2024) + quality premium',
    profitPerAcre: '₹15,000 – ₹40,000 per season',
    governmentSchemes: ['MSP procurement (FCI, state agencies)', 'PMFBY insurance', 'PM Kisan Nidhi', 'SRI (System of Rice Intensification) promotion', 'Custom hiring centres for mechanization'],
    proTips: ['SRI method with 15-day seedlings gives 20% more yield with less seed and water', 'Use certified seed — 10–15% yield advantage guaranteed', 'Install light traps for early pest monitoring', 'Pre-harvest crop insurance is essential for monsoon crop', 'Sell Basmati through APEDA-certified exporters for 3x price premium'],
    doNots: ['Don\'t transplant seedlings older than 30 days — yield penalty', 'Don\'t apply pyrethroids for BPH — causes resurgence', 'Don\'t skip water during flowering — 40% yield loss', 'Don\'t delay harvest beyond 85% golden yellow — shattering loss', 'Don\'t store above 14% moisture — heating and storage pest damage'],
  },

  cotton: {
    id: 'cotton',
    name: 'Cotton',
    localName: 'Kapas / Karuvu / ಹತ್ತಿ',
    emoji: '☁️',
    category: 'Cash Crops',
    tagline: 'The white gold — India\'s most important cash crop',
    heroColor: '#6b7280',
    seasons: ['Kharif only (Apr–Dec)'],
    sowingMonths: ['April', 'May', 'June', 'July'],
    harvestMonths: ['October', 'November', 'December', 'January'],
    daysToHarvest: { min: 150, max: 210 },
    varieties: [
      { name: 'Bollgard II (BG-II) Hybrid', days: 180, feature: 'Bt toxin in-built, bollworm resistance, 8–12 q/acre' },
      { name: 'NHH-44 Hybrid', days: 170, feature: 'Short duration, early maturing' },
      { name: 'MCU-5', days: 200, feature: 'Long staple fibre, non-Bt, low input' },
      { name: 'LRA-5166', days: 195, feature: 'Rainfed, drought tolerant' },
      { name: 'Suraj (Hybrid)', days: 165, feature: 'High yield, whitefly tolerant' },
    ],
    soilRequirements: {
      type: ['Black cotton soil (regur)', 'Loamy', 'Red sandy loam', 'Alluvial'],
      pH: '6.0 – 8.0 (wide tolerance)',
      drainage: 'Moderate. Waterlogging for >48 hours causes root rot and wilt.',
      preparation: 'Deep plough 30–45cm (cotton roots go very deep). Subsoil plough every 3–4 years. Apply FYM 5 tonnes/acre.',
    },
    climate: {
      temperature: '25°C–35°C. Frost kills the crop. Dry weather needed during boll opening.',
      rainfall: '50–100 cm/year. Rainfed possible in Vidarbha with 700mm+ rainfall.',
      humidity: 'Low humidity during boll development preferred. High humidity causes boll rot.',
      states: ['Maharashtra (Vidarbha)', 'Gujarat', 'Telangana', 'Andhra Pradesh', 'Karnataka', 'Punjab', 'Haryana'],
    },
    seedRate: '1.5–2 kg/acre (hybrid seeds) / 6–8 kg/acre (open pollinated)',
    spacing: '90cm × 60cm (Hybrid) / 75cm × 60cm (OP varieties)',
    irrigation: {
      frequency: 'Every 15–20 days in dry conditions. 5–6 irrigations total for rainfed areas.',
      method: 'Furrow or drip. Drip reduces water 40%, increases yield 20%.',
      criticalStages: ['Germination (25 DAS)', 'Squaring/Flower bud (40–50 DAS)', 'Flowering (60–80 DAS)', 'Boll development (90–120 DAS)', 'Boll opening — no irrigation'],
      totalWater: '20–30 inches supplemental (rainfed takes monsoon)',
    },
    fertilizerSchedule: [
      { stage: 'Land Preparation', daysAfterSowing: 'Before sowing', fertilizer: 'FYM + Compost', quantity: '5 tonnes FYM + 2 tonnes compost/acre', method: 'Mix into soil during deep ploughing', purpose: 'Soil fertility and moisture retention in black soil' },
      { stage: 'Basal Dose', daysAfterSowing: 'Day 0 (at sowing)', fertilizer: 'DAP + Potash + SSP', quantity: 'DAP 40 kg + MOP 25 kg + SSP 50 kg/acre', method: 'Apply in furrows before sowing', purpose: 'Phosphorus, potassium, sulphur for root development' },
      { stage: 'First Top Dressing', daysAfterSowing: 'Day 30 (vegetative)', fertilizer: 'Urea', quantity: '35 kg/acre', method: 'Ring application + irrigation or before rain', purpose: 'Nitrogen for vegetative growth and canopy development' },
      { stage: 'Second Top Dressing', daysAfterSowing: 'Day 55–60 (squaring/bud)', fertilizer: 'Urea + Potash', quantity: 'Urea 25 kg + MOP 20 kg/acre', method: 'Band application + irrigation', purpose: 'Nitrogen for flower and bud development, K for boll set' },
      { stage: 'Micronutrient Foliar', daysAfterSowing: 'Day 65 (early flowering)', fertilizer: 'Boron + Zinc Sulphate', quantity: '200g Boron + 300g ZnSO4 per 100L', method: 'Foliar spray, thorough coverage', purpose: 'Boron for pollen viability. Zinc for enzyme activity and boll set.' },
      { stage: 'Boll Development', daysAfterSowing: 'Day 90 (boll development)', fertilizer: 'Potassium Nitrate foliar + Calcium Nitrate', quantity: '1 kg + 1 kg per 100L water', method: 'Foliar spray on bolls and leaves', purpose: 'Potassium for fibre length and quality. Calcium prevents boll shedding.' },
      { stage: 'Boll Opening', daysAfterSowing: 'Day 120–130', fertilizer: 'NO fertilizer — stop all inputs', quantity: 'None', method: 'Only pick cotton — no water or fertilizer', purpose: 'Dry conditions needed for boll opening and white fibre quality' },
    ],
    phases: [
      { phase: 'Sowing', days: 'Day 1–10', emoji: '🌱', description: 'Sow BG-II hybrid seeds at 90×60cm in well-prepared black soil field.', activities: ['Treat seed with Imidacloprid 70 WS (5g/kg) for sucking pest protection', 'Sow 2 seeds per hole at 2–3cm depth', 'Ensure soil moisture — sow in moist soil or pre-irrigate', 'Apply FYM 5 tonnes + DAP 40 kg in furrows', 'Keep furrows open for rainwater harvesting in rainfed areas'], watchFor: ['Poor germination → soil too dry or too wet, seeds cracked', 'Bird damage → cover with soil properly', 'Ants carrying seeds → Chlorpyrifos 2mL/L soil drench'] },
      { phase: 'Thinning & Gap Fill', days: 'Day 10–20', emoji: '🌿', description: 'Remove extra seedlings. One healthy plant per hole. Fill gaps.', activities: ['Thin to 1 plant per hill at 2-leaf stage (day 12–15)', 'Fill gaps with seedlings transplanted from thick areas', 'First weeding with tractor at day 15', 'Apply Pendimethalin 1L/acre for weed control'], watchFor: ['Damping off → remove affected seedlings, apply Copper Oxychloride', 'Aphid colonies → spray Imidacloprid 0.5mL/L', 'Cutworm damage → apply Quinalphos granules in soil'] },
      { phase: 'Vegetative Growth', days: 'Day 20–55', emoji: '🍃', description: 'Plant develops branching framework. More branches = more bolls. Monitor pests.', activities: ['Apply Urea 35 kg/acre top dressing at day 30', 'Second weeding at day 30', 'Irrigation if no rain for 15+ days', 'Monitor for jassids and whitefly — primary early pests', 'Spray Profenofos 2mL/L for thrips if needed', 'Install pheromone traps for bollworm monitoring (5/acre)'], watchFor: ['Red leaf (reddening) → potassium or magnesium deficiency', 'Leaf curl → whitefly and viral — spray Imidacloprid', 'Jassid damage (hopper burn at leaf edges) → spray Dimethoate 2mL/L'] },
      { phase: 'Squaring & Flowering', days: 'Day 55–90', emoji: '🌸', description: 'Flower buds (squares) appear. Protect flowers. Critical nitrogen and potassium period.', activities: ['Apply Urea 25 kg + Potash 20 kg/acre at squaring (day 55–60)', 'Spray Boron + Zinc Sulphate foliar spray at day 65', 'Monitor bollworm pheromone traps — spray if >8 moths/trap/week', 'Spray Emamectin Benzoate 0.5g/L for bollworm if detected', 'Protect flowers from temperature stress — irrigate in evening'], watchFor: ['Square shedding → bollworm entry, spray immediately', 'Flower petals with pink staining → pink bollworm, use Spinosad', 'Deformed flowers → mealy bug, spray Profenofos + Cypermethrin'] },
      { phase: 'Boll Development', days: 'Day 90–150', emoji: '🌿', description: 'Bolls swell and mature. This is the revenue period. Protect every boll.', activities: ['Spray Potassium Nitrate 1% + Calcium Nitrate 1% foliar at day 90', 'Monitor bolls for rot and insect holes every week', 'Pick first flush at day 120–130 (10% bolls open)', 'Pick second flush at day 145–160 (60% bolls open)', 'Pick third and final flush at day 175–190 (all bolls open)'], watchFor: ['Boll rot (black soft bolls) → Colletotrichum, harvest early', 'Bollworm entry hole → Emamectin Benzoate spray', 'Mealy bug white cottony growth → spray Buprofezin or Spirotetramat'] },
      { phase: 'Picking & Harvest', days: 'Day 150–210 (3 picks)', emoji: '🧺', description: 'Cotton is picked 3–4 times over 8 weeks. Pick in dry conditions only.', activities: ['Pick only fully open white bolls — do NOT pick unopened', 'Pick in dry morning conditions — wet cotton stains and loses quality', 'Pick early variety bolls first (lower branches)', 'Grade separately — premium white cotton vs. mixed', 'Avoid contamination with plastic bags — use cloth bags', 'Weigh and keep track per pick for yield records', 'Sell to ginning factory or wait for CCI price support'], watchFor: ['Yellow or brown fibre → rain damage or pest, sell immediately', 'Green bolls mixed → reduces grade significantly', 'Rat damage → install traps, bait stations'] },
    ],
    pestsAndDiseases: [
      { name: 'Pink Bollworm (Pectinophora gossypiella)', type: 'pest', symptoms: 'Pink caterpillars inside bolls. Damaged flowers with petals stuck together (rosetted). Seeds damaged and stained.', control: 'Pheromone traps (5/acre). Spray Spinosad 0.5mL/L or Emamectin Benzoate 0.5g/L. Remove and destroy rosetted flowers.', medicine: 'Spinosad 45% SC', timing: 'Monitor pheromone traps weekly. Spray when >8 moths/trap/week.' },
      { name: 'Whitefly (Bemisia tabaci)', type: 'pest', symptoms: 'White insects under leaves. Sticky honeydew. Yellowing, sooty mold. Transmits leaf curl virus.', control: 'Spray Diafenthiuron 1g/L or Thiamethoxam 0.3g/L. Install yellow sticky traps. Use neem-based pesticide.', medicine: 'Diafenthiuron 50% WP', timing: 'Spray at first sighting. Rotate chemicals every 2 sprays.' },
      { name: 'Cotton Wilt (Fusarium oxysporum f.sp. vasinfectum)', type: 'disease', symptoms: 'Sudden wilting of plant in hot weather. Yellow-brown discolouration of vascular tissue when stem is cut. Plant dies rapidly.', control: 'Soil treatment with Trichoderma 2.5 kg/acre. Use wilt-resistant varieties. Avoid waterlogging. Apply Carbendazim 2g/L soil drench.', medicine: 'Trichoderma + Carbendazim', timing: 'Prevention — soil treatment before sowing.' },
    ],
    harvestIndicators: ['Boll fully open and fluffy white', 'Boll dry and brown outer shell', 'Fibre dry and separates easily', 'Early morning dew dried fully', 'No green in boll shell'],
    postHarvest: ['Pick in dry weather — wet cotton stains and molds', 'Grade separately — Shankar-6, J-34 standards', 'Store in dry ventilated shed — NOT in open', 'Moisture < 8% before ginning', 'Sell to APMC, ginning factory, or CCI at MSP', 'Get quality certificate for premium price'],
    yieldPerAcre: '6–12 quintals (seed cotton/kapas)',
    marketPrice: '₹5,500 – ₹7,000 per quintal kapas (MSP ₹7,121 in 2024)',
    profitPerAcre: '₹25,000 – ₹60,000 per season',
    governmentSchemes: ['MSP support (₹7,121/quintal 2024)', 'CCI (Cotton Corporation of India) procurement', 'PMFBY insurance', 'Technology Mission on Cotton (TMC)', 'Bt cotton seed subsidy'],
    proTips: ['BG-II hybrid gives natural bollworm protection — fewer sprays needed', 'Pick in 3 separate rounds — quality variation between picks is significant', 'Pheromone traps reduce bollworm spray costs by 40%', 'Drip irrigation + fertigation gives 20% better yield and 30% less water', 'Know CCI market — sell when price is above MSP'],
    doNots: ['Don\'t pick wet cotton — mold and staining causes rejection', 'Don\'t use pyrethroid sprays in early season — jassid resurgence', 'Don\'t apply N after boll opening stage — delays maturity', 'Don\'t store cotton in gunny bags — moisture absorption', 'Don\'t mix plastic with cotton — demerits at ginning factory'],
  },

  potato: {
    id: 'potato',
    name: 'Potato',
    localName: 'Aloo / Batata / ಆಲೂಗಡ್ಡೆ',
    emoji: '🥔',
    category: 'Vegetables',
    tagline: 'High-value short-duration vegetable with excellent market demand',
    heroColor: '#92400e',
    seasons: ['Rabi (Oct–Jan)', 'Spring (Jan–Apr) in hills'],
    sowingMonths: ['October', 'November', 'January'],
    harvestMonths: ['January', 'February', 'March', 'April'],
    daysToHarvest: { min: 70, max: 120 },
    varieties: [
      { name: 'Kufri Jyoti', days: 90, feature: 'Medium maturity, good for chips' },
      { name: 'Kufri Sindhuri', days: 100, feature: 'Red skin, good storage' },
      { name: 'Kufri Bahar (Hybrid)', days: 80, feature: 'Short duration, high yield' },
      { name: 'Kufri Pukhraj', days: 70, feature: 'Early maturity, yellow flesh' },
      { name: 'Atlantic', days: 85, feature: 'Processing/chips quality' },
    ],
    soilRequirements: {
      type: ['Sandy loam', 'Loamy', 'Well-drained red soil'],
      pH: '5.2 – 6.4 (slightly acidic)',
      drainage: 'Excellent drainage essential. Waterlogging causes rotting of tubers.',
      preparation: 'Deep plough 30–40cm. Apply FYM 8 tonnes/acre. Form ridges 60cm apart, 20cm high.',
    },
    climate: {
      temperature: '15°C–25°C. Tuber initiation needs cool nights <20°C. Above 30°C stops tuberization.',
      rainfall: '50–75cm. Supplemental irrigation essential.',
      humidity: '60–80% preferred.',
      states: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Gujarat', 'Punjab', 'Madhya Pradesh'],
    },
    seedRate: '8–10 quintals/acre (certified seed tubers, 30–40g size)',
    spacing: '60cm × 20cm (ridge × plant)',
    irrigation: {
      frequency: 'Every 8–10 days. 5–7 irrigations total.',
      method: 'Furrow or sprinkler. Drip not traditional but works well.',
      criticalStages: ['Planting', 'Stolon initiation (20–25 DAS)', 'Tuber initiation (30–40 DAS)', 'Tuber development (50–70 DAS)', 'Stop 10 days before harvest'],
      totalWater: '15–20 inches per season',
    },
    fertilizerSchedule: [
      { stage: 'Basal', daysAfterSowing: 'At planting', fertilizer: 'FYM + DAP + Potash', quantity: '8 tonnes FYM + 50 kg DAP + 50 kg Potash/acre', method: 'Mix FYM in ridges. DAP + K in furrow below seed', purpose: 'Organic matter for tuber development. P and K for root and tuber quality.' },
      { stage: 'First Top Dressing', daysAfterSowing: 'Day 25 (earthing up)', fertilizer: 'Urea', quantity: '65 kg/acre', method: 'Apply on ridge sides before earthing up + irrigation', purpose: 'Nitrogen for stolon and canopy development' },
      { stage: 'Second Top Dressing', daysAfterSowing: 'Day 45–50', fertilizer: 'Urea + Potash', quantity: '30 kg Urea + 25 kg Potash/acre', method: 'Band application + irrigation', purpose: 'Potassium for tuber starch accumulation and skin quality' },
      { stage: 'Calcium-Boron Foliar', daysAfterSowing: 'Day 40 (early tuber development)', fertilizer: 'Calcium Nitrate + Boron', quantity: '1 kg Calcium Nitrate + 100g Boron per 100L', method: 'Foliar spray', purpose: 'Calcium prevents internal brown spot. Boron improves tuber set.' },
    ],
    phases: [
      { phase: 'Seed Preparation & Planting', days: 'Day 1–5', emoji: '🥔', description: 'Plant certified seed tubers. Cut tubers must be treated to prevent rotting.', activities: ['Use certified disease-free seed tubers 30–40g size', 'Treat seed with Mancozeb 3g/L + Imidacloprid 3mL/L solution (dip 30 min, dry)', 'Plant 8–10cm deep in ridge furrows', 'Apply FYM 8 tonnes + DAP 50 kg in base of ridge', 'Plant on ridges 60cm apart at 20cm spacing'], watchFor: ['Seed rot → fungal, too wet soil or untreated seed', 'Poor sprouting → cold soil below 10°C, wait for warmth'] },
      { phase: 'Emergence & Vegetative', days: 'Day 15–40', emoji: '🌿', description: 'Shoots emerge and stolons (underground runners) develop.', activities: ['First irrigation 20 days after planting', 'Apply Urea 65 kg/acre at day 25 (earthing-up time)', 'Earthing up: push soil from furrow to ridge sides to cover stolons', 'Spray Mancozeb 2g/L at day 30 for early blight prevention', 'Weed control: Metribuzin 250g/acre at emergence'], watchFor: ['Blackleg (black stem base) → bacterial, remove plant', 'Aphid colonies → spray Imidacloprid (vector of PVY virus)', 'Thin stems with few leaves → nitrogen deficiency or poor seed'] },
      { phase: 'Tuber Initiation & Development', days: 'Day 40–90', emoji: '🥔', description: 'Tubers form and grow rapidly. Protect from late blight above all else.', activities: ['Irrigation every 8 days — steady moisture prevents knobby tubers', 'Apply Urea 30 kg + Potash 25 kg/acre at day 45', 'Spray Metalaxyl-M + Mancozeb (Ridomil) 2g/L for late blight prevention', 'Apply Calcium Nitrate + Boron foliar spray', 'Keep earthed up ridges intact — green tubers are toxic'], watchFor: ['Late blight (black water-soaked lesions) → EMERGENCY spray Metalaxyl-M immediately', 'Common scab (rough corky patches) → too alkaline soil, reduce pH', 'Hollow heart (cavity inside) → irregular irrigation, maintain steady moisture'] },
      { phase: 'Maturation & Harvest', days: 'Day 90–120', emoji: '🧺', description: 'Tops die down naturally. Skin set = ready to harvest.', activities: ['Stop irrigation 10 days before harvest', 'Kill top naturally or by Diquat spray (haulm killing) for uniform maturity', 'Test skin set: rub tuber — skin should not peel off easily', 'Harvest with mechanized digger or carefully by hand for small areas', 'Leave on ground 2 hours to dry soil before collection', 'Store in cool dark store at 4°C or sell immediately'], watchFor: ['Green tubers → exposure to light, discard or sell as processing only', 'Soft rotten tubers → late blight or wet storage, remove immediately', 'Cracked tubers → irregular irrigation during development'] },
    ],
    pestsAndDiseases: [
      { name: 'Late Blight (Phytophthora infestans)', type: 'disease', symptoms: 'Water-soaked dark lesions on leaves. White fuzzy growth on leaf undersides in humid morning. Spreads to tubers.', control: 'Spray Metalaxyl-M + Mancozeb 2g/L every 5–7 days in humid weather. Remove infected plants immediately.', medicine: 'Ridomil Gold 68 WG (Metalaxyl-M + Mancozeb)', timing: 'Preventive spray from day 40. Emergency spray within 24h of detection.' },
      { name: 'Aphids (Myzus persicae)', type: 'pest', symptoms: 'Green soft-bodied insects on leaf undersides. Honeydew and sooty mold. Virus transmission (PVY, PLRV).', control: 'Spray Imidacloprid 0.5mL/L or Thiamethoxam. Install yellow sticky traps.', medicine: 'Imidacloprid 17.8% SL', timing: 'Spray at first sighting — primarily important for virus prevention.' },
    ],
    harvestIndicators: ['Tops yellowing and dying', 'Skin does not peel on rubbing', 'Tubers firm and fully developed', 'Vines completely yellow', '10 days since last irrigation'],
    postHarvest: ['Pre-cure at 12–15°C, 90% humidity for 2 weeks', 'Store in dark cold store at 4°C (up to 8 months)', 'Sort and grade before sale', 'Bag in mesh bags — not airtight', 'Remove green tubers — toxic solanine'],
    yieldPerAcre: '80–150 quintals',
    marketPrice: '₹400 – ₹2,000 per quintal (varies highly)',
    profitPerAcre: '₹20,000 – ₹80,000 per season',
    governmentSchemes: ['PM Kisan Nidhi', 'PMFBY crop insurance', 'Cold storage subsidy under NHM', 'Potato certified seed subsidy'],
    proTips: ['Late blight is the single biggest risk — never skip preventive spray', 'Earthing up on time increases yield 20%', 'Certified seed = certified quality and disease-free start', 'Cold store for 2–3 months = 3x better price', 'Contract farming with chips companies (PepsiCo, ITC) gives guaranteed price'],
    doNots: ['Don\'t plant uncertified seed — virus disease spreads rapidly', 'Don\'t store above 10°C — sprouting and weight loss', 'Don\'t expose tubers to light — solanine (toxic green colour)', 'Don\'t harvest wet — rot in storage', 'Don\'t skip late blight spray — one infection destroys entire crop'],
  },
  
  soybean: {
    id: 'soybean',
    name: 'Soybean',
    localName: 'Soyabean / ಸೋಯಾ',
    emoji: '🟡',
    category: 'Oilseeds / Legumes',
    tagline: 'Protein-rich legume that fixes nitrogen — good rotation crop',
    heroColor: '#ca8a04',
    seasons: ['Kharif only (Jun–Oct)'],
    sowingMonths: ['June', 'July'],
    harvestMonths: ['October', 'November'],
    daysToHarvest: { min: 90, max: 120 },
    varieties: [
      { name: 'JS-335', days: 95, feature: 'Most popular Madhya Pradesh/Vidarbha' },
      { name: 'JS-9560 (MAUS-71)', days: 90, feature: 'Short duration, drought tolerant' },
      { name: 'NRC-37', days: 100, feature: 'High protein, soybean meal quality' },
      { name: 'MAUS-162', days: 95, feature: 'Maharashtra recommendation' },
      { name: 'DS-228', days: 100, feature: 'Gujarat/Rajasthan adaptation' },
    ],
    soilRequirements: {
      type: ['Loamy', 'Clay loam', 'Black soil', 'Red sandy loam'],
      pH: '6.0 – 7.5',
      drainage: 'Well-drained. Waterlogging highly detrimental.',
      preparation: 'Deep plough 20–25cm after pre-monsoon rains. Apply FYM 3 tonnes/acre.',
    },
    climate: {
      temperature: '25°C–30°C. Sensitive to frost and very high temperatures.',
      rainfall: '50–100 cm well-distributed. Requires moisture at flowering.',
      humidity: 'Moderate 60–70%.',
      states: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Andhra Pradesh'],
    },
    seedRate: '30–35 kg/acre',
    spacing: '45cm × 5cm (rows × plant)',
    irrigation: {
      frequency: '2–3 critical irrigations if rainfall is inadequate.',
      method: 'Furrow or sprinkler. Generally rainfed.',
      criticalStages: ['Flower initiation (R1 stage — 30–40 DAS)', 'Pod filling (R3–R4 stage — 60–80 DAS)'],
      totalWater: '6–8 inches supplemental (rest from rain)',
    },
    fertilizerSchedule: [
      { stage: 'Seed Treatment', daysAfterSowing: 'Before sowing', fertilizer: 'Rhizobium + PSB inoculant', quantity: '200g Rhizobium + 200g PSB per 12 kg seed', method: 'Mix inoculant in jaggery solution, coat seeds, shade-dry 30 min', purpose: 'Biological nitrogen fixation — saves 100% nitrogen fertilizer cost' },
      { stage: 'Basal Dose', daysAfterSowing: 'Day 0 (at sowing)', fertilizer: 'DAP + Potash + Sulphur', quantity: 'DAP 50 kg + MOP 25 kg + Sulphur 8 kg/acre', method: 'Apply in furrows during sowing', purpose: 'Phosphorus for root nodule formation. Sulphur for protein synthesis.' },
      { stage: 'Top Dressing (only if needed)', daysAfterSowing: 'Day 30 (if leaves pale yellow)', fertilizer: 'Urea (minimal)', quantity: '10–15 kg/acre ONLY if nodules absent or pale', method: 'Broadcast before rain', purpose: 'Supplemental N only when Rhizobium nodulation fails' },
      { stage: 'Micronutrient Foliar', daysAfterSowing: 'Day 40–45 (flowering)', fertilizer: 'Boron + Molybdenum', quantity: '100g Boron + 25g Sodium Molybdate per 100L', method: 'Foliar spray at flowering', purpose: 'Boron for pod set. Molybdenum activates nitrogen fixation enzymes.' },
    ],
    phases: [
      { phase: 'Sowing', days: 'Day 1–5', emoji: '🟡', description: 'Sow at onset of monsoon when soil moisture is adequate. Rhizobium inoculation is mandatory.', activities: ['Treat seed with Rhizobium + PSB inoculant', 'Treat with fungicide Thiram 3g/kg for seed rot prevention', 'Sow 3–4cm deep in rows 45cm apart', 'Sow when soil temperature >20°C', 'Apply DAP 50 kg + Potash 25 kg + Sulphur 8 kg/acre as basal'], watchFor: ['Poor germination → seed quality or soil temperature too low', 'Bird damage → cover seeds with light soil press', 'Surface crust → lightly break with rotavator after rain'] },
      { phase: 'Vegetative Growth', days: 'Day 10–45', emoji: '🌿', description: 'Leaf area develops. Root nodules form (nitrogen fixation begins). Weed control critical.', activities: ['Check nodule formation at day 25 — healthy nodules are pink inside', 'Weed with Imazethapyr 750mL/acre at day 20–25', 'Spray Quinalphos 2mL/L for stem fly if detected', 'No nitrogen fertilizer needed if nodules are healthy'], watchFor: ['White/pale nodules → Rhizobium failure, apply 15 kg Urea', 'Stem fly damage (dead hearts) → spray Quinalphos', 'Mosaic virus (yellow mottling) → aphid transmitted, spray Dimethoate'] },
      { phase: 'Flowering & Pod Set', days: 'Day 45–75', emoji: '🌸', description: 'Flowers appear. Pod setting determines final yield. Critical irrigation period.', activities: ['Spray Boron + Molybdenum foliar at early flowering', 'Irrigate if rainfall gap >15 days at flowering or pod fill', 'Monitor for girdle beetle and pod borer', 'Spray Chlorantraniliprole 0.4mL/L for pod borer if detected', 'Avoid waterlogging — drain any standing water'], watchFor: ['Flower drop → temperature stress or insufficient moisture', 'Pod borer damage → spray Emamectin Benzoate', 'Girdle beetle (stem cut by girdling) → spray Chlorpyrifos 2mL/L'] },
      { phase: 'Pod Filling & Harvest', days: 'Day 75–110', emoji: '🟡', description: 'Seeds swell inside pods. 95% pods yellow = ready to harvest.', activities: ['Final irrigation if dry at pod filling stage', 'Stop all chemical inputs 21 days before harvest', 'Harvest at 95% pod yellowing, moisture 15–18%', 'Thresh immediately — field losses high in soybean', 'Dry to 12% moisture before bagging'], watchFor: ['Premature yellowing → stem blight or drought — check carefully', 'Pod shatter → overripe, harvest immediately on seeing 95% yellow', 'Leaf retention → potassium deficiency, harvest anyway'] },
    ],
    pestsAndDiseases: [
      { name: 'Girdle Beetle (Obereopsis brevis)', type: 'pest', symptoms: 'Circular girdle cut on stem. Stem withers above cut. Visible grub inside stem on cutting.', control: 'Spray Chlorpyrifos 20 EC (2mL/L) or Quinalphos 25 EC. Cut and remove girdled stems.', medicine: 'Chlorpyrifos 20% EC', timing: 'Monitor from day 25. Spray when girdling observed.' },
      { name: 'Yellow Mosaic Virus', type: 'disease', symptoms: 'Yellow and green mottled pattern on leaves. Leaves distorted. Plants stunted. Spread by whitefly.', control: 'Remove and destroy infected plants immediately. Control whitefly with Imidacloprid. No chemical cure.', medicine: 'Imidacloprid (for vector control)', timing: 'No cure — prevention by vector control from day 1.' },
    ],
    harvestIndicators: ['95% pods yellow-brown', 'Seeds rattle inside dry pods', 'Grain moisture 15–18%', 'Most leaves fallen or yellow', 'Stem dried at base'],
    postHarvest: ['Thresh within 1 day of harvesting', 'Dry to 12% moisture', 'Clean and grade', 'Store in gunny bags in dry ventilated shed', 'Sell at APMC or to oil mills', 'MSP procurement available'],
    yieldPerAcre: '6–12 quintals',
    marketPrice: '₹3,800 – ₹5,500 per quintal (MSP ₹4,892 in 2024)',
    profitPerAcre: '₹10,000 – ₹30,000 per season',
    governmentSchemes: ['MSP support (₹4,892/quintal 2024)', 'PMFBY insurance', 'Soybean seed subsidy', 'PM Kisan Nidhi'],
    proTips: ['Rhizobium inoculation saves full nitrogen cost — most important tip', 'Sow within first 2 weeks of monsoon for best yield', 'JS-335 variety works across most soybean regions', 'Rotate with wheat (Rabi) — soybean leaves nitrogen for next crop', 'MSP procurement ensures floor price — register at your PACS'],
    doNots: ['Don\'t skip Rhizobium inoculation — it saves ₹3,000–4,000/acre in N fertilizer', 'Don\'t delay harvest beyond 95% pod yellowing — pod shatter causes 15–20% loss', 'Don\'t waterlog field at any stage', 'Don\'t apply excess N — plant becomes leafy, fewer pods', 'Don\'t store above 12% moisture — heating and mold damage'],
  },
};

export const ALL_CROPS = Object.values(CROP_DATABASE);
export const CROP_CATEGORIES = [...new Set(ALL_CROPS.map(c => c.category))];

export function searchCrops(query: string): CropData[] {
  const q = query.toLowerCase();
  return ALL_CROPS.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.localName.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.seasons.some(s => s.toLowerCase().includes(q))
  );
}
