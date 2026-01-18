
export enum WeddingEvent {
  MEHNDI = 'Mehndi',
  BARAT = 'Barat',
  WALIMA = 'Walima',
  NIKAH = 'Nikah'
}

export type AppTheme = 'maroon' | 'emerald' | 'midnight' | 'rose' | 'saffron' | 'turquoise' | 'indigo' | 'violet' | 'teal' | 'sunset' | 'gulabi' | 'zaitoon' | 'shahi' | 'badami' | 'aasmani';

export type BackgroundStyle = 'mandala' | 'floral' | 'glitter' | 'minimal' | 'geometric';

export interface UserProfile {
  userName: string;
  partnerName: string;
  weddingDate: string;
  profileImage?: string;
}

export interface EventExpense {
  id: string;
  name: string;
  isSelected: boolean;
  guests: number;
  perPlate: number;
  decoration: number;
  photographer: number;
  other: number;
  isRemovable?: boolean;
  icon?: string;
}

export interface JahezCategory {
  id: string;
  name: string;
  items: JahezItem[];
}

export interface JahezItem {
  id: string;
  name: string;
  nameUrdu: string;
  price: number;
  isSelected: boolean;
  isCustom?: boolean;
}

export interface ChecklistItem {
  id: string;
  task: string;
  isCompleted: boolean;
  category: 'Legal' | 'Shopping' | 'Vendors' | 'Other';
}

export interface Vendor {
  id: string;
  name: string;
  service: string;
  totalAmount: number;
  paidAmount: number;
}

export interface GuestAnalysis {
  family: number;
  friends: number;
  relatives: number;
  pressure: number;
}

export interface SavingsPlan {
  monthsRemaining: number;
  currentSavings: number;
}

export interface AppState {
  events: Record<string, EventExpense>;
  jahezCategories: JahezCategory[];
  checklist: ChecklistItem[];
  vendors: Vendor[];
  goldTola: number;
  goldPricePerTola: number;
  cashGift: number;
  guestAnalysis: GuestAnalysis;
  savingsPlan: SavingsPlan;
  profile: UserProfile;
  theme: AppTheme;
  backgroundStyle: BackgroundStyle;
}
