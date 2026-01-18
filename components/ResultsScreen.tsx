
import React, { useState, useEffect } from 'react';
import { AppState } from '../types.ts';
import { Download, Share2, Crown, Receipt, CheckCircle, Calculator, Heart, Stars, Bot, MessageSquareText, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  totals: {
    shaadiTotal: number;
    jahezTotal: number;
    grandTotal: number;
    monthlySaving: number;
    remainingToSave: number;
  };
  state: AppState;
}

const ResultsScreen: React.FC<Props> = ({ totals, state }) => {
  const [aiAdvice, setAiAdvice] = useState<string>("Analyzing your plan... 🤖");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAdvice = async () => {
      // Check if API key exists in environment
      if (!process.env.API_KEY) {
        setAiAdvice("AI Advice is disabled. Please set your API_KEY in Netlify settings.");
        setLoading(false);
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Analyze this Pakistani wedding plan:
            Dulha: ${state.profile.userName}, Dulhan: ${state.profile.partnerName}
            Total Budget: PKR ${totals.grandTotal}
            Guests: ${state.guestAnalysis.family + state.guestAnalysis.relatives + state.guestAnalysis.friends + state.guestAnalysis.pressure}
            "Pressure" Guests (Log Kya Kahenge): ${state.guestAnalysis.pressure}
            Monthly Savings required: PKR ${totals.monthlySaving}
            
            Provide short, punchy, and helpful advice in Hinglish (Urdu/English mix). 
            Suggest where to save money (specifically mention the pressure guests if they are high). 
            Add a warm wish at the end. Keep it under 100 words.`,
          config: { temperature: 0.7 }
        });
        setAiAdvice(response.text || "Plan behtareen hai! Bas savings par tawajjo dein.");
      } catch (e) {
        console.error("AI Advice Error:", e);
        setAiAdvice("AI Consultant is taking a tea break. Your plan looks solid though! ☕");
      } finally {
        setLoading(false);
      }
    };
    getAdvice();
  }, [totals, state.profile]);

  return (
    <div className="space-y-10 pb-20 relative animate-in fade-in zoom-in-95 duration-1000">
      <div className="text-center pt-6">
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-[--primary] rounded-full text-[--accent] shadow-2xl border-4 border-[--accent]/50 overflow-hidden relative flex items-center justify-center">
            {state.profile.profileImage ? (
              <img src={state.profile.profileImage} className="w-full h-full object-cover" alt="Couple" />
            ) : (
              <Heart size={40} className="opacity-30 fill-current" />
            )}
          </div>
          <div className="absolute -top-6 -right-4 bg-white p-2 rounded-full shadow-2xl text-[--primary] animate-bounce">
            <Crown size={28} />
          </div>
        </div>
        
        <h2 className="text-4xl font-black playfair italic text-[--primary]">Shaadi Mubarak!</h2>
        <p className="text-lg handwritten text-[--primary-light] mt-2 italic">
          {state.profile.userName || 'Dulha'} & {state.profile.partnerName || 'Dulhan'}
        </p>
      </div>

      {/* AI Consultant Card */}
      <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-2 border-[--accent]/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-6 opacity-5 text-[--primary] group-hover:rotate-12 transition-transform duration-700">
           <Bot size={80} />
         </div>
         <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-[--primary] text-white rounded-xl shadow-lg animate-pulse">
             <Sparkles size={18} />
           </div>
           <h3 className="text-[11px] font-black uppercase text-[--primary] tracking-widest">Smart Shaadi Advice</h3>
         </div>
         <div className="relative z-10">
            <p className={`text-sm font-bold text-gray-700 leading-relaxed italic ${loading ? 'opacity-50' : ''}`}>
              "{aiAdvice}"
            </p>
            {loading && (
              <div className="mt-4 flex gap-1">
                <div className="w-1.5 h-1.5 bg-[--primary] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[--primary] rounded-full animate-bounce delay-150" />
                <div className="w-1.5 h-1.5 bg-[--primary] rounded-full animate-bounce delay-300" />
              </div>
            )}
         </div>
      </div>

      <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100 relative premium-shadow">
        <div className="desi-gradient p-12 text-white text-center">
          <p className="text-[10px] font-black uppercase opacity-60 mb-3 tracking-[0.3em]">Estimated Investment</p>
          <p className="text-5xl font-black playfair tracking-tight">PKR {totals.grandTotal.toLocaleString()}</p>
          <div className="mt-8 flex justify-center items-center gap-8 opacity-90">
            <div className="text-center">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1">Events</p>
              <p className="text-sm font-black">PKR {totals.shaadiTotal.toLocaleString()}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-[8px] font-black uppercase opacity-60 mb-1">Inventory</p>
              <p className="text-sm font-black">PKR {totals.jahezTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-6">
          <div className="bg-[--bg] p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[--primary]/10 p-2.5 rounded-xl text-[--primary]">
                  <Receipt size={20} />
                </div>
                <span className="text-[10px] font-black text-[#2d3436] uppercase tracking-widest">Monthly Target</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[--primary] tracking-tighter">PKR {Math.round(totals.monthlySaving).toLocaleString()}</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">/ Month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 px-1">
        <button className="bg-white border-2 border-[--primary] text-[--primary] py-5 rounded-[2.5rem] font-black text-[10px] flex items-center justify-center gap-3 shadow-lg uppercase tracking-widest active:scale-95 transition-all">
          <Share2 size={18} /> Share Plan
        </button>
        <button className="desi-gradient text-white py-5 rounded-[2.5rem] font-black text-[10px] flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest active:scale-95 transition-all relative overflow-hidden group">
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div className="text-center p-10 bg-white/40 border-4 border-dashed border-[--accent]/30 rounded-[4rem]">
        <p className="text-base italic text-[--primary] leading-relaxed font-black playfair">
          "Best is that Nikkah which is simple and filled with love."
        </p>
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mt-4">Alhamdulillah</p>
      </div>
    </div>
  );
};

export default ResultsScreen;
