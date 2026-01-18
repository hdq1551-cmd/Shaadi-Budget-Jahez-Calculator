
import React from 'react';
import { SavingsPlan } from '../types';
import { Calendar, Wallet, TrendingUp, Info, Target } from 'lucide-react';

interface Props {
  plan: SavingsPlan;
  totalNeeded: number;
  monthlySaving: number;
  onUpdate: (plan: SavingsPlan) => void;
}

const SavingsPlanner: React.FC<Props> = ({ plan, totalNeeded, monthlySaving, onUpdate }) => {
  const progress = totalNeeded > 0 ? (Number(plan.currentSavings) / totalNeeded) * 100 : 0;

  const handleSavingsUpdate = (val: string) => {
    onUpdate({ ...plan, currentSavings: Math.max(0, parseInt(val) || 0) });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-1 mb-8">
        <h2 className="text-2xl font-black text-[#720e0e] playfair tracking-tight">Savings Tracker</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Financial Goal Management</p>
      </div>

      <div className="bg-white p-7 rounded-[2.5rem] shadow-xl premium-shadow border border-gray-50 space-y-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-[#c5a059]" /> Time Remaining
              </label>
              <span className="bg-[#720e0e] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">{plan.monthsRemaining} Months</span>
            </div>
            <input 
              type="range"
              min="1"
              max="48"
              value={plan.monthsRemaining}
              onChange={(e) => onUpdate({ ...plan, monthsRemaining: Number(e.target.value) })}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#720e0e]"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-black tracking-widest uppercase">
              <span>1 Month</span>
              <span>4 Years</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <div className="flex items-center gap-5">
              <div className="bg-[#f7f3ef] p-4 rounded-[1.5rem] text-[#c5a059] shadow-sm">
                <Wallet size={28} />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Already Saved Fund</label>
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black text-[#720e0e]">PKR</span>
                   <input 
                    type="number"
                    value={plan.currentSavings}
                    onChange={(e) => handleSavingsUpdate(e.target.value)}
                    className="w-full text-2xl font-black text-[#2d3436] focus:text-[#720e0e] outline-none transition-all bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-4 border-dashed border-[#f7f3ef]">
          <div className="flex items-center gap-2 mb-2">
             <Target size={14} className="text-[#c5a059]" />
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Target Monthly Savings</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#720e0e] tracking-tighter">PKR {Math.round(monthlySaving).toLocaleString()}</span>
            <span className="text-xs text-gray-400 font-black uppercase tracking-widest">/ Per Month</span>
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase mt-2 italic leading-relaxed">Required saving to reach PKR {totalNeeded.toLocaleString()} by deadline.</p>
        </div>
      </div>

      {/* Preparation Bar Card */}
      <div className="bg-[#720e0e] rounded-[2rem] p-7 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c5a059] opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="relative z-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-6 flex items-center gap-2">
            <TrendingUp size={14} /> Shaadi Readiness Level
          </h3>
          <div className="flex justify-between items-end mb-3">
            <span className="text-4xl font-black playfair italic">{Math.round(progress)}%</span>
            <div className="text-right">
               <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">
                 {progress >= 100 ? 'Fully Prepared!' : 'Funding Shortfall'}
               </p>
               <p className="text-sm font-bold text-[#c5a059]">
                 {progress >= 100 ? 'Ready to go!' : `PKR ${(totalNeeded - Number(plan.currentSavings)).toLocaleString()}`}
               </p>
            </div>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div 
              className="bg-gradient-to-r from-[#c5a059] to-white h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(197,160,89,0.4)]" 
              style={{ width: `${Math.min(100, progress)}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 p-5 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm">
        <div className="bg-[#f7f3ef] p-2.5 rounded-xl text-[#c5a059] h-fit">
          <Info size={18} />
        </div>
        <div>
           <p className="text-[10px] text-[#720e0e] font-black uppercase tracking-widest mb-1">Financial Mastery Tip</p>
           <p className="text-[11px] text-gray-500 leading-relaxed italic">
            "Gold prices change daily." Monitor the bullion market and buy gold jewelry gradually over months to average out the costs.
           </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlanner;
