
import { WeddingEvent, EventExpense, JahezCategory, ChecklistItem, Vendor } from './types.ts';

export const INITIAL_EVENTS: Record<string, EventExpense> = {
  [WeddingEvent.MEHNDI]: { id: WeddingEvent.MEHNDI, name: 'Mehndi', isSelected: true, guests: 150, perPlate: 1200, decoration: 50000, photographer: 30000, other: 10000, isRemovable: false, icon: 'Music' },
  [WeddingEvent.BARAT]: { id: WeddingEvent.BARAT, name: 'Barat', isSelected: true, guests: 300, perPlate: 2500, decoration: 150000, photographer: 60000, other: 50000, isRemovable: false, icon: 'PartyPopper' },
  [WeddingEvent.WALIMA]: { id: WeddingEvent.WALIMA, name: 'Walima', isSelected: true, guests: 250, perPlate: 1800, decoration: 100000, photographer: 40000, other: 20000, isRemovable: false, icon: 'Utensils' },
};

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', task: 'Booking the Venue', isCompleted: false, category: 'Vendors' },
  { id: '2', task: 'Bridal Dress Finalization', isCompleted: false, category: 'Shopping' },
  { id: '3', task: 'Gold Purchase', isCompleted: false, category: 'Shopping' },
  { id: '4', task: 'Nikah Nama Legalities', isCompleted: false, category: 'Legal' },
  { id: '5', task: 'Guest List Finalization', isCompleted: false, category: 'Other' },
];

export const INITIAL_VENDORS: Vendor[] = [
  { id: 'v1', name: 'Example Marquee', service: 'Venue & Food', totalAmount: 500000, paidAmount: 50000 },
];

export const INITIAL_JAHEZ: JahezCategory[] = [
  {
    id: 'gold-jewelry',
    name: 'Gold Jewelry',
    items: [
      { id: 'gold-bangles', name: 'Gold Bangles', nameUrdu: 'Churiyan', price: 350000, isSelected: true },
      { id: 'gold-necklace', name: 'Gold Necklace Set', nameUrdu: 'Haar', price: 650000, isSelected: true },
      { id: 'gold-rings', name: 'Wedding Rings', nameUrdu: 'Angoothi', price: 120000, isSelected: true },
    ]
  },
  {
    id: 'furniture',
    name: 'Furniture',
    items: [
      { id: 'bed', name: 'Bed Set', nameUrdu: 'Bed Set', price: 150000, isSelected: true },
      { id: 'sofa', name: 'Sofa Set', nameUrdu: 'Sofa Set', price: 80000, isSelected: true },
      { id: 'cupboard', name: 'Cupboard', nameUrdu: 'Cupboard', price: 45000, isSelected: true },
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    items: [
      { id: 'fridge', name: 'Refrigerator', nameUrdu: 'Fridge', price: 120000, isSelected: true },
      { id: 'ac', name: 'Air Conditioner', nameUrdu: 'AC', price: 180000, isSelected: false },
      { id: 'wm', name: 'Washing Machine', nameUrdu: 'Washing Machine', price: 60000, isSelected: true },
    ]
  }
];

export const PRESETS = [
  { name: 'Simple', total: 1000000, color: '#10b981' },
  { name: 'Average', total: 3500000, color: '#f59e0b' },
  { name: 'Luxury', total: 8000000, color: '#ef4444' },
];

export const SUGGESTED_EVENTS = [
  "Dholki", "Engagement", "Nikah", "Rukhsati", "Mayun", "Bridal Shower", "Valima"
];
