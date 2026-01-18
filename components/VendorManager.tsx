
import React from 'react';
import { Vendor } from '../types';
import { Truck, BadgeDollarSign, Plus, UserCircle } from 'lucide-react';

interface Props {
  vendors: Vendor[];
  onUpdate: (vendors: Vendor[]) => void;
}

const VendorManager: React.FC<Props> = ({ vendors, onUpdate }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-[--primary] playfair italic">Vendor Tracker</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Payment Management</p>
      </div>

      {vendors.map(vendor => (
        <div key={vendor.id} className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-50 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
               <div className="p-3 bg-[--bg] rounded-2xl text-[--primary]"><UserCircle size={24} /></div>
               <div>
                 <h3 className="font-black text-base">{vendor.name}</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{vendor.service}</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Total Agreed</p>
              <p className="font-black text-sm">PKR {vendor.totalAmount.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl">
              <p className="text-[8px] font-black uppercase text-emerald-400 mb-1">Paid Already</p>
              <input 
                type="number"
                value={vendor.paidAmount}
                onChange={e => onUpdate(vendors.map(v => v.id === vendor.id ? {...v, paidAmount: Number(e.target.value)} : v))}
                className="bg-transparent font-black text-sm w-full outline-none text-emerald-700"
              />
            </div>
          </div>
          
          <div className="pt-2 flex justify-between items-center px-2">
            <span className="text-[10px] font-black uppercase text-red-400">Remaining Balance</span>
            <span className="font-black text-red-600">PKR {(vendor.totalAmount - vendor.paidAmount).toLocaleString()}</span>
          </div>
        </div>
      ))}

      <button onClick={() => {
        const n = prompt("Vendor Name?");
        const s = prompt("Service (e.g. Photography)?");
        if(n && s) onUpdate([...vendors, {id: Date.now().toString(), name: n, service: s, totalAmount: 0, paidAmount: 0}]);
      }} className="w-full bg-white border-2 border-dashed border-gray-200 py-6 rounded-[2.5rem] text-gray-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
        <Plus size={16} /> Register Vendor
      </button>
    </div>
  );
};

export default VendorManager;
