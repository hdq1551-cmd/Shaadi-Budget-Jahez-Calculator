
import React from 'react';
import { GuestAnalysis } from '../types';
import { Users, UserMinus, ShieldAlert, Heart, Activity } from 'lucide-react';

interface Props {
  analysis: GuestAnalysis;
  avgPlateCost: number;
  onUpdate: (analysis: GuestAnalysis) => void;
}

const GuestChecker: React.FC<Props> = ({ analysis, avgPlateCost, onUpdate }) => {
  const totalGuests = (Number(analysis.family) || 0) + (Number(analysis.friends) || 0) + (Number(analysis.relatives) || 0) + (Number(analysis.pressure) || 0);
  const potentialSavings = (Number(analysis.pressure) || 0) * (Number(avgPlateCost) || 0);

  const handleUpdate = (field: keyof GuestAnalysis, val: string) => {
    onUpdate({ ...analysis, [field]: Math.max(0, parseInt(val) || 0) });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-1 mb-6">
        <h2 className="text-2xl font-black text-[#720e0e] playfair tracking-tight">Mehmaan Lists</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Guest Management & Optimization</p>
      </div>

      <div className="bg-white p-7 rounded-[2.5rem] shadow-xl premium-shadow border border-gray-50 space-y-8 relative overflow-hidden">
         <div className="absolute -top-10 -right-10 opacity-[0.03]">
           <Users size={180} />
         </div>
         
         <div className="flex justify-between items-center relative z-10">
           <div>
             <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Attendance</span>
             <p className="text-3xl font-black text-[#720e0e]">{totalGuests} <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Plates</span></p>
           </div>
           <div className="bg-[#f7f3ef] p-4 rounded-[1.5rem] text-[#720e0e]">
             <Activity size={24} />
           </div>
         </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[9px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1">
              <Heart size={10} className="text-[#c5a059]" /> Close Family
            </label>
            <input 
              type="number"
              value={analysis.family}
              onChange={(e) => handleUpdate('family', e.target.value)}
              className="w-full text-2xl font-black text-[#2d3436] border-b-2 border-transparent focus:border-[#720e0e] outline-none transition-all pb-1 bg-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1">
              <Users size={10} className="text-[#c5a059]" /> Friends
            </label>
            <input 
              type="number"
              value={analysis.friends}
              onChange={(e) => handleUpdate('friends', e.target.value)}
              className="w-full text-2xl font-black text-[#2d3436] border-b-2 border-transparent focus:border-[#720e0e] outline-none transition-all pb-1 bg-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1">
              <Users size={10} className="text-[#c5a059]" /> Relatives
            </label>
            <input 
              type="number"
              value={analysis.relatives}
              onChange={(e) => handleUpdate('relatives', e.target.value)}
              className="w-full text-2xl font-black text-[#2d3436] border-b-2 border-transparent focus:border-[#720e0e] outline-none transition-all pb-1 bg-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] text-red-400 font-black uppercase flex items-center gap-2 ml-1">
              <ShieldAlert size={10} /> Formalities
            </label>
            <input 
              type="number"
              value={analysis.pressure}
              onChange={(e) => handleUpdate('pressure', e.target.value)}
              className="w-full text-2xl font-black text-red-600 border-b-2 border-transparent focus:border-red-500 outline-none transition-all pb-1 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Premium Reality Check Card */}
      <div className="bg-[#720e0e] text-white p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="flex items-start gap-4">
          <div className="bg-white/10 p-3 rounded-2xl text-[#c5a059]">
            <UserMinus size={28} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-white/90">Reality Check</h3>
            <p className="text-xs text-white/70 leading-relaxed mt-2">
              If you reduce the <span className="text-white font-black underline decoration-[#c5a059]">{analysis.pressure}</span> "Log Kya Kahenge" guests, you instantly save:
            </p>
            <div className="mt-4">
              <p className="text-3xl font-black text-[#c5a059]">PKR {potentialSavings.toLocaleString()}</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1 italic">Ye paise honeymoon pe kaam ayenge!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-white p-5 rounded-[2rem] border border-gray-100">
        <h4 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest text-center">Crowd Distribution</h4>
        <div className="flex w-full h-4 rounded-full overflow-hidden bg-gray-100">
          <div className="bg-[#720e0e] h-full" style={{ width: `${totalGuests ? (analysis.family / totalGuests) * 100 : 0}%` }} />
          <div className="bg-[#c5a059] h-full" style={{ width: `${totalGuests ? (analysis.friends / totalGuests) * 100 : 0}%` }} />
          <div className="bg-gray-400 h-full" style={{ width: `${totalGuests ? (analysis.relatives / totalGuests) * 100 : 0}%` }} />
          <div className="bg-red-500 h-full" style={{ width: `${totalGuests ? (analysis.pressure / totalGuests) * 100 : 0}%` }} />
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-5">
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500"><div className="w-2.5 h-2.5 bg-[#720e0e] rounded-full" /> FAMILY</div>
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500"><div className="w-2.5 h-2.5 bg-[#c5a059] rounded-full" /> FRIENDS</div>
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500"><div className="w-2.5 h-2.5 bg-gray-400 rounded-full" /> RELATIVES</div>
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-500"><div className="w-2.5 h-2.5 bg-red-500 rounded-full" /> PRESSURE</div>
        </div>
      </div>
    </div>
  );
};

export default GuestChecker;
