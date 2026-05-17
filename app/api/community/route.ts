import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MOCK_POSTS = [
  {
    id: 1,
    author: 'Suresh Kumar',
    location: 'Pune, Maharashtra',
    avatar: '👨‍🌾',
    timeAgo: '2h ago',
    type: 'tip',
    content: 'Applied neem oil mixed with soap water (5ml neem + 2ml soap per litre) for whitefly — worked in 3 days! Much cheaper than chemical spray.',
    likes: 23,
    comments: 5,
    image: null,
    tags: ['whitefly', 'neem', 'organic'],
  },
  {
    id: 2,
    author: 'Lata Devi',
    location: 'Nashik, Maharashtra',
    avatar: '👩‍🌾',
    timeAgo: '5h ago',
    type: 'question',
    content: 'My tomato leaves are turning yellow at the edges. Is it nutrient deficiency or overwatering? Anyone facing same issue? See photo below.',
    likes: 8,
    comments: 12,
    image: null,
    tags: ['tomato', 'yellow leaves', 'help'],
  },
  {
    id: 3,
    author: 'Rajesh Patil',
    location: 'Satara, Maharashtra',
    avatar: '👨‍🌾',
    timeAgo: '1d ago',
    type: 'tip',
    content: 'Drip irrigation saved me 40% water this season on onion crop. Government gives 80% subsidy through PMKSY scheme — apply through your local agriculture office!',
    likes: 67,
    comments: 18,
    image: null,
    tags: ['drip irrigation', 'water saving', 'subsidy'],
  },
  {
    id: 4,
    author: 'Meena Bai',
    location: 'Ahmednagar, Maharashtra',
    avatar: '👩‍🌾',
    timeAgo: '2d ago',
    type: 'success',
    content: 'Got ₹3,800/quintal for onion this week at Pune APMC — highest in 3 years! Held stock for 2 weeks based on KisanAI market advice. Profit ₹95,000 this season! 🎉',
    likes: 142,
    comments: 34,
    image: null,
    tags: ['onion', 'market', 'success story'],
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter') || 'all';

  let posts = MOCK_POSTS;
  if (filter !== 'all') {
    posts = MOCK_POSTS.filter(p => p.type === filter);
  }

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPost = {
      id: Date.now(),
      author: body.author || 'Anonymous Farmer',
      location: body.location || 'Maharashtra',
      avatar: '👨‍🌾',
      timeAgo: 'Just now',
      type: body.type || 'tip',
      content: body.content,
      likes: 0,
      comments: 0,
      image: null,
      tags: body.tags || [],
    };
    
    return NextResponse.json({ success: true, post: newPost });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
