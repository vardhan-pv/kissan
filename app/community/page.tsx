'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../BottomNav';

/* ─── types ─── */
interface Post {
  id: number; author: string; location: string; avatar: string;
  timeAgo: string; type: 'tip'|'question'|'success'|'alert';
  content: string; likes: number; comments: Comment[];
  tags: string[]; group: string; image?: string;
}
interface Comment { id: number; author: string; avatar: string; text: string; timeAgo: string; }
interface Group { id: string; name: string; emoji: string; members: number; description: string; joined: boolean; }
interface Message { id: number; author: string; avatar: string; text: string; time: string; mine: boolean; }

/* ─── static data ─── */
const GROUPS: Group[] = [
  { id:'tomato', name:'Tomato Farmers', emoji:'🍅', members:4821, description:'Tips, disease alerts, and market prices for tomato growers across Maharashtra.', joined:true },
  { id:'onion',  name:'Onion Growers',  emoji:'🧅', members:6234, description:'Nashik and Pune onion farmers — market intel, storage tips, export news.', joined:true },
  { id:'wheat',  name:'Wheat & Rabi',   emoji:'🌾', members:3102, description:'Rabi crop discussion — wheat, mustard, gram across North India.', joined:false },
  { id:'organic',name:'Organic Farmers',emoji:'🌿', members:1845, description:'Natural and organic farming — no chemicals, best practices, certification.', joined:false },
  { id:'cotton', name:'Cotton Belt',    emoji:'☁️', members:5012, description:'Vidarbha and Gujarat cotton farmers — market prices, pest alerts.', joined:false },
  { id:'market', name:'Market Watch',   emoji:'📊', members:9341, description:'Daily APMC price updates across Maharashtra, UP, MP, Andhra.', joined:true },
  { id:'water',  name:'Water & Irrigation',emoji:'💧', members:2234, description:'Drip, sprinkler, groundwater — best irrigation practices.', joined:false },
  { id:'govt',   name:'Govt Schemes',   emoji:'🏛️', members:7890, description:'PM Kisan, PMFBY, subsidies, loan info — share and ask.', joined:false },
];

const INITIAL_POSTS: Post[] = [
  {
    id:1, author:'Suresh Kumar', location:'Pune, Maharashtra', avatar:'👨‍🌾',
    timeAgo:'2h ago', type:'tip', group:'tomato',
    content:'Applied neem oil mixed with liquid soap (5ml neem + 2ml soap per litre) for whitefly on tomato — worked in 3 days! 🌿 Much cheaper than chemical spray. Repeat every 7 days.',
    likes:47, comments:[
      {id:1,author:'Lata Devi',avatar:'👩‍🌾',text:'Thank you! Will try this on my crop tomorrow.',timeAgo:'1h ago'},
      {id:2,author:'Ramesh Patil',avatar:'👨‍🌾',text:'Does it also work for aphids?',timeAgo:'45m ago'},
    ],
    tags:['whitefly','neem','organic','tomato'],
  },
  {
    id:2, author:'Lata Devi', location:'Nashik, Maharashtra', avatar:'👩‍🌾',
    timeAgo:'5h ago', type:'question', group:'onion',
    content:'My onion leaves are turning yellow from the tips. Started 3 days ago. Is this purple blotch or nitrogen deficiency? I applied Urea 2 weeks ago. Please help! 🙏',
    likes:12, comments:[
      {id:3,author:'Dr. Vikram (KVK)',avatar:'👨‍🔬',text:'Looks like purple blotch. Check for elongated orange spots with yellow border. Spray Mancozeb 2g/L immediately.',timeAgo:'4h ago'},
      {id:4,author:'Suresh Kumar',avatar:'👨‍🌾',text:'I had same issue last season. Mancozeb spray fixed it in 5 days.',timeAgo:'3h ago'},
    ],
    tags:['onion','yellow leaves','disease','help'],
  },
  {
    id:3, author:'Rajesh Patil', location:'Satara, Maharashtra', avatar:'👨‍🌾',
    timeAgo:'1d ago', type:'success', group:'market',
    content:'🎉 Got ₹3,800/quintal for onion at Pune APMC — highest price in 3 years! Held stock for 2 weeks based on market advice. Season profit ₹1.2 lakhs on 5 acres. Never selling in a hurry again!',
    likes:234, comments:[
      {id:5,author:'Meena Bai',avatar:'👩‍🌾',text:'Congratulations! Which variety did you grow?',timeAgo:'20h ago'},
      {id:6,author:'Rajesh Patil',avatar:'👨‍🌾',text:'Bhima Raj — Rabi crop, planted October.',timeAgo:'19h ago'},
    ],
    tags:['onion','market','success','profit'],
  },
  {
    id:4, author:'KVK Alert 🚨', location:'Agricultural Extension', avatar:'🏛️',
    timeAgo:'6h ago', type:'alert', group:'tomato',
    content:'⚠️ PEST ALERT — Brown planthopper (BPH) outbreak reported in Nashik and Ahmednagar tomato areas. Spray Profenofos 2mL/L or Buprofezin 2mL/L immediately if you see hopping insects on leaves. Share this with your village farmers!',
    likes:189, comments:[
      {id:7,author:'Anita Jadhav',avatar:'👩‍🌾',text:'Seen this on my farm! Spraying today.',timeAgo:'5h ago'},
    ],
    tags:['alert','pest','BPH','tomato','nashik'],
  },
  {
    id:5, author:'Meena Bai', location:'Ahmednagar, Maharashtra', avatar:'👩‍🌾',
    timeAgo:'2d ago', type:'tip', group:'organic',
    content:'🌿 Organic tip: Mix 200g asafoetida (hing) in 10L water, strain and spray. Keeps aphids and many sucking pests away without any chemicals. Works for 10–12 days. Completely safe for bees! 🐝',
    likes:98, comments:[
      {id:8,author:'Suresh Kumar',avatar:'👨‍🌾',text:'Never heard of this! Where do you buy food-grade hing for spraying?',timeAgo:'1d ago'},
    ],
    tags:['organic','hing','aphids','natural'],
  },
  {
    id:6, author:'Arun Desai', location:'Solapur, Maharashtra', avatar:'👨‍🌾',
    timeAgo:'3d ago', type:'success', group:'market',
    content:'💰 Drip irrigation + mulching combined — saved 45% water this season and tomato yield went from 14 tonnes to 19 tonnes per acre! Government gave 80% subsidy on drip under NHM scheme. Apply at your district agriculture office TODAY.',
    likes:312, comments:[
      {id:9,author:'Lata Devi',avatar:'👩‍🌾',text:'How to apply for NHM drip subsidy? What documents needed?',timeAgo:'2d ago'},
      {id:10,author:'Arun Desai',avatar:'👨‍🌾',text:'7/12, Aadhar, bank passbook. Visit Taluka Agriculture Office. They will visit your farm and approve within 30 days.',timeAgo:'2d ago'},
    ],
    tags:['drip','subsidy','NHM','irrigation'],
  },
];

const GROUP_MESSAGES: Record<string, Message[]> = {
  tomato: [
    {id:1,author:'Suresh Kumar',avatar:'👨‍🌾',text:'Good morning all! Tomato price at Nashik APMC today ₹2,450/quintal. Holding for 5 more days.',time:'9:02 AM',mine:false},
    {id:2,author:'Lata Devi',avatar:'👩‍🌾',text:'Has anyone tried NS-538 hybrid this season? How is yield?',time:'9:15 AM',mine:false},
    {id:3,author:'You',avatar:'👤',text:'NS-538 gave me 20 tonnes/acre last year. Very good results!',time:'9:18 AM',mine:true},
    {id:4,author:'Ramesh Patil',avatar:'👨‍🌾',text:'⚠️ Fruit borer attack seen in my field near Pune. Using Emamectin 0.5g/L. Anyone else?',time:'9:32 AM',mine:false},
  ],
  onion: [
    {id:1,author:'KVK Nashik',avatar:'🏛️',text:'Rabi onion prices expected to peak in next 7–10 days. Farmers near Nashik — hold stock if possible.',time:'8:00 AM',mine:false},
    {id:2,author:'Rajesh Patil',avatar:'👨‍🌾',text:'Pune APMC rate today ₹3,200. Should I sell tomorrow?',time:'8:45 AM',mine:false},
    {id:3,author:'You',avatar:'👤',text:'Check trend — it was ₹3,150 yesterday. Still going up. Maybe wait 2 more days.',time:'8:48 AM',mine:true},
  ],
  market: [
    {id:1,author:'Market Bot',avatar:'🤖',text:'📊 Today prices: Tomato ₹2,450 ▲ | Onion ₹3,200 ▲ | Wheat ₹2,300 ▼ | Cotton ₹6,800 ▲',time:'7:00 AM',mine:false},
    {id:2,author:'Arun Desai',avatar:'👨‍🌾',text:'Pomegranate hitting ₹8,500 at Solapur! Festival demand.',time:'8:12 AM',mine:false},
    {id:3,author:'You',avatar:'👤',text:'When is the next APMC auction at Nashik for onion?',time:'8:20 AM',mine:true},
    {id:4,author:'Arun Desai',avatar:'👨‍🌾',text:'Every Tuesday and Friday morning. Bring quality certificate for premium price.',time:'8:25 AM',mine:false},
  ],
};

const TYPE_COLORS: Record<string,string> = { tip:'var(--green)', question:'#3b82f6', success:'#eab308', alert:'#ef4444' };
const TYPE_LABELS: Record<string,string> = { tip:'💡 Tip', question:'❓ Question', success:'🎉 Success', alert:'🚨 Alert' };

export default function CommunityPage() {
  const router = useRouter();
  const [view, setView] = useState<'feed'|'groups'|'chat'>('feed');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [groups, setGroups] = useState<Group[]>(GROUPS);
  const [filter, setFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [user, setUser] = useState<any>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [expandedPost, setExpandedPost] = useState<number|null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newPost, setNewPost] = useState({ content:'', type:'tip', group:'tomato' });
  const [activeGroup, setActiveGroup] = useState<Group|null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [commentInput, setCommentInput] = useState<Record<number,string>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages]);

  const openGroupChat = (group: Group) => {
    setActiveGroup(group);
    setMessages(GROUP_MESSAGES[group.id] || []);
    setView('chat');
  };

  const sendMessage = () => {
    if (!chatInput.trim() || !activeGroup) return;
    const msg: Message = {
      id: Date.now(), author:'You', avatar:'👤',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
      mine: true,
    };
    setMessages(m => [...m, msg]);
    setChatInput('');
    // Simulate reply after 2s
    setTimeout(() => {
      const replies = [
        'Great point! Thanks for sharing.',
        'I had a similar experience last season.',
        'Which variety are you growing?',
        'Check with your local KVK for more guidance.',
        'Has anyone else tried this method?',
      ];
      const reply: Message = {
        id: Date.now()+1, author:'Farmer Member', avatar:'👨‍🌾',
        text: replies[Math.floor(Math.random()*replies.length)],
        time: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
        mine: false,
      };
      setMessages(m => [...m, reply]);
    }, 1800);
  };

  const toggleLike = (id:number) => {
    const n = new Set(liked);
    n.has(id) ? n.delete(id) : n.add(id);
    setLiked(n);
  };

  const joinGroup = (id:string) => {
    setGroups(g => g.map(gr => gr.id===id ? {...gr,joined:!gr.joined,members:gr.joined?gr.members-1:gr.members+1} : gr));
  };

  const submitPost = () => {
    if (!newPost.content.trim()) return;
    const post: Post = {
      id: Date.now(), author: user?.name||'Farmer', location: user?.location||'Maharashtra',
      avatar:'👤', timeAgo:'Just now', type: newPost.type as any,
      content: newPost.content, likes:0, comments:[], tags:[], group: newPost.group,
    };
    setPosts(p => [post, ...p]);
    setShowNew(false);
    setNewPost({ content:'', type:'tip', group:'tomato' });
  };

  const addComment = (postId:number) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;
    const comment: Comment = {
      id: Date.now(), author: user?.name||'You', avatar:'👤', text, timeAgo:'Just now',
    };
    setPosts(ps => ps.map(p => p.id===postId ? {...p, comments:[...p.comments,comment]} : p));
    setCommentInput(c => ({...c,[postId]:''}));
  };

  const filteredPosts = posts.filter(p => {
    const typeOk = filter==='all' || p.type===filter;
    const groupOk = groupFilter==='all' || p.group===groupFilter;
    return typeOk && groupOk;
  });

  // ── CHAT VIEW ──
  if (view==='chat' && activeGroup) {
    return (
      <div className="app-shell">
        <div style={{display:'flex',flexDirection:'column',height:'100dvh'}}>
          {/* Chat header */}
          <div style={{background:'var(--green)',padding:'48px 16px 14px',display:'flex',alignItems:'center',gap:12}}>
            <button onClick={()=>setView('groups')} style={{background:'rgba(255,255,255,.2)',border:'none',borderRadius:20,padding:'6px 12px',color:'white',cursor:'pointer',fontSize:13}}>←</button>
            <div style={{fontSize:24}}>{activeGroup.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:800,color:'white'}}>{activeGroup.name}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.7)'}}>{activeGroup.members.toLocaleString()} members</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:'auto',padding:'12px 16px',background:'#f0fdf4',display:'flex',flexDirection:'column',gap:8}}>
            {messages.map(msg => (
              <div key={msg.id} style={{display:'flex',justifyContent:msg.mine?'flex-end':'flex-start',gap:8}}>
                {!msg.mine && <div style={{fontSize:22,flexShrink:0,alignSelf:'flex-end'}}>{msg.avatar}</div>}
                <div style={{maxWidth:'75%'}}>
                  {!msg.mine && <div style={{fontSize:11,color:'var(--gray-400)',marginBottom:2,fontWeight:600}}>{msg.author}</div>}
                  <div style={{background:msg.mine?'var(--green)':'white',color:msg.mine?'white':'var(--gray-900)',borderRadius:msg.mine?'16px 16px 4px 16px':'16px 16px 16px 4px',padding:'10px 14px',fontSize:13,lineHeight:1.5,boxShadow:'0 1px 4px rgba(0,0,0,.08)'}}>
                    {msg.text}
                  </div>
                  <div style={{fontSize:10,color:'var(--gray-400)',marginTop:3,textAlign:msg.mine?'right':'left'}}>{msg.time}</div>
                </div>
                {msg.mine && <div style={{fontSize:22,flexShrink:0,alignSelf:'flex-end'}}>👤</div>}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div style={{background:'white',borderTop:'1px solid var(--gray-200)',padding:'10px 16px',paddingBottom:'calc(10px + env(safe-area-inset-bottom))',display:'flex',gap:10}}>
            <input
              value={chatInput}
              onChange={e=>setChatInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&sendMessage()}
              placeholder="Type a message..."
              style={{flex:1,border:'1.5px solid var(--gray-200)',borderRadius:20,padding:'10px 16px',fontSize:14,outline:'none',fontFamily:'inherit'}}
            />
            <button onClick={sendMessage} style={{background:'var(--green)',border:'none',borderRadius:50,width:44,height:44,color:'white',fontSize:18,cursor:'pointer',flexShrink:0}}>➤</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:20,fontWeight:800,color:'white'}}>👥 Community</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.65)',marginTop:2}}>Connect · Learn · Grow together</div>
              </div>
              <button onClick={()=>setShowNew(true)} style={{background:'#84cc16',border:'none',borderRadius:20,padding:'8px 16px',color:'#1a2e05',fontWeight:800,fontSize:13,cursor:'pointer'}}>+ Post</button>
            </div>

            {/* View switcher */}
            <div style={{display:'flex',gap:6,marginTop:14}}>
              {[['feed','📰 Feed'],['groups','👥 Groups']].map(([v,l])=>(
                <button key={v} onClick={()=>setView(v as any)} style={{flex:1,padding:'9px',borderRadius:8,border:'none',fontWeight:700,fontSize:13,cursor:'pointer',background:view===v?'rgba(255,255,255,.25)':'rgba(255,255,255,.1)',color:'white'}}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">

          {/* ──── FEED ──── */}
          {view==='feed'&&(
            <>
              {/* Type filter */}
              <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4,marginBottom:8}}>
                {[['all','All'],['tip','💡 Tips'],['question','❓ Questions'],['success','🎉 Success'],['alert','🚨 Alerts']].map(([v,l])=>(
                  <button key={v} onClick={()=>setFilter(v)} style={{padding:'7px 14px',borderRadius:20,border:'none',fontWeight:600,fontSize:12,cursor:'pointer',background:filter===v?'var(--green)':'var(--gray-100)',color:filter===v?'white':'var(--gray-600)',flexShrink:0}}>{l}</button>
                ))}
              </div>

              {/* Group filter */}
              <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4,marginBottom:12}}>
                <button onClick={()=>setGroupFilter('all')} style={{padding:'5px 12px',borderRadius:20,border:'none',fontSize:11,fontWeight:600,cursor:'pointer',background:groupFilter==='all'?'var(--gray-700)':'var(--gray-100)',color:groupFilter==='all'?'white':'var(--gray-500)',flexShrink:0}}>All groups</button>
                {groups.filter(g=>g.joined).map(g=>(
                  <button key={g.id} onClick={()=>setGroupFilter(g.id)} style={{padding:'5px 12px',borderRadius:20,border:'none',fontSize:11,fontWeight:600,cursor:'pointer',background:groupFilter===g.id?'var(--gray-700)':'var(--gray-100)',color:groupFilter===g.id?'white':'var(--gray-500)',flexShrink:0}}>{g.emoji} {g.name}</button>
                ))}
              </div>

              {filteredPosts.map(post=>{
                const isExpanded = expandedPost===post.id;
                return (
                  <div key={post.id} style={{background:'white',borderRadius:16,padding:16,marginBottom:10,boxShadow:'0 2px 8px rgba(0,0,0,.07)',borderLeft:`4px solid ${TYPE_COLORS[post.type]}`}}>
                    {/* Author row */}
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                      <div style={{width:38,height:38,borderRadius:'50%',background:'var(--green-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{post.avatar}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:700}}>{post.author}</div>
                        <div style={{fontSize:11,color:'var(--gray-400)'}}>📍 {post.location} · {post.timeAgo}</div>
                      </div>
                      <div>
                        <span style={{background:TYPE_COLORS[post.type]+'22',color:TYPE_COLORS[post.type],borderRadius:20,padding:'4px 10px',fontSize:11,fontWeight:700}}>{TYPE_LABELS[post.type]}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{fontSize:14,color:'var(--gray-800)',lineHeight:1.7,marginBottom:10}}>{post.content}</div>

                    {/* Tags */}
                    {post.tags.length>0&&(
                      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                        {post.tags.map(t=><span key={t} style={{background:'var(--gray-100)',borderRadius:20,padding:'3px 9px',fontSize:11,color:'var(--gray-500)',fontWeight:600}}>#{t}</span>)}
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <button onClick={()=>toggleLike(post.id)} style={{display:'flex',alignItems:'center',gap:5,background:liked.has(post.id)?'#dcfce7':'var(--gray-100)',border:'none',borderRadius:8,padding:'7px 12px',fontSize:13,fontWeight:600,cursor:'pointer',color:liked.has(post.id)?'var(--green)':'var(--gray-600)'}}>
                        👍 {post.likes+(liked.has(post.id)?1:0)}
                      </button>
                      <button onClick={()=>setExpandedPost(isExpanded?null:post.id)} style={{display:'flex',alignItems:'center',gap:5,background:'var(--gray-100)',border:'none',borderRadius:8,padding:'7px 12px',fontSize:13,fontWeight:600,cursor:'pointer',color:'var(--gray-600)'}}>
                        💬 {post.comments.length}
                      </button>
                      <button onClick={()=>router.push('/advisor')} style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:5,background:'#dcfce7',border:'none',borderRadius:8,padding:'7px 12px',fontSize:13,fontWeight:700,cursor:'pointer',color:'var(--green)'}}>
                        🤖 Ask AI →
                      </button>
                    </div>

                    {/* Comments */}
                    {isExpanded&&(
                      <div style={{marginTop:12,borderTop:'1px solid var(--gray-100)',paddingTop:12}}>
                        {post.comments.map(c=>(
                          <div key={c.id} style={{display:'flex',gap:8,marginBottom:10}}>
                            <div style={{fontSize:18,flexShrink:0}}>{c.avatar}</div>
                            <div style={{background:'var(--gray-50)',borderRadius:12,padding:'8px 12px',flex:1}}>
                              <div style={{fontSize:12,fontWeight:700,color:'var(--gray-900)'}}>{c.author} <span style={{fontSize:10,color:'var(--gray-400)',fontWeight:400}}>· {c.timeAgo}</span></div>
                              <div style={{fontSize:13,color:'var(--gray-700)',marginTop:2,lineHeight:1.5}}>{c.text}</div>
                            </div>
                          </div>
                        ))}
                        <div style={{display:'flex',gap:8,marginTop:8}}>
                          <input
                            value={commentInput[post.id]||''}
                            onChange={e=>setCommentInput(c=>({...c,[post.id]:e.target.value}))}
                            onKeyDown={e=>e.key==='Enter'&&addComment(post.id)}
                            placeholder="Write a comment..."
                            style={{flex:1,border:'1.5px solid var(--gray-200)',borderRadius:20,padding:'9px 14px',fontSize:13,outline:'none',fontFamily:'inherit'}}
                          />
                          <button onClick={()=>addComment(post.id)} style={{background:'var(--green)',border:'none',borderRadius:50,width:40,height:40,color:'white',fontSize:16,cursor:'pointer',flexShrink:0}}>➤</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* ──── GROUPS ──── */}
          {view==='groups'&&(
            <>
              <div style={{fontSize:13,color:'var(--gray-500)',marginBottom:12}}>
                Join groups to get crop-specific tips, pest alerts, and market news
              </div>

              <div style={{fontSize:14,fontWeight:700,color:'var(--gray-700)',marginBottom:8}}>✅ Your Groups</div>
              {groups.filter(g=>g.joined).map(g=>(
                <div key={g.id} style={{background:'white',borderRadius:16,padding:14,marginBottom:10,boxShadow:'0 2px 8px rgba(0,0,0,.07)',border:'1px solid #bbf7d0'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{fontSize:34,flexShrink:0}}>{g.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:800}}>{g.name}</div>
                      <div style={{fontSize:12,color:'var(--gray-400)',marginTop:1}}>{g.members.toLocaleString()} members</div>
                      <div style={{fontSize:12,color:'var(--gray-500)',marginTop:3,lineHeight:1.4}}>{g.description}</div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:12}}>
                    <button onClick={()=>openGroupChat(g)} className="btn btn-primary btn-sm" style={{flex:2}}>💬 Open Chat</button>
                    <button onClick={()=>joinGroup(g.id)} className="btn btn-outline btn-sm" style={{flex:1}}>Leave</button>
                  </div>
                </div>
              ))}

              <div style={{fontSize:14,fontWeight:700,color:'var(--gray-700)',margin:'16px 0 8px'}}>🔍 Discover Groups</div>
              {groups.filter(g=>!g.joined).map(g=>(
                <div key={g.id} style={{background:'white',borderRadius:16,padding:14,marginBottom:10,boxShadow:'0 2px 8px rgba(0,0,0,.07)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{fontSize:34,flexShrink:0}}>{g.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:800}}>{g.name}</div>
                      <div style={{fontSize:12,color:'var(--gray-400)',marginTop:1}}>{g.members.toLocaleString()} members</div>
                      <div style={{fontSize:12,color:'var(--gray-500)',marginTop:3,lineHeight:1.4}}>{g.description}</div>
                    </div>
                  </div>
                  <button onClick={()=>joinGroup(g.id)} className="btn btn-primary btn-sm" style={{marginTop:12,width:'100%'}}>+ Join Group</button>
                </div>
              ))}
            </>
          )}

        </div>
      </div>

      {/* New Post Modal */}
      {showNew&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:200,display:'flex',alignItems:'flex-end'}}>
          <div style={{background:'white',borderRadius:'20px 20px 0 0',width:'100%',padding:20,maxHeight:'80vh',overflow:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
              <div style={{fontSize:18,fontWeight:800}}>Share with Farmers</div>
              <button onClick={()=>setShowNew(false)} style={{background:'transparent',border:'none',fontSize:22,cursor:'pointer'}}>✕</button>
            </div>

            <div style={{marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:700,color:'var(--gray-600)',marginBottom:6}}>Post type</div>
              <div style={{display:'flex',gap:6}}>
                {[['tip','💡 Tip'],['question','❓ Question'],['success','🎉 Success']].map(([v,l])=>(
                  <button key={v} onClick={()=>setNewPost(p=>({...p,type:v}))} style={{flex:1,padding:'8px',borderRadius:8,border:'none',fontWeight:700,fontSize:12,cursor:'pointer',background:newPost.type===v?'var(--green)':'var(--gray-100)',color:newPost.type===v?'white':'var(--gray-600)'}}>{l}</button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:700,color:'var(--gray-600)',marginBottom:6}}>Post in group</div>
              <select value={newPost.group} onChange={e=>setNewPost(p=>({...p,group:e.target.value}))} style={{width:'100%',padding:'11px 14px',borderRadius:10,border:'1.5px solid var(--gray-200)',fontSize:14,background:'var(--gray-50)',fontFamily:'inherit'}}>
                {groups.map(g=><option key={g.id} value={g.id}>{g.emoji} {g.name}</option>)}
              </select>
            </div>

            <textarea
              placeholder="Share your tip, question, or success story with fellow farmers..."
              value={newPost.content}
              onChange={e=>setNewPost(p=>({...p,content:e.target.value}))}
              rows={5}
              style={{width:'100%',border:'1.5px solid var(--gray-200)',borderRadius:12,padding:14,fontSize:14,resize:'none',outline:'none',fontFamily:'inherit',lineHeight:1.6}}
            />
            <button className="btn btn-primary btn-full" style={{marginTop:12}} onClick={submitPost}>
              Post to Community
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
