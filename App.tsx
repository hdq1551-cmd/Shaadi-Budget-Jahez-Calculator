
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  PartyPopper, ShoppingBag, Users, PiggyBank, Trophy, 
  ArrowRight, AlertCircle, RotateCcw, User, Palette, 
  Sparkles, Heart, X, Check, Camera, Image as ImageIcon, Calendar, Clock, Layout, 
  CheckSquare, Truck, BadgeDollarSign, ShieldCheck
} from 'lucide-react';
import { AppState, EventExpense, JahezItem, AppTheme, UserProfile, BackgroundStyle, ChecklistItem, Vendor } from './types.ts';
import { INITIAL_EVENTS, INITIAL_JAHEZ, INITIAL_CHECKLIST, INITIAL_VENDORS } from './constants.ts';
import BudgetCalculator from './components/BudgetCalculator.tsx';
import JahezCalculator from './components/JahezCalculator.tsx';
import GuestChecker from './components/GuestChecker.tsx';
import SavingsPlanner from './components/SavingsPlanner.tsx';
import ComparisonMode from './components/ComparisonMode.tsx';
import ResultsScreen from './components/ResultsScreen.tsx';
import ChecklistManager from './components/ChecklistManager.tsx';
import VendorManager from './components/VendorManager.tsx';

const STORAGE_KEY = 'shaadi_planner_v17_nobrand';

const THEME_COLORS: Record<AppTheme, { p: string, pl: string, a: string, bg: string }> = {
  maroon: { p: '#720e0e', pl: '#a52a2a', a: '#c5a059', bg: '#fdfaf6' },
  emerald: { p: '#064e3b', pl: '#065f46', a: '#fbbf24', bg: '#f0fdf4' },
  midnight: { p: '#1e3a8a', pl: '#1e40af', a: '#38bdf8', bg: '#f0f9ff' },
  rose: { p: '#881337', pl: '#9f1239', a: '#fda4af', bg: '#fff1f2' },
  saffron: { p: '#c2410c', pl: '#ea580c', a: '#fbbf24', bg: '#fff7ed' },
  turquoise: { p: '#0f766e', pl: '#0d9488', a: '#2dd4bf', bg: '#f0fdfa' },
  indigo: { p: '#312e81', pl: '#3730a3', a: '#818cf8', bg: '#eef2ff' },
  violet: { p: '#4c1d95', pl: '#5b21b6', a: '#a78bfa', bg: '#f5f3ff' },
  teal: { p: '#134e4a', pl: '#115e59', a: '#5eead4', bg: '#f0fdfa' },
  sunset: { p: '#9a3412', pl: '#c2410c', a: '#fb923c', bg: '#fffaf0' },
  gulabi: { p: '#9d174d', pl: '#be185d', a: '#fbcfe8', bg: '#fdf2f8' },
  zaitoon: { p: '#3f6212', pl: '#4d7c0f', a: '#d9f99d', bg: '#f7fee7' },
  shahi: { p: '#581c87', pl: '#7e22ce', a: '#e9d5ff', bg: '#faf5ff' },
  badami: { p: '#713f12', pl: '#854d0e', a: '#fde68a', bg: '#fefce8' },
  aasmani: { p: '#0369a1', pl: '#0284c7', a: '#bae6fd', bg: '#f0f9ff' }
};

const BACKGROUND_PATTERNS: Record<BackgroundStyle, string> = {
  mandala: "url('https://www.transparenttextures.com/patterns/p6.png')",
  floral: "url('https://www.transparenttextures.com/patterns/vintage-speckle.png')",
  glitter: "url('https://www.transparenttextures.com/patterns/stardust.png')",
  minimal: "none",
  geometric: "url('https://www.transparenttextures.com/patterns/cubes.png')"
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'budget' | 'jahez' | 'guests' | 'savings' | 'compare' | 'results' | 'checklist' | 'vendors'>('budget');
  const [showSettings, setShowSettings] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.events) return parsed;
      } catch (e) { console.error(e); }
    }
    return {
      events: INITIAL_EVENTS,
      jahezCategories: INITIAL_JAHEZ,
      checklist: INITIAL_CHECKLIST,
      vendors: INITIAL_VENDORS,
      goldTola: 0,
      goldPricePerTola: 245000,
      cashGift: 0,
      guestAnalysis: { family: 50, friends: 40, relatives: 100, pressure: 50 },
      savingsPlan: { monthsRemaining: 12, currentSavings: 0 },
      profile: { userName: 'Dulha', partnerName: 'Dulhan', weddingDate: '' },
      theme: 'maroon',
      backgroundStyle: 'mandala'
    };
  });

  useEffect(() => {
    const colors = THEME_COLORS[state.theme] || THEME_COLORS.maroon;
    document.documentElement.style.setProperty('--primary', colors.p);
    document.documentElement.style.setProperty('--primary-light', colors.pl);
    document.documentElement.style.setProperty('--accent', colors.a);
    document.documentElement.style.setProperty('--bg', colors.bg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [state]);

  const totals = useMemo(() => {
    let shaadiTotal = 0;
    (Object.values(state.events) as EventExpense[]).forEach((e) => {
      if (e.isSelected) {
        shaadiTotal += (Number(e.guests || 0) * Number(e.perPlate || 0)) + 
                       Number(e.decoration || 0) + Number(e.photographer || 0) + Number(e.other || 0);
      }
    });
    let jahezTotal = (Number(state.cashGift) || 0) + ((Number(state.goldTola) || 0) * (Number(state.goldPricePerTola) || 0));
    state.jahezCategories.forEach(cat => {
      cat.items.forEach(item => { if (item.isSelected) jahezTotal += (Number(item.price) || 0); });
    });
    const grandTotal = shaadiTotal + jahezTotal;
    const remainingToSave = Math.max(0, grandTotal - (Number(state.savingsPlan.currentSavings) || 0));
    const monthlySaving = state.savingsPlan.monthsRemaining > 0 ? remainingToSave / state.savingsPlan.monthsRemaining : 0;
    return { shaadiTotal, jahezTotal, grandTotal, monthlySaving, remainingToSave };
  }, [state]);

  const NavItem = ({ id, icon: Icon, label, urdu }: { id: any, icon: any, label: string, urdu: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 relative py-2 ${
        activeTab === id ? 'text-[--primary] scale-110' : 'text-gray-400 opacity-60 hover:opacity-100'
      }`}
    >
      <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
        activeTab === id ? 'bg-[--primary] text-white shadow-[0_10px_20px_-5px_var(--primary)] -translate-y-2' : 'bg-transparent'
      }`}>
        <Icon size={20} />
      </div>
      <span className={`text-[7px] font-black uppercase mt-1 tracking-tighter transition-all ${
        activeTab === id ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
      }`}>{label}</span>
      <span className="text-[6px] opacity-30 font-bold">{urdu}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden shadow-2xl bg-[--bg]">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]" style={{ backgroundImage: BACKGROUND_PATTERNS[state.backgroundStyle] }} />

      <header className="desi-gradient px-6 py-6 text-white shadow-xl flex justify-between items-center z-50 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
        
        <div className="flex items-center gap-4 relative z-10 flex-1 min-w-0">
          <div onClick={() => setShowSettings(true)} className="flex-shrink-0 w-13 h-13 bg-white/20 rounded-2xl border-2 border-white/40 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden transition-all active:scale-95 group">
            {state.profile.profileImage ? (
              <img src={state.profile.profileImage} className="w-full h-full object-cover" alt="Couple" />
            ) : (
              <User size={24} className="text-white/70 group-hover:scale-110 transition-transform" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold playfair italic leading-tight break-words">
                {state.profile.userName || 'Dulha'} & {state.profile.partnerName || 'Dulhan'}
              </h1>
              <div className="flex-shrink-0 p-1 bg-white/20 rounded-md">
                <ShieldCheck size={10} className="text-[--accent]" />
              </div>
            </div>
            <p className="text-[7px] font-black uppercase tracking-[0.2em] text-[--accent] opacity-80 mt-1">Auto-Saved: {lastSaved}</p>
          </div>
        </div>
        <div className="flex gap-2 relative z-10 ml-2">
          <button onClick={() => setShowSettings(true)} className="p-2.5 bg-white/10 rounded-2xl hover:bg-white/20 border border-white/20 transition-all active:scale-90">
             <Palette size={18} />
          </button>
          <button onClick={() => setActiveTab('checklist')} className={`p-2.5 rounded-2xl border transition-all active:scale-90 ${
            activeTab === 'checklist' ? 'bg-[--accent] text-[--primary] border-[--accent]' : 'bg-white/10 text-white border-white/20'
          }`}>
            <CheckSquare size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        <div className="p-6 pb-56">
          {activeTab === 'budget' && (
            <BudgetCalculator 
              events={state.events} 
              onUpdate={e => setState(p => ({...p, events: {...p.events, [e.id]: e}}))} 
              onDelete={id => {const n={...state.events}; delete n[id]; setState(p=>({...p, events:n}))}} 
              onAdd={name => { const id=`ev_${Date.now()}`; setState(p=>({...p, events:{...p.events, [id]:{id, name:name||'New Event', isSelected:true, guests:100, perPlate:1200, decoration:30000, photographer:20000, other:5000, isRemovable:true, icon: 'PartyPopper' }}})); }} 
              total={totals.shaadiTotal} 
            />
          )}
          {activeTab === 'jahez' && (
            <JahezCalculator 
              categories={state.jahezCategories} 
              goldTola={state.goldTola} 
              goldPrice={state.goldPricePerTola} 
              cash={state.cashGift} 
              shaadiTotal={totals.shaadiTotal} 
              onUpdateItem={(cId, iId, u) => setState(p=>({...p, jahezCategories: p.jahezCategories.map(c=>c.id===cId?{...c, items:c.items.map(i=>i.id===iId?{...i,...u}:i)}:c)}))} 
              onAddItem={cId => { const n=prompt("Item name?"); if(n) setState(p=>({...p, jahezCategories: p.jahezCategories.map(c=>c.id===cId?{...c, items:[...c.items, {id:`j_${Date.now()}`, name:n, nameUrdu:n, price:15000, isSelected:true}]}:c)})) }} 
              onUpdateFinancials={(g, p, c) => setState(prev => ({ ...prev, goldTola: g, goldPricePerTola: p, cashGift: c }))} 
            />
          )}
          {activeTab === 'guests' && <GuestChecker analysis={state.guestAnalysis} onUpdate={a => setState(p=>({...p, guestAnalysis: a}))} avgPlateCost={1500} />}
          {activeTab === 'savings' && <SavingsPlanner plan={state.savingsPlan} totalNeeded={totals.grandTotal} onUpdate={plan => setState(p=>({...p, savingsPlan: plan}))} monthlySaving={totals.monthlySaving} />}
          {activeTab === 'checklist' && <ChecklistManager items={state.checklist} onUpdate={items => setState(p => ({...p, checklist: items}))} />}
          {activeTab === 'vendors' && <VendorManager vendors={state.vendors} onUpdate={vendors => setState(p => ({...p, vendors}))} />}
          {activeTab === 'compare' && <ComparisonMode currentTotal={totals.grandTotal} />}
          {activeTab === 'results' && <ResultsScreen totals={totals} state={state} />}
        </div>
      </main>

      <div className="absolute bottom-6 left-5 right-5 z-[80]">
        <div className="glass-dock px-3 py-3 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex justify-between items-center relative border border-white/60">
          <NavItem id="budget" icon={PartyPopper} label="Budget" urdu="Event" />
          <NavItem id="jahez" icon={ShoppingBag} label="Jahez" urdu="Items" />
          <div className="relative -mt-14 px-2 flex flex-col items-center">
            <button 
              onClick={() => setActiveTab('results')} 
              className={`w-18 h-18 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-90 border-4 border-white ${
                activeTab === 'results' ? 'desi-gradient scale-110' : 'bg-black'
              }`}
            >
              <Sparkles size={32} />
            </button>
            <span className={`text-[8px] font-black uppercase mt-2 tracking-widest ${activeTab === 'results' ? 'text-[--primary]' : 'text-gray-400 opacity-50'}`}>Summary</span>
          </div>
          <NavItem id="guests" icon={Users} label="Guests" urdu="Crowd" />
          <NavItem id="savings" icon={PiggyBank} label="Saving" urdu="Bank" />
        </div>
      </div>

      {showSettings && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-end">
          <div className="w-full bg-white rounded-t-[4rem] p-10 space-y-8 animate-in slide-in-from-bottom-20 duration-500 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-6">
              <h2 className="text-2xl font-black playfair italic text-[--primary]">Customization</h2>
              <button onClick={() => setShowSettings(false)} className="p-3 bg-gray-100 rounded-2xl text-gray-400 transition-all active:scale-90"><X size={24} /></button>
            </div>
            
            <div className="space-y-8">
               <div className="flex flex-col items-center gap-4">
                 <div onClick={() => fileInputRef.current?.click()} className="w-32 h-32 rounded-[3rem] border-4 border-[--accent] overflow-hidden flex items-center justify-center bg-gray-50 cursor-pointer shadow-xl relative group">
                    {state.profile.profileImage ? (
                      <img src={state.profile.profileImage} className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={40} className="text-gray-300" />
                    )}
                 </div>
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                   const file = e.target.files?.[0];
                   if (file) {
                     const reader = new FileReader();
                     reader.onloadend = () => setState(p => ({...p, profile: {...p.profile, profileImage: reader.result as string}}));
                     reader.readAsDataURL(file);
                   }
                 }} />
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.25em]">Couple Display Photo</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Your Name</label>
                   <input value={state.profile.userName} onChange={e => setState(p => ({...p, profile: {...p.profile, userName: e.target.value}}))} placeholder="Dulha" className="w-full p-5 bg-gray-50 rounded-[1.5rem] text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[--primary]/10" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Partner Name</label>
                   <input value={state.profile.partnerName} onChange={e => setState(p => ({...p, profile: {...p.profile, partnerName: e.target.value}}))} placeholder="Dulhan" className="w-full p-5 bg-gray-50 rounded-[1.5rem] text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[--primary]/10" />
                 </div>
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-gray-400 ml-1 flex items-center gap-2">
                   <Palette size={14} /> Shaadi Theme
                 </label>
                 <div className="grid grid-cols-5 gap-3">
                   {Object.keys(THEME_COLORS).map(t => (
                     <button 
                       key={t} 
                       onClick={() => setState(p => ({...p, theme: t as AppTheme}))} 
                       className={`h-11 rounded-xl border-2 transition-all flex items-center justify-center shadow-md active:scale-90 ${
                         state.theme === t ? 'border-black scale-110' : 'border-transparent opacity-60'
                       }`} 
                       style={{ backgroundColor: THEME_COLORS[t as AppTheme].p }} 
                     >
                       {state.theme === t && <Check size={14} className="text-white" />}
                     </button>
                   ))}
                 </div>
               </div>
            </div>
            
            <button onClick={() => setShowSettings(false)} className="w-full bg-[--primary] text-white py-6 rounded-[2.5rem] font-black text-xs shadow-xl active:scale-95 transition-all">
              Save & Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
