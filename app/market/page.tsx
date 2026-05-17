'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BottomNav from '../BottomNav';
import { MARKETPLACE_PRODUCTS, PRODUCT_CATEGORIES, filterProducts, type Product } from '@/lib/marketplaceData';

const SORT_OPTIONS = ['Relevance','Price: Low to High','Price: High to Low','Rating','Discount'];
const PRICE_RANGES = ['Any Price','Under ₹500','₹500–₹2,000','₹2,000–₹10,000','₹10,000+'];
const MARKET_PRICES = [
  { name:'Tomato',emoji:'🍅',price:2450,change:4.2,changeDir:'up',decision:'hold',note:'Hold 5 days — rising 12%'},
  { name:'Onion',emoji:'🧅',price:3200,change:5.8,changeDir:'up',decision:'sell',note:'Peak this week — sell now'},
  { name:'Wheat',emoji:'🌾',price:2300,change:-3.1,changeDir:'down',decision:'wait',note:'Declining — wait for MSP'},
  { name:'Cotton',emoji:'☁️',price:6800,change:2.1,changeDir:'up',decision:'hold',note:'Steady rise — hold more'},
  { name:'Soybean',emoji:'🟡',price:4100,change:-1.8,changeDir:'down',decision:'sell',note:'Further decline expected'},
  { name:'Rice',emoji:'🍚',price:2183,change:0.5,changeDir:'up',decision:'sell',note:'MSP open — sell via FCI'},
  { name:'Potato',emoji:'🥔',price:1200,change:-2.3,changeDir:'down',decision:'hold',note:'Cold store 3 months for 2x'},
];

function MarketContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<'prices'|'products'|'cart'>(
    (searchParams.get('tab') as any) || 'prices'
  );
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [cropFilter, setCropFilter] = useState(searchParams.get('crop') || '');
  const [sortBy, setSortBy] = useState('Relevance');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [products, setProducts] = useState<Product[]>(MARKETPLACE_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);
  const [cart, setCart] = useState<{product:Product;qty:number}[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('kisanai_user');
    if (!u) { router.push('/'); return; }
    const saved = localStorage.getItem('kisanai_cart_v2');
    if (saved) setCart(JSON.parse(saved));
    const wl = localStorage.getItem('kisanai_wishlist');
    if (wl) setWishlist(new Set(JSON.parse(wl)));
  }, []);

  useEffect(() => {
    let f = filterProducts(category, cropFilter||undefined, search||undefined);
    if (priceRange==='Under ₹500') f=f.filter(p=>p.price<500);
    else if (priceRange==='₹500–₹2,000') f=f.filter(p=>p.price>=500&&p.price<=2000);
    else if (priceRange==='₹2,000–₹10,000') f=f.filter(p=>p.price>2000&&p.price<=10000);
    else if (priceRange==='₹10,000+') f=f.filter(p=>p.price>10000);
    if (sortBy==='Price: Low to High') f=[...f].sort((a,b)=>a.price-b.price);
    else if (sortBy==='Price: High to Low') f=[...f].sort((a,b)=>b.price-a.price);
    else if (sortBy==='Rating') f=[...f].sort((a,b)=>b.rating-a.rating);
    else if (sortBy==='Discount') f=[...f].sort((a,b)=>b.discount-a.discount);
    setProducts(f);
  }, [category, search, cropFilter, sortBy, priceRange]);

  const saveCart = (c: typeof cart) => { setCart(c); localStorage.setItem('kisanai_cart_v2', JSON.stringify(c)); };

  const addToCart = (product: Product) => {
    const ex = cart.find(c=>c.product.id===product.id);
    const newCart = ex
      ? cart.map(c=>c.product.id===product.id ? {...c,qty:c.qty+1} : c)
      : [...cart,{product,qty:1}];
    saveCart(newCart);
    showToast('✅ '+product.name+' added to cart');
  };

  const removeFromCart = (id:string) => saveCart(cart.filter(c=>c.product.id!==id));

  const toggleWishlist = (id:string) => {
    const n = new Set(wishlist);
    n.has(id) ? n.delete(id) : n.add(id);
    setWishlist(n);
    localStorage.setItem('kisanai_wishlist', JSON.stringify([...n]));
  };

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(''),2500); };

  const cartTotal = cart.reduce((s,c)=>s+c.product.price*c.qty,0);
  const cartCount = cart.reduce((s,c)=>s+c.qty,0);
  const savings = cart.reduce((s,c)=>s+(c.product.mrp-c.product.price)*c.qty,0);

  // ---- PRODUCT DETAIL VIEW ----
  if (selectedProduct) {
    const inCart = cart.find(c=>c.product.id===selectedProduct.id);
    return (
      <div className="app-shell">
        <div className="screen">
          <div style={{background:'var(--gray-100)',padding:'52px 20px 20px',minHeight:180,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
            <button onClick={()=>setSelectedProduct(null)} style={{position:'absolute',top:52,left:16,background:'white',border:'none',borderRadius:20,padding:'6px 14px',fontWeight:600,cursor:'pointer',fontSize:13,boxShadow:'0 2px 8px rgba(0,0,0,.1)'}}>← Back</button>
            <button onClick={()=>toggleWishlist(selectedProduct.id)} style={{position:'absolute',top:52,right:16,background:'white',border:'none',borderRadius:20,padding:'6px 14px',cursor:'pointer',fontSize:18,boxShadow:'0 2px 8px rgba(0,0,0,.1)'}}>
              {wishlist.has(selectedProduct.id)?'❤️':'🤍'}
            </button>
            <div style={{fontSize:80}}>{selectedProduct.images[0]}</div>
          </div>
          <div className="page-body">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:18,fontWeight:800}}>{selectedProduct.name}</div>
                <div style={{fontSize:13,color:'var(--gray-400)',marginTop:2}}>{selectedProduct.brand}</div>
              </div>
              {selectedProduct.tag && <span className="badge badge-success">{selectedProduct.tag}</span>}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <div style={{fontSize:26,fontWeight:800}}>₹{selectedProduct.price.toLocaleString()}</div>
              <div style={{fontSize:15,color:'var(--gray-400)',textDecoration:'line-through'}}>₹{selectedProduct.mrp.toLocaleString()}</div>
              <span className="badge badge-success">{selectedProduct.discount}% OFF</span>
            </div>
            <div style={{fontSize:12,color:'var(--gray-400)',marginBottom:4}}>📦 {selectedProduct.unit} · ⭐ {selectedProduct.rating} ({selectedProduct.reviews} reviews)</div>
            <div style={{fontSize:12,color:selectedProduct.fastDelivery?'var(--green)':'var(--gray-400)',marginBottom:16}}>
              {selectedProduct.fastDelivery?'⚡ Fast delivery':'🚚 3–5 day delivery'}
              {selectedProduct.sellerDistance&&` · 📍 Seller ${selectedProduct.sellerDistance} away`}
            </div>
            <div style={{fontSize:13,color:'var(--gray-700)',lineHeight:1.7,marginBottom:14}}>{selectedProduct.description}</div>
            <div className="section-header"><span className="section-title">✅ Benefits</span></div>
            <div className="card" style={{marginBottom:12}}>
              {selectedProduct.benefits.map((b,i)=>(
                <div key={i} style={{display:'flex',gap:10,padding:'9px 0',borderBottom:i<selectedProduct.benefits.length-1?'1px solid var(--gray-100)':'none'}}>
                  <span style={{color:'var(--green)',fontWeight:800}}>✓</span>
                  <span style={{fontSize:13,color:'var(--gray-700)'}}>{b}</span>
                </div>
              ))}
            </div>
            {selectedProduct.dosage && (
              <>
                <div className="section-header"><span className="section-title">⚖️ Dosage & Usage</span></div>
                <div className="card" style={{marginBottom:12}}>
                  <div style={{fontSize:12,color:'var(--gray-500)',marginBottom:4}}>Dosage</div>
                  <div style={{fontSize:13,fontWeight:700,color:'var(--green)',marginBottom:10}}>{selectedProduct.dosage}</div>
                  <div style={{fontSize:12,color:'var(--gray-500)',marginBottom:4}}>How to use</div>
                  <div style={{fontSize:13,color:'var(--gray-700)',lineHeight:1.6}}>{selectedProduct.usage}</div>
                </div>
              </>
            )}
            <div className="section-header"><span className="section-title">🌾 Suitable crops</span></div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
              {selectedProduct.suitableFor.map(c=>(
                <span key={c} className="badge badge-success">{c}</span>
              ))}
            </div>
            {selectedProduct.certified && (
              <div className="alert alert-success" style={{marginBottom:16}}>
                <span className="alert-icon">🏅</span>
                <span style={{fontSize:13,fontWeight:600,color:'#166534'}}>{selectedProduct.certified}</span>
              </div>
            )}
            <div style={{display:'flex',gap:10,paddingBottom:8}}>
              <button className="btn btn-outline" style={{flex:1}} onClick={()=>toggleWishlist(selectedProduct.id)}>
                {wishlist.has(selectedProduct.id)?'❤️ Saved':'🤍 Save'}
              </button>
              <button className="btn btn-primary" style={{flex:2}} onClick={()=>addToCart(selectedProduct)}>
                {inCart?`✓ In Cart (${inCart.qty})  +1`:'🛒 Add to Cart'}
              </button>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ---- MAIN MARKET VIEW ----
  return (
    <div className="app-shell">
      {toast&&(
        <div style={{position:'fixed',top:60,left:'50%',transform:'translateX(-50%)',background:'var(--gray-900)',color:'white',borderRadius:20,padding:'10px 20px',fontSize:13,fontWeight:600,zIndex:300,whiteSpace:'nowrap'}}>
          {toast}
        </div>
      )}
      <div className="screen">
        <div className="page-header">
          <div className="header-content">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:20,fontWeight:800,color:'white'}}>🏪 KisanAI Market</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.65)',marginTop:2}}>Prices · Shop · Cart</div>
              </div>
              {cartCount>0&&(
                <button onClick={()=>setTab('cart')} style={{background:'rgba(255,255,255,.2)',border:'none',borderRadius:20,padding:'8px 14px',color:'white',cursor:'pointer',fontSize:13,fontWeight:700}}>
                  🛒 {cartCount} · ₹{cartTotal.toLocaleString()}
                </button>
              )}
            </div>
            <div style={{display:'flex',gap:6,marginTop:14}}>
              {[['prices','💰 Prices'],['products','🛒 Shop'],['cart',`🧺 Cart${cartCount>0?` (${cartCount})`:''}` ]].map(([v,l])=>(
                <button key={v} onClick={()=>setTab(v as any)} style={{flex:1,padding:'9px',borderRadius:8,border:'none',fontWeight:700,fontSize:12,cursor:'pointer',background:tab===v?'rgba(255,255,255,.25)':'rgba(255,255,255,.1)',color:'white'}}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-body">

          {/* ====== PRICES ====== */}
          {tab==='prices'&&(
            <>
              <div className="alert alert-success">
                <span className="alert-icon">🤖</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:'#166534'}}>AI Market Insight</div>
                  <div style={{fontSize:12,color:'#166534',marginTop:2}}>Sell Onion & Rice now. Hold Tomato 5 days. Store Potato 3 months for 2x price.</div>
                </div>
              </div>
              <div className="card" style={{padding:'0 16px'}}>
                {MARKET_PRICES.map((p,i)=>(
                  <div key={p.name} style={{display:'flex',alignItems:'center',padding:'14px 0',borderBottom:i<MARKET_PRICES.length-1?'1px solid var(--gray-100)':'none'}}>
                    <div style={{fontSize:26,marginRight:12,flexShrink:0}}>{p.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700}}>{p.name}</div>
                      <div style={{fontSize:11,color:'var(--gray-400)',marginTop:2}}>{p.note}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:17,fontWeight:800,color:p.changeDir==='up'?'var(--green)':'var(--red)'}}>
                        ₹{p.price.toLocaleString()} {p.changeDir==='up'?'▲':'▼'}
                      </div>
                      <div style={{fontSize:11,color:p.changeDir==='up'?'var(--green)':'var(--red)',fontWeight:600}}>
                        {p.changeDir==='up'?'+':''}{p.change}% this week
                      </div>
                      <span className={`badge ${p.decision==='sell'?'badge-success':p.decision==='hold'?'badge-warning':'badge-danger'}`} style={{fontSize:10,marginTop:4}}>
                        {p.decision==='sell'?'✅ Sell Now':p.decision==='hold'?'⏳ Hold':'⛔ Wait'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:'var(--gray-400)',textAlign:'center',marginTop:8}}>
                📍 Nashik / Pune APMC · Data updated hourly
              </div>
            </>
          )}

          {/* ====== PRODUCTS SHOP ====== */}
          {tab==='products'&&(
            <>
              <div style={{display:'flex',gap:8,marginBottom:10}}>
                <div className="input-wrap" style={{flex:1}}>
                  <span>🔍</span>
                  <input placeholder="Search seeds, fertilizers, tools..." value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
                <button onClick={()=>setShowFilters(!showFilters)} style={{background:showFilters?'var(--green)':'var(--gray-100)',border:'none',borderRadius:10,padding:'0 14px',fontSize:18,cursor:'pointer',color:showFilters?'white':'var(--gray-600)'}}>⚙️</button>
              </div>

              {showFilters&&(
                <div className="card" style={{marginBottom:10}}>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>Sort by</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
                    {SORT_OPTIONS.map(s=>(
                      <button key={s} onClick={()=>setSortBy(s)} style={{padding:'5px 10px',borderRadius:20,border:'none',fontSize:11,fontWeight:600,cursor:'pointer',background:sortBy===s?'var(--green)':'var(--gray-100)',color:sortBy===s?'white':'var(--gray-600)'}}>{s}</button>
                    ))}
                  </div>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>Price</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    {PRICE_RANGES.map(r=>(
                      <button key={r} onClick={()=>setPriceRange(r)} style={{padding:'5px 10px',borderRadius:20,border:'none',fontSize:11,fontWeight:600,cursor:'pointer',background:priceRange===r?'var(--green)':'var(--gray-100)',color:priceRange===r?'white':'var(--gray-600)'}}>{r}</button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4,marginBottom:10}}>
                {PRODUCT_CATEGORIES.map(c=>(
                  <button key={c} onClick={()=>setCategory(c)} style={{padding:'7px 14px',borderRadius:20,border:'none',fontWeight:600,fontSize:12,cursor:'pointer',background:category===c?'var(--green)':'var(--gray-100)',color:category===c?'white':'var(--gray-600)',flexShrink:0}}>{c}</button>
                ))}
              </div>

              {cropFilter&&(
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                  <span style={{fontSize:12,color:'var(--gray-500)'}}>For: <strong>{cropFilter}</strong></span>
                  <button onClick={()=>setCropFilter('')} style={{background:'var(--gray-100)',border:'none',borderRadius:10,padding:'3px 8px',fontSize:11,cursor:'pointer'}}>✕ Clear</button>
                </div>
              )}

              <div style={{fontSize:12,color:'var(--gray-400)',marginBottom:10}}>{products.length} products</div>

              {products.map(p=>(
                <div key={p.id} className="card" style={{marginBottom:10}}>
                  <div style={{display:'flex',gap:12,cursor:'pointer'}} onClick={()=>setSelectedProduct(p)}>
                    <div style={{width:64,height:64,background:'var(--gray-50)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0}}>
                      {p.images[0]}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                        <div style={{fontSize:13,fontWeight:700,lineHeight:1.3,flex:1,paddingRight:4}}>{p.name}</div>
                        <button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}} style={{background:'transparent',border:'none',fontSize:16,cursor:'pointer',flexShrink:0}}>
                          {wishlist.has(p.id)?'❤️':'🤍'}
                        </button>
                      </div>
                      <div style={{fontSize:11,color:'var(--gray-400)',marginTop:1}}>{p.brand} · ⭐{p.rating} ({p.reviews})</div>
                      {p.tag&&<span className="badge badge-success" style={{fontSize:10,marginTop:4,display:'inline-flex'}}>{p.tag}</span>}
                      <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
                        <span style={{fontSize:16,fontWeight:800}}>₹{p.price.toLocaleString()}</span>
                        <span style={{fontSize:11,color:'var(--gray-400)',textDecoration:'line-through'}}>₹{p.mrp.toLocaleString()}</span>
                        <span style={{fontSize:11,color:'var(--green)',fontWeight:700}}>{p.discount}% off</span>
                      </div>
                      <div style={{fontSize:11,color:'var(--gray-400)'}}>{p.unit}{p.fastDelivery?' · ⚡ Fast delivery':''}</div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:10}}>
                    <button className="btn btn-outline btn-sm" style={{flex:1}} onClick={()=>setSelectedProduct(p)}>View Details</button>
                    <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>addToCart(p)}>
                      {cart.find(c=>c.product.id===p.id)?'✓ Added':'🛒 Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ====== CART ====== */}
          {tab==='cart'&&(
            <>
              {cart.length===0?(
                <div style={{textAlign:'center',padding:'60px 20px'}}>
                  <div style={{fontSize:60,marginBottom:16}}>🛒</div>
                  <div style={{fontSize:18,fontWeight:700,color:'var(--gray-700)',marginBottom:8}}>Cart is empty</div>
                  <div style={{fontSize:13,color:'var(--gray-400)',marginBottom:20}}>Browse seeds, fertilizers, and tools</div>
                  <button className="btn btn-primary" onClick={()=>setTab('products')}>Browse Products →</button>
                </div>
              ):(
                <>
                  {cart.map(({product,qty})=>(
                    <div key={product.id} className="card card-sm" style={{marginBottom:10}}>
                      <div style={{display:'flex',gap:12,alignItems:'center'}}>
                        <div style={{fontSize:28}}>{product.images[0]}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700}}>{product.name}</div>
                          <div style={{fontSize:11,color:'var(--gray-400)'}}>{product.unit}</div>
                          <div style={{fontSize:15,fontWeight:800,color:'var(--green)',marginTop:4}}>₹{(product.price*qty).toLocaleString()}</div>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                          <div style={{display:'flex',alignItems:'center',gap:8,background:'var(--gray-100)',borderRadius:8,padding:'4px 10px'}}>
                            <button onClick={()=>qty>1?saveCart(cart.map(c=>c.product.id===product.id?{...c,qty:c.qty-1}:c)):removeFromCart(product.id)} style={{background:'transparent',border:'none',fontWeight:800,cursor:'pointer',fontSize:18,color:'var(--gray-700)'}}>−</button>
                            <span style={{fontWeight:700,minWidth:18,textAlign:'center'}}>{qty}</span>
                            <button onClick={()=>saveCart(cart.map(c=>c.product.id===product.id?{...c,qty:c.qty+1}:c))} style={{background:'transparent',border:'none',fontWeight:800,cursor:'pointer',fontSize:18,color:'var(--gray-700)'}}>+</button>
                          </div>
                          <button onClick={()=>removeFromCart(product.id)} style={{background:'transparent',border:'none',color:'var(--red)',fontSize:11,cursor:'pointer',fontWeight:600}}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="card" style={{marginBottom:12}}>
                    {[
                      {label:`Subtotal (${cartCount} items)`,value:`₹${cartTotal.toLocaleString()}`},
                      {label:'You save',value:`₹${savings.toLocaleString()}`,green:true},
                      {label:'Delivery',value:'Free'},
                    ].map(r=>(
                      <div key={r.label} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid var(--gray-100)'}}>
                        <span style={{fontSize:13,color:'var(--gray-500)'}}>{r.label}</span>
                        <span style={{fontSize:13,fontWeight:700,color:r.green?'var(--green)':'var(--gray-900)'}}>{r.value}</span>
                      </div>
                    ))}
                    <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0'}}>
                      <span style={{fontSize:16,fontWeight:800}}>Total</span>
                      <span style={{fontSize:16,fontWeight:800,color:'var(--green)'}}>₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="alert alert-info" style={{marginBottom:12}}>
                    <span className="alert-icon">💳</span>
                    <div style={{fontSize:12,color:'#1d4ed8'}}>Connect Razorpay or PayTM gateway to enable live payments. See README for steps.</div>
                  </div>

                  <button className="btn btn-primary btn-full" onClick={()=>{showToast('✅ Order placed! Connect payment gateway for live orders.');saveCart([]);}}>
                    Place Order — ₹{cartTotal.toLocaleString()}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default function MarketPage() {
  return (
    <Suspense fallback={<div style={{padding:40,textAlign:'center'}}>Loading...</div>}>
      <MarketContent />
    </Suspense>
  );
}
