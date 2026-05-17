# 🌱 KisanAI v2.0 — Complete Setup Guide

## What's New in v2.0
All 14 phases fully implemented:
- 🎙️ Voice input/output (Web Speech API)
- 🌍 Multi-language: English, Hindi, Kannada
- 🧠 AI Smart Advisor (Claude-powered)
- 📸 AI Crop Scanner with real image analysis
- 🌦️ Smart weather with farming alerts
- 📊 Market prices with Sell/Hold AI decisions
- 🛒 Smart shopping with cart
- 📋 Farm tracker (crops, expenses, profit)
- 👥 Farmer community forum
- 🔔 Reminders & smart notifications
- 🎮 Gamification (XP, levels, badges)
- 📶 Offline mode (localStorage cache)
- 📍 Location-based personalization
- 🔐 Supabase auth + full RLS

---

## Quick Start

### 1. Install dependencies
```bash
cd kisanai-v2
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env.local` and fill in:

```env
# Required — Supabase (free tier works)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Optional — enables real weather data
OPENWEATHER_API_KEY=your_key_from_openweathermap.org

# Optional — enables real AI advisor + crop scan
ANTHROPIC_API_KEY=sk-ant-...
```

> **Without API keys:** The app works fully with mock data.  
> Click "Try Demo" on the login screen — no account needed.

### 3. Set up Supabase database
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste `supabase_schema.sql` → Run
3. Copy your URL and anon key into `.env.local`

### 4. Run the app
```bash
npm run dev
# Open http://localhost:3000
```

---

## Getting Free API Keys

### OpenWeather (weather data)
1. Sign up at https://openweathermap.org/api
2. Go to API Keys → copy your key
3. Free tier: 1,000 calls/day — enough for production

### Anthropic (AI Advisor + Crop Scanner)
1. Sign up at https://console.anthropic.com
2. Create an API key
3. Free trial credits included

---

## App Structure

```
app/
├── page.tsx              # Login / Register / Demo
├── dashboard/page.tsx    # Home — weather, quick actions, alerts
├── advisor/page.tsx      # AI Smart Advisor
├── scan/page.tsx         # AI Crop Scanner
├── market/page.tsx       # Prices + Shopping
├── weather/page.tsx      # 7-day forecast + alerts
├── community/page.tsx    # Farmer forum
├── farm/page.tsx         # Farm tracker
├── notifications/page.tsx# Reminders
├── profile/page.tsx      # Profile + badges + language
├── api/
│   ├── advisor/route.ts  # AI crop recommendation
│   ├── scan/route.ts     # AI image analysis
│   ├── weather/route.ts  # Weather + farming alerts
│   ├── products/route.ts # Market prices + shop
│   ├── community/route.ts# Forum posts
│   ├── farm-tracker/     # Farm data
│   └── auth/             # Login + register
├── globals.css           # Full design system
├── BottomNav.tsx         # Bottom navigation
└── VoiceButton.tsx       # Voice input component

lib/
├── supabase.ts           # Supabase client
├── i18n.ts               # EN / HI / KN translations
└── cache.ts              # Offline localStorage cache
```

---

## Feature Details

### 🎙️ Voice Commands
Say any of these on the dashboard:
- "Check price" / "Market bhav" → Market page
- "Weather" / "Mausam" → Weather page
- "Scan" / "Disease" / "Bimari" → Crop Scanner
- "Advisor" / "Grow" / "Fasal" → AI Advisor
- "Community" / "Farmer" → Community

Voice output (🔊 button) reads alerts in the selected language.

### 🧠 AI Advisor
- With Anthropic API: Real Claude-powered recommendations
- Without API: Rule-based recommendations by season/location
- Covers: crop selection, full action plan, fertilizer schedule

### 📸 Crop Scanner
- With Anthropic API: Real vision AI analyzes the photo
- Without API: Returns realistic sample diagnoses
- Saves scan history to localStorage
- Directly links to "Buy Medicine" in the shop

### 📶 Offline Mode
Caches weather, prices, and crop data for 3 hours.
Banner appears automatically when offline.

### 🎮 Gamification
- +10 XP on registration
- +20 XP per crop scan
- Badges unlock at milestones
- Level up every 500 XP

---

## Production Deployment

### Deploy to Vercel (recommended — free)
```bash
npm install -g vercel
vercel --prod
```
Add env variables in Vercel dashboard → Settings → Environment Variables.

### Deploy to Netlify
```bash
npm run build
# Upload .next folder to Netlify
```

---

## Adding Telugu Language
In `lib/i18n.ts`, add a `te` block following the same pattern as `hi` and `kn`.  
Then add `te` to the language picker in `app/page.tsx` and `app/profile/page.tsx`.

---

## Connecting Real APMC Prices
Replace the mock data in `app/api/products/route.ts` with calls to:
- **AgMarkNet API** (government): https://agmarknet.gov.in
- **eNAM API**: https://enam.gov.in/web/

---

## Support
- Demo mode: Click "Try Demo" — no account needed
- All pages work with mock data when API keys are missing
- Supabase is only needed for real user accounts and scan history
