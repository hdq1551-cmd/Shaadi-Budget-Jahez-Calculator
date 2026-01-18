
import React from 'react';
import { ChecklistItem } from '../types';
import { CheckCircle2, Circle, Plus, ListChecks } from 'lucide-react';

interface Props {
  items: ChecklistItem[];
  onUpdate: (items: ChecklistItem[]) => void;
}

const ChecklistManager: React.FC<Props> = ({ items, onUpdate }) => {
  const toggle = (id: string) => {
    onUpdate(items.map(i => i.id === id ? {...i, isCompleted: !i.isCompleted} : i));
  };

  const completed = items.filter(i => i.isCompleted).length;
  const progress = (completed / items.length) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[--primary] playfair italic">Zaroori Kaam</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Wedding Checklist</p>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="flex justify-between items-end mb-4">
           <span className="text-[10px] font-black uppercase text-gray-400">Preparation Progress</span>
           <span className="text-2xl font-black text-[--primary]">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-[--accent] transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} onClick={() => toggle(item.id)} className={`p-5 rounded-[2rem] border-2 transition-all flex items-center gap-4 cursor-pointer ${item.isCompleted ? 'bg-white/40 border-transparent opacity-60' : 'bg-white border-gray-50 shadow-sm'}`}>
            {item.isCompleted ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-gray-300" />}
            <div className="flex-1">
              <p className={`font-black text-sm ${item.isCompleted ? 'line-through' : ''}`}>{item.task}</p>
              <span className="text-[8px] font-black uppercase tracking-widest text-[--accent]">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => {
        const t = prompt("Task name?");
        if(t) onUpdate([...items, {id: Date.now().toString(), task: t, isCompleted: false, category: 'Other'}]);
      }} className="w-full bg-white border-2 border-dashed border-gray-200 py-6 rounded-[2.5rem] text-gray-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
        <Plus size={16} /> Add New Task
      </button>
    </div>
  );
};

export default ChecklistManager;
