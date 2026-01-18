
import React from 'react';
import { JahezCategory, JahezItem } from '../types';
import { Package, Sparkles, Plus, Check, DollarSign, Gem, AlertCircle, ShoppingBag } from 'lucide-react';

interface Props {
  categories: JahezCategory[];
  goldTola: number;
  goldPrice: number;
  cash: number;
  shaadiTotal: number;
  onUpdateItem: (catId: string, itemId: string, updates: Partial<JahezItem>) => void;
  onUpdateFinancials: (gold: number, price: number, cash: number) => void;
  onAddItem: (catId: string) => void;
}

const JahezCalculator: React.FC<Props> = ({ categories, goldTola, goldPrice, cash, shaadiTotal, onUpdateItem, onUpdateFinancials, onAddItem }) => {
  // Fix: Ensure we don't double count if items are already in raw gold investment
  const jahezItemsTotal = categories.reduce((sum, cat) => 
    sum + cat.items.reduce((cSum, item) => cSum + (item.isSelected ? Number(item.price || 0) : 0), 0)
  , 0);

  const rawInvestmentTotal = (Number(goldTola || 0) * Number(goldPrice || 0)) + Number(cash || 0);
  const jahezTotal = jahezItemsTotal + rawInvestmentTotal;
  
  const jahezPercentage = shaadiTotal > 0 ? (jahezTotal / shaadiTotal) * 100 : 0;

  const handleFinancialChange = (field: 'gold' | 'price' | 'cash', val: string) => {
    const num = val === '' ? 0 : parseFloat(val) || 0;
    if (field === 'gold') onUpdateFinancials(num, goldPrice, cash);
    if (field === 'price') onUpdateFinancials(goldTola, num, cash);
    if (field === 'cash') onUpdateFinancials(goldTola, goldPrice, num);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-1 mb-10">
        <h2 className="text-3xl font-black text-[--primary] playfair tracking-tight italic">Jahez & Wealth</h2>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-2">Inventory & Investment Planning</p>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-3 h-full bg-[--accent]" />
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest leading-none mb-3">Total Jahez Value</p>
            <p className="text-4xl font-black text-[--primary] tracking-tighter">PKR {jahezTotal.toLocaleString()}</p>
          </div>
          <div className="bg-[--bg] p-5 rounded-[1.5rem] text-[--accent] shadow-inner">
            <ShoppingBag size={32} />
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex justify-between items-center text-[10px] font-black uppercase px-1">
            <span className="text-gray-400 tracking-widest">Budget Allocation</span>
            <span className={jahezPercentage > 150 ? 'text-red-500' : 'text-[--accent]'}>
              {jahezPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100 p-0.5 shadow-inner">
            <div 
              className={`h-full transition-all duration-1000 rounded-full ${jahezPercentage > 150 ? 'bg-red-500' : 'bg-[--accent]'}`}
              style={{ width: `${Math.min(100, jahezPercentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Gold & Cash Assets Card */}
      <div className="desi-gradient rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-80 flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[--accent] rounded-full" /> Raw Wealth Investment
        </h3>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase opacity-60 ml-1 tracking-widest flex items-center gap-2">
              <Gem size={10} /> Gold (Tolas)
            </label>
            <input 
              type="number" 
              placeholder="0"
              value={goldTola === 0 ? '' : goldTola}
              onChange={(e) => handleFinancialChange('gold', e.target.value)}
              className="w-full bg-white/10 border-b-2 border-white/20 focus:border-[--accent] outline-none text-2xl font-black py-2 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase opacity-60 ml-1 tracking-widest flex items-center gap-2">
              <DollarSign size={10} /> Market Rate
            </label>
            <input 
              type="number" 
              placeholder="0"
              value={goldPrice === 0 ? '' : goldPrice}
              onChange={(e) => handleFinancialChange('price', e.target.value)}
              className="w-full bg-white/10 border-b-2 border-white/20 focus:border-[--accent] outline-none text-2xl font-black py-2 transition-all"
            />
          </div>
        </div>
        <div className="mt-8 space-y-2">
          <label className="text-[10px] font-black uppercase opacity-60 ml-1 tracking-widest flex items-center gap-2">
             <DollarSign size={10} /> Cash / Salam Assets
          </label>
          <input 
            type="number" 
            placeholder="0"
            value={cash === 0 ? '' : cash}
            onChange={(e) => handleFinancialChange('cash', e.target.value)}
            className="w-full bg-white/10 border-b-2 border-white/20 focus:border-[--accent] outline-none text-2xl font-black py-2 transition-all"
          />
        </div>
      </div>

      {/* Item Categories */}
      {categories.map((cat) => (
        <div key={cat.id} className="space-y-5 pt-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.25em] flex items-center gap-3">
               <Package size={20} className="text-[--accent]" /> {cat.name}
            </h3>
            <button 
              onClick={() => onAddItem(cat.id)}
              className="bg-white p-2.5 rounded-xl shadow-md text-[--accent] hover:bg-[--accent] hover:text-white transition-all border border-gray-100"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            {cat.items.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-6 rounded-[2.5rem] border-2 transition-all duration-300 ${
                  item.isSelected ? 'bg-white border-[--accent] shadow-lg' : 'bg-white/40 border-transparent opacity-50'
                }`}
              >
                <div className="flex items-center gap-5 flex-1">
                  <button
                    onClick={() => onUpdateItem(cat.id, item.id, { isSelected: !item.isSelected })}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.isSelected ? 'bg-[--accent] border-[--accent]' : 'border-gray-200'
                    }`}
                  >
                    {item.isSelected && <Check size={16} className="text-white" strokeWidth={3} />}
                  </button>
                  <div className="flex-1 cursor-pointer" onClick={() => onUpdateItem(cat.id, item.id, { isSelected: !item.isSelected })}>
                    <p className="text-base font-black text-[#2d3436] leading-none">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">{item.nameUrdu}</p>
                  </div>
                </div>
                {item.isSelected && (
                  <div className="flex items-center gap-2 bg-[--bg] px-4 py-2.5 rounded-[1.25rem] border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-black">PKR</span>
                    <input 
                      type="number"
                      value={item.price === 0 ? '' : item.price}
                      placeholder="0"
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateItem(cat.id, item.id, { price: val === '' ? 0 : Math.max(0, parseInt(val) || 0) });
                      }}
                      className="w-24 text-right bg-transparent text-sm font-black text-[--primary] outline-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JahezCalculator;
