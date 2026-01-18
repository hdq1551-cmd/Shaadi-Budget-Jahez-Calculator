
import React from 'react';
import { PRESETS } from '../constants.ts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Info, Target } from 'lucide-react';

interface Props {
  currentTotal: number;
}

const ComparisonMode: React.FC<Props> = ({ currentTotal }) => {
  const data = [
    ...PRESETS,
    { name: 'Your Plan', total: currentTotal, color: '#720e0e' }
  ].sort((a, b) => a.total - b.total);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-1 mb-8">
        <h2 className="text-2xl font-black text-[#720e0e] playfair tracking-tight">Shaadi Muqabla</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Market Standard Benchmarking</p>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-xl premium-shadow border border-gray-50 overflow-hidden relative">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Target size={12} className="text-[#c5a059]" /> Expenditure Scale
          </h3>
          <Trophy size={16} className="text-[#c5a059]" />
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                fontSize={8} 
                fontWeight="800" 
                axisLine={false} 
                tickLine={false}
                interval={0}
                tick={{ fill: '#666' }}
              />
              <Tooltip 
                cursor={{fill: 'rgba(0,0,0,0.02)'}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border-0 shadow-2xl p-3 rounded-xl text-[10px] animate-in zoom-in-95">
                        <p className="font-black text-[#720e0e] uppercase tracking-widest">{payload[0].payload.name}</p>
                        <p className="text-gray-500 font-bold mt-0.5">PKR {Number(payload[0].value).toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="total" radius={[6, 6, 6, 6]} barSize={35}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        {PRESETS.map((preset) => {
          const diff = currentTotal - preset.total;
          const isMore = diff > 0;
          return (
            <div key={preset.name} className="bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm flex justify-between items-center group hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-[9px] shadow-inner" style={{ backgroundColor: preset.color }}>
                  {preset.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#2d3436] tracking-tight">{preset.name} Plan</h4>
                  <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Base: PKR {preset.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[8px] font-black uppercase tracking-tighter ${isMore ? 'text-red-500' : 'text-emerald-500'}`}>
                  {isMore ? 'Above Base' : 'Saving Pot.'}
                </p>
                <p className={`text-xs font-black ${isMore ? 'text-red-600' : 'text-emerald-600'}`}>
                  {isMore ? '+' : '-'} PKR {Math.abs(diff).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-white rounded-[1.5rem] border border-gray-100 flex gap-3 shadow-sm border-l-4 border-l-[#c5a059]">
        <div className="bg-[#f7f3ef] p-2 rounded-lg text-[#c5a059] h-fit">
          <Info size={14} />
        </div>
        <p className="text-[10px] text-[#720e0e] italic leading-relaxed font-medium">
          Strategic Tip: Luxury weddings often spend 3x more on decor than food. Prioritize guest comfort (food) over temporary aesthetics (decor) to stay within the "Average" benchmark.
        </p>
      </div>
    </div>
  );
};

export default ComparisonMode;
