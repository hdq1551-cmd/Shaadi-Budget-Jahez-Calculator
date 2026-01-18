
import React from 'react';
import { 
  UserPlus, Utensils, Paintbrush, Camera, PlusCircle, 
  CheckCircle2, Trash2, Sparkles, Plus, PartyPopper, 
  Music, Heart, Star, Gift, Moon, Sun, Coffee 
} from 'lucide-react';
import { EventExpense } from '../types.ts';
import { SUGGESTED_EVENTS } from '../constants.ts';

interface Props {
  events: Record<string, EventExpense>;
  onUpdate: (event: EventExpense) => void;
  onDelete: (id: string) => void;
  onAdd: (predefinedName?: string) => void;
  total: number;
}

const ICON_OPTIONS = {
  PartyPopper,
  Utensils,
  Camera,
  Paintbrush,
  Music,
  Heart,
  Star,
  Gift,
  Moon,
  Sun,
  Coffee
};

const BudgetCalculator: React.FC<Props> = ({ events, onUpdate, onDelete, onAdd, total }) => {
  const handleInputChange = (event: EventExpense, field: keyof EventExpense, val: string) => {
    const numVal = val === '' ? 0 : Math.max(0, parseInt(val) || 0);
    onUpdate({ ...event, [field]: numVal });
  };

  const eventList = Object.values(events) as EventExpense[];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative -mx-5 -mt-5 mb-10 h-72 overflow-hidden rounded-b-[4rem] shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" 
          alt="Desi Celebration" 
          className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[5000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[--primary]/95 via-[--primary]/40 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8">
          <h2 className="text-white text-5xl font-black playfair italic tracking-tight drop-shadow-lg leading-none">Events</h2>
          <p className="text-white/80 text-[11px] font-black uppercase tracking-[0.4em] mt-3">Grand Ceremony Budgeting</p>
        </div>
        <div className="absolute top-10 right-8 glass-dock px-6 py-4 rounded-[1.5rem] shadow-2xl border-white/30 text-center animate-in fade-in slide-in-from-right-10 duration-700">
          <p className="text-[--primary] text-[9px] font-black uppercase tracking-widest opacity-60 mb-1 leading-none">Total Event PKR</p>
          <p className="text-[--primary] text-2xl font-black tracking-tighter leading-none">{total.toLocaleString()}</p>
        </div>
      </div>

      {/* Suggested Quick Add Section */}
      <div className="space-y-4 px-1">
        <div className="flex items-center justify-between ml-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-[--accent] uppercase tracking-widest">
            <Sparkles size={14} /> Quick Add Ceremonies
          </div>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Swipe left</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2">
          {SUGGESTED_EVENTS.map(name => (
            <button
              key={name}
              onClick={() => onAdd(name)}
              className="whitespace-nowrap bg-white border-2 border-transparent px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.15em] text-[--primary] shadow-md hover:border-[--primary] hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 group"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform" /> {name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
        <h3 className="text-[11px] font-black text-[--primary] uppercase tracking-[0.25em] flex items-center gap-2.5">
          <CheckCircle2 size={18} className="text-[--accent]" /> Your Itinerary
        </h3>
      </div>

      <div className="space-y-6">
        {eventList.length === 0 && (
          <div className="text-center py-20 px-10 border-4 border-dashed border-gray-100 rounded-[3rem] opacity-50 bg-white/30">
            <PartyPopper size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Abhi tak koi event add nahi hua</p>
            <p className="text-[10px] text-gray-300 mt-2 font-bold uppercase">Quick Add options try karein</p>
          </div>
        )}
        
        {eventList.map((event) => {
          const IconComponent = ICON_OPTIONS[event.icon as keyof typeof ICON_OPTIONS] || PartyPopper;
          
          return (
            <div 
              key={event.id} 
              className={`transition-all duration-500 rounded-[3rem] overflow-hidden ${
                event.isSelected ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100' : 'bg-white/40 border border-gray-100 grayscale opacity-50'
              }`}
            >
              {event.isSelected && <div className="h-2.5 w-full bg-[--primary]" />}
              <div className="p-7 flex justify-between items-center">
                <div 
                  className="flex items-center gap-6 flex-1 cursor-pointer"
                  onClick={() => onUpdate({ ...event, isSelected: !event.isSelected })}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    event.isSelected ? 'bg-[--primary] text-white shadow-lg shadow-[--primary]/20' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[--primary] text-xl playfair italic leading-none">{event.name}</h4>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">
                      {event.isRemovable ? 'Custom Ceremony' : 'Major Event'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  {event.isSelected && (
                    <div className="text-right">
                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-1">Subtotal</p>
                      <span className="text-base font-black text-[--primary] tracking-tighter">
                        PKR {((Number(event.guests || 0) * Number(event.perPlate || 0)) + Number(event.decoration || 0) + Number(event.photographer || 0) + Number(event.other || 0)).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {event.isRemovable && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); if(confirm(`Delete ${event.name}?`)) onDelete(event.id); }}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>

              {event.isSelected && (
                <div className="px-8 pb-10 pt-4 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700 bg-[--bg]/30">
                  {/* Icon Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Event Icon</label>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {Object.keys(ICON_OPTIONS).map(iconName => {
                        const OptionIcon = ICON_OPTIONS[iconName as keyof typeof ICON_OPTIONS];
                        return (
                          <button
                            key={iconName}
                            onClick={() => onUpdate({ ...event, icon: iconName })}
                            className={`p-3 rounded-xl transition-all border-2 ${
                              event.icon === iconName 
                                ? 'bg-[--primary] text-white border-[--primary] shadow-lg' 
                                : 'bg-white text-gray-400 border-gray-100 hover:border-[--primary]/30'
                            }`}
                          >
                            <OptionIcon size={18} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Grid */}
                  <div className="grid grid-cols-2 gap-6 border-t border-gray-50 pt-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1 tracking-widest">
                        <UserPlus size={12} className="text-[--accent]" /> Total Guests
                      </label>
                      <input 
                        type="number"
                        value={event.guests === 0 ? '' : event.guests}
                        placeholder="0"
                        onChange={(e) => handleInputChange(event, 'guests', e.target.value)}
                        className="w-full bg-white rounded-2xl px-5 py-4 text-base font-black text-[#2d3436] focus:ring-4 focus:ring-[--primary]/5 outline-none border border-gray-100 shadow-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1 tracking-widest">
                        <Utensils size={12} className="text-[--accent]" /> Plate Cost
                      </label>
                      <input 
                        type="number"
                        value={event.perPlate === 0 ? '' : event.perPlate}
                        placeholder="0"
                        onChange={(e) => handleInputChange(event, 'perPlate', e.target.value)}
                        className="w-full bg-white rounded-2xl px-5 py-4 text-base font-black text-[#2d3436] focus:ring-4 focus:ring-[--primary]/5 outline-none border border-gray-100 shadow-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1 tracking-widest">
                        <Paintbrush size={12} className="text-[--accent]" /> Decor Cost
                      </label>
                      <input 
                        type="number"
                        value={event.decoration === 0 ? '' : event.decoration}
                        placeholder="0"
                        onChange={(e) => handleInputChange(event, 'decoration', e.target.value)}
                        className="w-full bg-white rounded-2xl px-5 py-4 text-base font-black text-[#2d3436] focus:ring-4 focus:ring-[--primary]/5 outline-none border border-gray-100 shadow-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 font-black uppercase flex items-center gap-2 ml-1 tracking-widest">
                        <Camera size={12} className="text-[--accent]" /> Media Cost
                      </label>
                      <input 
                        type="number"
                        value={event.photographer === 0 ? '' : event.photographer}
                        placeholder="0"
                        onChange={(e) => handleInputChange(event, 'photographer', e.target.value)}
                        className="w-full bg-white rounded-2xl px-5 py-4 text-base font-black text-[#2d3436] focus:ring-4 focus:ring-[--primary]/5 outline-none border border-gray-100 shadow-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => { const n = prompt("Event Name?"); if(n) onAdd(n); }}
        className="w-full bg-white border-2 border-dashed border-gray-200 py-8 rounded-[3rem] flex items-center justify-center gap-4 text-gray-400 font-black text-xs hover:border-[--primary] hover:text-[--primary] transition-all active:scale-[0.98] shadow-sm uppercase tracking-[0.3em] mt-10 group"
      >
        <PlusCircle size={26} className="group-hover:rotate-180 transition-transform duration-500" />
        Add Custom Function
      </button>
    </div>
  );
};

export default BudgetCalculator;
