export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Seeds' | 'Fertilizer' | 'Pesticide' | 'Tools' | 'Equipment' | 'Organic' | 'Irrigation';
  subcategory: string;
  price: number;
  mrp: number;
  unit: string;
  stock: number;
  rating: number;
  reviews: number;
  seller: string;
  sellerDistance?: string;
  description: string;
  benefits: string[];
  usage: string;
  dosage?: string;
  suitableFor: string[];
  tag?: string;
  certified?: string;
  images: string[];
  inStock: boolean;
  fastDelivery: boolean;
  discount: number;
}

export const MARKETPLACE_PRODUCTS: Product[] = [
  // ===== SEEDS =====
  {
    id: 'seed-001', name: 'Tomato Hybrid Seeds — Arka Rakshak', brand: 'IIHR / Mahyco',
    category: 'Seeds', subcategory: 'Vegetable Seeds',
    price: 550, mrp: 650, unit: '10g packet', stock: 45, rating: 4.9, reviews: 234,
    seller: 'IIHR Certified Dealer, Nashik', sellerDistance: '3km',
    description: 'Triple disease resistant hybrid tomato. Resistant to ToLCV, Early Blight and Bacterial Wilt. Indeterminate, heavy bearer.',
    benefits: ['Yield 18–22 tonnes/acre', 'Disease resistant (ToLCV, EB, BW)', 'Firm fruits — 14 day shelf life', 'Good for fresh market and processing'],
    usage: 'Raise seedlings in cocopeat nursery trays. Transplant at 25 days.',
    dosage: '150–200g seed/acre. 1 packet = 1/15th acre seedling area.',
    suitableFor: ['Tomato'], tag: 'Best Seller', certified: 'IIHR certified',
    images: ['🍅'], inStock: true, fastDelivery: true, discount: 15,
  },
  {
    id: 'seed-002', name: 'Onion Seeds — Bhima Raj', brand: 'DOGR Pune',
    category: 'Seeds', subcategory: 'Vegetable Seeds',
    price: 480, mrp: 550, unit: '500g pack', stock: 28, rating: 4.8, reviews: 189,
    seller: 'DOGR Certified, Nashik', sellerDistance: '5km',
    description: 'Best-selling rabi onion variety from Directorate of Onion & Garlic Research. Large bulbs, dark red, excellent storage.',
    benefits: ['Yield 10–14 tonnes/acre', 'Large uniform bulbs 80–100g', 'Excellent 6-month storage', 'Export quality dark red skin'],
    usage: 'Nursery sowing Sep–Oct for Rabi. Transplant at 40–45 days.',
    dosage: '3–4 kg seed/acre (nursery method).',
    suitableFor: ['Onion'], tag: 'Export Quality', certified: 'DOGR certified',
    images: ['🧅'], inStock: true, fastDelivery: true, discount: 13,
  },
  {
    id: 'seed-003', name: 'Wheat Seeds — HD-2967 (Certified)', brand: 'IARI New Delhi',
    category: 'Seeds', subcategory: 'Cereal Seeds',
    price: 1200, mrp: 1400, unit: '40 kg bag', stock: 120, rating: 4.7, reviews: 456,
    seller: 'Government Seed Depot, Nashik', sellerDistance: '2km',
    description: 'Most widely grown wheat variety in North India. High yield, rust resistant, suitable for irrigated conditions.',
    benefits: ['Yield 18–22 quintals/acre', 'Rust resistant (yellow, brown, stem rust)', 'Protein 12–13%', 'Timely + late sown adaptable'],
    usage: 'Sow Nov 1–15 using seed drill at 22.5cm row spacing.',
    dosage: '40–45 kg/acre (timely sowing). 45–50 kg/acre (late sowing).',
    suitableFor: ['Wheat'], tag: 'Most Popular', certified: 'IARI breeder seed',
    images: ['🌾'], inStock: true, fastDelivery: false, discount: 14,
  },
  {
    id: 'seed-004', name: 'Cotton BG-II Hybrid — Bollgard 2', brand: 'Mahyco Monsanto',
    category: 'Seeds', subcategory: 'Cash Crop Seeds',
    price: 760, mrp: 830, unit: '450g packet (1 acre)', stock: 62, rating: 4.6, reviews: 312,
    seller: 'Agri Store, Aurangabad', sellerDistance: '12km',
    description: 'Bt cotton with dual Cry1Ac + Cry2Ab genes. Built-in bollworm resistance. Reduces pesticide sprays by 70%.',
    benefits: ['Built-in bollworm protection', 'Yield 10–14 quintals/acre kapas', 'Reduces spray cost ₹4,000/acre', '170–185 day maturity'],
    usage: 'Sow April–July. 90×60cm spacing. 2 seeds per hole.',
    dosage: '1 packet per acre (fixed seed rate — no extra).',
    suitableFor: ['Cotton'], tag: 'Pest Resistant', certified: 'Mahyco certified',
    images: ['☁️'], inStock: true, fastDelivery: false, discount: 8,
  },
  {
    id: 'seed-005', name: 'Rice Seeds — Pusa Basmati 1121', brand: 'IARI',
    category: 'Seeds', subcategory: 'Cereal Seeds',
    price: 2400, mrp: 2800, unit: '10 kg bag', stock: 35, rating: 4.8, reviews: 278,
    seller: 'IARI Certified Dealer', sellerDistance: '8km',
    description: 'Premium extra-long grain basmati rice. 3x price premium in market. APEDA registered for export. Matures in 140 days.',
    benefits: ['Extra-long grain 8.0mm+', 'Export price ₹6,000–9,000/quintal', 'Excellent aroma and cooking quality', 'APEDA export registered'],
    usage: 'Raise nursery June–July. Transplant at 25 days at 20×15cm.',
    dosage: '20–25 kg/acre (for transplanted nursery).',
    suitableFor: ['Rice'], tag: 'Premium Price', certified: 'IARI breeder',
    images: ['🍚'], inStock: true, fastDelivery: false, discount: 14,
  },

  // ===== FERTILIZERS =====
  {
    id: 'fert-001', name: 'DAP (Di-Ammonium Phosphate) 18:46:00', brand: 'IFFCO / Coromandel',
    category: 'Fertilizer', subcategory: 'Chemical Fertilizer',
    price: 1350, mrp: 1700, unit: '50 kg bag', stock: 200, rating: 4.7, reviews: 890,
    seller: 'Government Fertilizer Depot', sellerDistance: '1km',
    description: 'India\'s most used phosphatic fertilizer. 18% nitrogen + 46% phosphorus. Subsidy rate available.',
    benefits: ['High phosphorus (46%) for roots', '18% nitrogen for early growth', 'Essential for all crops', 'Government subsidized price'],
    usage: 'Apply as basal dose in furrows or broadcast before sowing/transplanting.',
    dosage: '40–60 kg/acre depending on crop. Mix into soil.',
    suitableFor: ['Tomato', 'Onion', 'Wheat', 'Rice', 'Cotton', 'Potato', 'Soybean'],
    tag: 'Subsidized', certified: 'FCO standard',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 21,
  },
  {
    id: 'fert-002', name: 'Urea (46% Nitrogen)', brand: 'NFL / IFFCO / KRIBHCO',
    category: 'Fertilizer', subcategory: 'Chemical Fertilizer',
    price: 267, mrp: 300, unit: '50 kg bag', stock: 500, rating: 4.6, reviews: 1240,
    seller: 'Government Depot', sellerDistance: '1km',
    description: 'Highest nitrogen fertilizer (46% N). Most economical nitrogen source. Government subsidized price.',
    benefits: ['Highest N content (46%)', 'Quick nitrogen release', 'Government price ₹267/bag', 'Suitable for all crops'],
    usage: 'Top dressing in 2–3 splits. Apply before irrigation or rain.',
    dosage: 'Tomato: 50–75 kg/acre split. Wheat: 85 kg/acre in 2 splits. Rice: 70 kg split.',
    suitableFor: ['Tomato', 'Onion', 'Wheat', 'Rice', 'Cotton', 'Potato'],
    tag: 'Govt Price', certified: 'FCO standard',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 11,
  },
  {
    id: 'fert-003', name: 'NPK 19:19:19 (Water Soluble)', brand: 'Haifa / SQM / Multiplex',
    category: 'Fertilizer', subcategory: 'Water Soluble Fertilizer',
    price: 1450, mrp: 1800, unit: '25 kg bag', stock: 85, rating: 4.8, reviews: 345,
    seller: 'Drip Irrigation Store', sellerDistance: '4km',
    description: 'Completely water soluble balanced NPK for fertigation through drip. Suitable at all growth stages.',
    benefits: ['100% water soluble for fertigation', 'Balanced N-P-K for all stages', 'No blockage in drip emitters', 'Quick plant response'],
    usage: 'Dissolve in water tank and apply through drip. 5–8 kg/acre per week.',
    dosage: '5–8 kg/acre per application via drip or sprinkler.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Potato'],
    tag: 'Fertigation', certified: 'EDTA chelated',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 19,
  },
  {
    id: 'fert-004', name: 'Potash (MOP 0:0:60)', brand: 'IPL / Jordan Potash',
    category: 'Fertilizer', subcategory: 'Chemical Fertilizer',
    price: 1100, mrp: 1350, unit: '50 kg bag', stock: 145, rating: 4.5, reviews: 267,
    seller: 'Krishi Seva Kendra', sellerDistance: '2km',
    description: 'Muriate of Potash — primary potassium fertilizer. Essential for fruit quality, shelf life, and disease resistance.',
    benefits: ['High K2O (60%) for fruit quality', 'Improves sugar content in fruits', 'Strengthens cell walls', 'Increases shelf life of produce'],
    usage: 'Apply as basal + 1–2 top dressings at fruiting stage.',
    dosage: 'Tomato: 25 kg basal + 25 kg at fruiting. Onion: 25+20 kg. Cotton: 25+20 kg.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Potato', 'Rice'],
    tag: 'Quality Boost',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 19,
  },
  {
    id: 'fert-005', name: 'Calcium Nitrate (15.5% Ca + 14.5% N)', brand: 'Haifa Chemicals',
    category: 'Fertilizer', subcategory: 'Water Soluble Fertilizer',
    price: 1650, mrp: 2000, unit: '25 kg bag', stock: 40, rating: 4.9, reviews: 123,
    seller: 'Premium Agro Store', sellerDistance: '6km',
    description: 'Water soluble calcium + nitrogen. Prevents blossom end rot in tomato, tip burn in lettuce, hollow heart in potato.',
    benefits: ['Prevents blossom end rot (tomato)', 'Prevents hollow heart (potato)', 'Improves fruit firmness', 'Water soluble — for fertigation or foliar'],
    usage: 'Foliar: 5 kg in 200L water at fruiting stage. Drip: 3–5 kg/acre weekly.',
    dosage: '5 kg/200L water for foliar. 3–5 kg/week via drip.',
    suitableFor: ['Tomato', 'Potato', 'Cotton'],
    tag: 'Disease Prevention',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 18,
  },
  {
    id: 'fert-006', name: 'Zinc Sulphate (ZnSO4 — 21% Zn)', brand: 'Coromandel / GSFC',
    category: 'Fertilizer', subcategory: 'Micronutrient',
    price: 320, mrp: 400, unit: '5 kg bag', stock: 90, rating: 4.6, reviews: 198,
    seller: 'Agri Input Centre', sellerDistance: '3km',
    description: 'Soil and foliar zinc application. Corrects zinc deficiency (khaira in rice, white bud in corn). Improves enzyme activity.',
    benefits: ['Corrects zinc deficiency', 'Improves grain quality in rice/wheat', 'Boosts enzyme activity', 'Improves root growth'],
    usage: 'Soil: 10 kg/acre at basal. Foliar: 250g in 100L water.',
    dosage: '10 kg/acre soil (once per 2 seasons). 250g/100L water foliar.',
    suitableFor: ['Rice', 'Wheat', 'Tomato', 'Cotton', 'Onion'],
    tag: 'Micronutrient',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 20,
  },
  {
    id: 'fert-007', name: 'Boron 20% (Solubor / Borax)', brand: 'Coromandel / Tata',
    category: 'Fertilizer', subcategory: 'Micronutrient',
    price: 280, mrp: 350, unit: '1 kg pack', stock: 75, rating: 4.7, reviews: 167,
    seller: 'Micro Nutrient Store', sellerDistance: '4km',
    description: 'Water soluble boron for foliar application. Prevents blossom drop in tomato, fruit cracking in pomegranate, hollow stem in cauliflower.',
    benefits: ['Prevents blossom drop (tomato)', 'Prevents fruit cracking (pomegranate)', 'Improves pod set (soybean, cotton)', 'Essential for cell wall formation'],
    usage: 'Foliar spray at flowering. 100g Borax in 100L water.',
    dosage: '100g/100L water at early flower. Repeat once after 15 days.',
    suitableFor: ['Tomato', 'Cotton', 'Soybean', 'Onion'],
    tag: 'Flowering Boost',
    images: ['💊'], inStock: true, fastDelivery: true, discount: 20,
  },
  {
    id: 'fert-008', name: 'Organic FYM Compost (Enriched)', brand: 'Krishi Organic',
    category: 'Organic', subcategory: 'Organic Manure',
    price: 800, mrp: 1000, unit: '50 kg bag', stock: 300, rating: 4.5, reviews: 423,
    seller: 'Organic Farm Depot', sellerDistance: '7km',
    description: 'Fully decomposed enriched FYM with Trichoderma and Azotobacter. Improves soil health, water holding capacity.',
    benefits: ['Improves soil organic matter', 'Contains beneficial microbes', 'Slow release nutrients', 'Safe for all crops — organic farming'],
    usage: '5 tonnes/acre mixed into soil during field preparation.',
    dosage: '5–8 tonnes/acre at soil preparation stage. 2–3 t/acre for top dress.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Wheat', 'Rice', 'Potato'],
    tag: 'Organic', certified: 'India Organic certified',
    images: ['🌿'], inStock: true, fastDelivery: false, discount: 20,
  },

  // ===== PESTICIDES =====
  {
    id: 'pest-001', name: 'Mancozeb 75% WP (Dithane M-45)', brand: 'UPL / Coromandel',
    category: 'Pesticide', subcategory: 'Fungicide',
    price: 340, mrp: 420, unit: '500g pack', stock: 120, rating: 4.6, reviews: 534,
    seller: 'Agro Chemicals, Nashik', sellerDistance: '2km',
    description: 'Broad spectrum protective fungicide. Prevents early blight, late blight, downy mildew, purple blotch.',
    benefits: ['Controls 30+ fungal diseases', 'Preventive and curative action', 'Low cost, widely available', 'Suitable for all vegetables'],
    usage: 'Mix 2g per litre of water. Spray every 7–10 days as preventive.',
    dosage: '2g/litre water. Use 200L spray fluid per acre.',
    suitableFor: ['Tomato', 'Onion', 'Potato', 'Wheat', 'Cotton'],
    tag: 'Broad Spectrum', certified: 'CIB registered',
    images: ['🧪'], inStock: true, fastDelivery: true, discount: 19,
  },
  {
    id: 'pest-002', name: 'Ridomil Gold 68 WG (Metalaxyl-M + Mancozeb)', brand: 'Syngenta',
    category: 'Pesticide', subcategory: 'Fungicide',
    price: 680, mrp: 820, unit: '100g pack', stock: 55, rating: 4.9, reviews: 289,
    seller: 'Agro Store', sellerDistance: '3km',
    description: 'Systemic + contact fungicide for late blight. Emergency treatment for tomato, potato, downy mildew in grapes/onion.',
    benefits: ['Systemic action — moves inside plant', 'Controls late blight within 24h', 'Preventive + curative', 'Safe for beneficial insects'],
    usage: 'Mix 2g per litre water. Spray every 5–7 days during high risk period.',
    dosage: '2g/litre water. 200L spray volume per acre.',
    suitableFor: ['Tomato', 'Potato', 'Onion'],
    tag: 'Emergency Use', certified: 'CIB registered',
    images: ['🧪'], inStock: true, fastDelivery: true, discount: 17,
  },
  {
    id: 'pest-003', name: 'Imidacloprid 17.8% SL (Confidor / Admire)', brand: 'Bayer',
    category: 'Pesticide', subcategory: 'Insecticide',
    price: 420, mrp: 520, unit: '250mL bottle', stock: 90, rating: 4.7, reviews: 412,
    seller: 'Agro Chemicals', sellerDistance: '2km',
    description: 'Systemic neonicotinoid insecticide for sucking pests. Controls whitefly, aphids, jassids, thrips — all tomato sucking pests.',
    benefits: ['Systemic — protects new growth', 'Controls 25+ sucking pests', 'Soil and foliar application', 'Long residual — 14–21 days protection'],
    usage: 'Foliar: 0.5mL/litre water. Soil: 100mL/acre in irrigation water.',
    dosage: '0.5mL/litre water for foliar. 100mL/acre for soil application.',
    suitableFor: ['Tomato', 'Cotton', 'Onion', 'Potato'],
    tag: 'Sucking Pests', certified: 'CIB registered',
    images: ['🧪'], inStock: true, fastDelivery: true, discount: 19,
  },
  {
    id: 'pest-004', name: 'Emamectin Benzoate 5% SG (Proclaim)', brand: 'Syngenta',
    category: 'Pesticide', subcategory: 'Insecticide',
    price: 580, mrp: 720, unit: '100g pack', stock: 45, rating: 4.8, reviews: 234,
    seller: 'Agro Store, Nashik', sellerDistance: '4km',
    description: 'Highly effective for caterpillars/borers — fruit borer, armyworm, diamond back moth. Very low dose required.',
    benefits: ['Controls all borer and caterpillar pests', 'Very low dose (0.5g/litre)', 'Quick knockdown + residual action', 'Reduces pesticide volume by 60%'],
    usage: 'Mix 0.5g per litre water. Spray on affected areas, repeat every 10 days.',
    dosage: '0.5g/litre water. 200L spray volume per acre.',
    suitableFor: ['Tomato', 'Cotton', 'Rice'],
    tag: 'Borer Control', certified: 'CIB registered',
    images: ['🧪'], inStock: true, fastDelivery: true, discount: 19,
  },
  {
    id: 'pest-005', name: 'Neem Oil 1500 PPM (Cold Pressed)', brand: 'Multiplex / Sumeet',
    category: 'Organic', subcategory: 'Bio-Pesticide',
    price: 220, mrp: 280, unit: '1 litre bottle', stock: 130, rating: 4.5, reviews: 345,
    seller: 'Organic Agri Store', sellerDistance: '3km',
    description: 'Cold pressed neem oil with 1500 PPM Azadirachtin. Safe organic pest control for sucking pests and mites.',
    benefits: ['Safe for humans, bees, beneficial insects', 'Controls 200+ pest species', 'Repellent + ovicidal action', 'Can be used up to harvest day'],
    usage: 'Mix 5mL neem oil + 2mL liquid soap per litre. Spray in evening.',
    dosage: '5mL/litre water + 2mL soap emulsifier. Repeat every 5–7 days.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Rice', 'Potato'],
    tag: 'Organic', certified: 'OMRI listed',
    images: ['🧪'], inStock: true, fastDelivery: true, discount: 21,
  },
  {
    id: 'pest-006', name: 'Tricyclazole 75% WP (Beam / Tilt)', brand: 'BASF / Dow',
    category: 'Pesticide', subcategory: 'Fungicide',
    price: 680, mrp: 820, unit: '100g pack', stock: 60, rating: 4.8, reviews: 178,
    seller: 'Agro Chemical Store', sellerDistance: '5km',
    description: 'Systemic fungicide specifically for rice blast disease. Prevents neck blast which can destroy entire panicle.',
    benefits: ['Specific for rice blast (leaf + neck)', 'Systemic protection — 21 days', 'Prevents yield loss up to 50%', 'Use at panicle initiation stage'],
    usage: 'Mix 0.6g per litre water. Spray at PI stage and repeat at heading.',
    dosage: '0.6g/litre water. 200L per acre. 2 sprays per season.',
    suitableFor: ['Rice'],
    tag: 'Rice Blast', certified: 'CIB registered',
    images: ['🧪'], inStock: true, fastDelivery: true, discount: 17,
  },

  // ===== TOOLS =====
  {
    id: 'tool-001', name: 'Knapsack Sprayer — 16L Battery Operated', brand: 'Neptune / Kisankraft',
    category: 'Tools', subcategory: 'Sprayer',
    price: 3200, mrp: 4000, unit: '1 piece', stock: 25, rating: 4.7, reviews: 312,
    seller: 'Agri Equipment Store', sellerDistance: '5km',
    description: 'Battery-powered backpack sprayer with 16L tank. Saves 50% spray time vs manual pump. Rechargeable lithium battery.',
    benefits: ['Battery powered — no pumping effort', '16L tank — covers 1 acre per fill', '4–6 hour battery life', 'Adjustable nozzle: mist to jet'],
    usage: 'Charge 3 hours before use. Fill water+chemical, adjust nozzle, walk at 2km/hr.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Rice', 'Wheat'],
    tag: 'Labour Saving', certified: 'ISI marked',
    images: ['⚙️'], inStock: true, fastDelivery: false, discount: 20,
  },
  {
    id: 'tool-002', name: 'Wheel Hoe (Push Cultivator)', brand: 'Kisankraft / Falcon',
    category: 'Tools', subcategory: 'Cultivation Tool',
    price: 1800, mrp: 2200, unit: '1 piece with 3 attachments', stock: 40, rating: 4.6, reviews: 198,
    seller: 'Farm Tool Centre', sellerDistance: '4km',
    description: 'Manual wheel hoe for inter-row cultivation and weeding. Reduces weeding labor by 60%. 3 interchangeable attachments.',
    benefits: ['Reduces weeding time 60%', '3 attachments: blade, tines, ridger', 'No fuel cost — manual operation', 'Works in all row crops'],
    usage: 'Push between crop rows. Adjust depth with wheel setting. Use blade for weeding, tines for aeration.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Potato'],
    tag: 'Labour Saving',
    images: ['⚙️'], inStock: true, fastDelivery: false, discount: 18,
  },
  {
    id: 'tool-003', name: 'Soil pH and Moisture Tester (Digital)', brand: 'Dr. Meter / HiLET',
    category: 'Tools', subcategory: 'Testing Equipment',
    price: 850, mrp: 1200, unit: '1 piece', stock: 35, rating: 4.4, reviews: 145,
    seller: 'Precision Agri Store', sellerDistance: '6km',
    description: 'Digital soil tester for pH, moisture, and light levels. Know your soil before planting. No battery required.',
    benefits: ['3-in-1: pH + moisture + light', 'No batteries needed', 'Instant reading in 60 seconds', 'Helps plan fertilizer schedule'],
    usage: 'Insert probe 10–15cm into moist soil. Wait 60 seconds for reading.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Rice', 'Wheat', 'Potato'],
    tag: 'Smart Farming',
    images: ['📱'], inStock: true, fastDelivery: true, discount: 29,
  },
  {
    id: 'tool-004', name: 'Pruning Shears / Secateur — Professional', brand: 'Neofly / Visko',
    category: 'Tools', subcategory: 'Harvesting Tool',
    price: 650, mrp: 850, unit: '1 piece', stock: 60, rating: 4.7, reviews: 234,
    seller: 'Farm Tool Store', sellerDistance: '3km',
    description: 'Heavy duty SK-5 steel pruning shears. Sharp bypass action. Ergonomic handle. Essential for tomato and vegetable farming.',
    benefits: ['SK-5 high carbon steel blade', 'Clean cut — prevents disease spread', 'Ergonomic non-slip grip', 'Replaceable spring'],
    usage: 'Disinfect with alcohol between plants. Use for staking, sucker removal, harvesting.',
    suitableFor: ['Tomato', 'Cotton', 'Onion'],
    tag: 'Professional',
    images: ['✂️'], inStock: true, fastDelivery: true, discount: 24,
  },
  {
    id: 'tool-005', name: 'Moisture Meter — Grain & Seed', brand: 'Rean / AgriTech',
    category: 'Tools', subcategory: 'Testing Equipment',
    price: 1200, mrp: 1600, unit: '1 piece', stock: 22, rating: 4.5, reviews: 98,
    seller: 'Precision Agri', sellerDistance: '7km',
    description: 'Digital grain moisture meter for rice, wheat, soybean, corn. Ensures correct harvest timing and storage moisture level.',
    benefits: ['Reads moisture in 5 seconds', 'Works for 12 crop types', 'Prevents storage losses', 'Battery operated, pocket-sized'],
    usage: 'Insert grain sample, press test button. Reading in 5 seconds. Ideal range: 12–14% for wheat, 14% for rice.',
    suitableFor: ['Wheat', 'Rice', 'Soybean'],
    tag: 'Harvest Timing',
    images: ['📱'], inStock: true, fastDelivery: true, discount: 25,
  },

  // ===== IRRIGATION =====
  {
    id: 'irri-001', name: 'Drip Irrigation Kit — 1 Acre Complete', brand: 'Jain Irrigation / Netafim',
    category: 'Irrigation', subcategory: 'Drip System',
    price: 14500, mrp: 18000, unit: '1 acre complete kit', stock: 12, rating: 4.8, reviews: 189,
    seller: 'Jain Irrigation Dealer, Nashik', sellerDistance: '8km',
    description: 'Complete drip irrigation kit for 1 acre. Includes main line, sub-main, laterals, drippers, filter, pressure regulator, and timer.',
    benefits: ['Saves 40–50% water vs flood', 'Increases yield 20–30%', 'Government subsidy 80–90%', 'Reduces fertilizer cost (fertigation)'],
    usage: 'Install main line along field boundary. Lay laterals on each row. Place drippers at plant base. Connect to pump.',
    suitableFor: ['Tomato', 'Onion', 'Cotton', 'Potato'],
    tag: 'Govt Subsidy 90%', certified: 'ISI certified',
    images: ['💧'], inStock: true, fastDelivery: false, discount: 19,
  },
  {
    id: 'irri-002', name: 'Sprinkler System Kit — 1 Acre', brand: 'Netafim / Rain Bird',
    category: 'Irrigation', subcategory: 'Sprinkler',
    price: 8500, mrp: 11000, unit: '1 acre kit', stock: 18, rating: 4.6, reviews: 134,
    seller: 'Irrigation Solutions', sellerDistance: '9km',
    description: 'Impact sprinkler system for wheat, onion, and field crops. Covers 1 acre with 4 sprinkler heads. More uniform coverage than flood.',
    benefits: ['Saves 25% water vs flood', 'Uniform water distribution', 'Suitable for flat fields', 'Government subsidy available'],
    usage: 'Install risers on lateral pipes. Connect to main line and pump. Run 1–2 hours per irrigation cycle.',
    suitableFor: ['Wheat', 'Onion', 'Potato', 'Soybean'],
    tag: 'Govt Subsidy',
    images: ['💧'], inStock: true, fastDelivery: false, discount: 23,
  },

  // ===== EQUIPMENT =====
  {
    id: 'equip-001', name: 'Power Weeder — 2HP Mini Tractor', brand: 'Kisankraft / Honda',
    category: 'Equipment', subcategory: 'Mechanization',
    price: 28000, mrp: 35000, unit: '1 piece', stock: 8, rating: 4.7, reviews: 145,
    seller: 'Farm Machinery Hub', sellerDistance: '12km',
    description: '2HP petrol/diesel power weeder for inter-row cultivation. Replaces 15 manual labourers. Works in all row crops.',
    benefits: ['Replaces 15 manual labourers', 'Fuel cost ₹100/acre vs ₹1,500 labour', '2HP engine, multiple attachments', 'Subsidy available under SMAM scheme'],
    usage: 'Use between crop rows at 45–90cm spacing. Adjust tine depth. 1 acre per hour.',
    suitableFor: ['Tomato', 'Cotton', 'Onion', 'Potato'],
    tag: 'SMAM Subsidy', certified: 'ICAR approved',
    images: ['🚜'], inStock: true, fastDelivery: false, discount: 20,
  },
];

export const PRODUCT_CATEGORIES = ['All', 'Seeds', 'Fertilizer', 'Pesticide', 'Tools', 'Equipment', 'Irrigation', 'Organic'];

export function filterProducts(category: string, cropFilter?: string, searchQuery?: string): Product[] {
  let filtered = MARKETPLACE_PRODUCTS;
  if (category !== 'All') filtered = filtered.filter(p => p.category === category);
  if (cropFilter) filtered = filtered.filter(p => p.suitableFor.includes(cropFilter));
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  return filtered;
}

export function getRecommendedProducts(cropName: string): Product[] {
  return MARKETPLACE_PRODUCTS.filter(p => p.suitableFor.includes(cropName)).slice(0, 6);
}
