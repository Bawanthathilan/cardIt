import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// State types
interface States {
  bg: string;
  size:string;
  authorImage:string | null | any;
  authorName:string;
  Title:string
  textColor:string
}

// Action types
interface Actions {
  setBg: (newBg:string) => void;
  setSize:(newSize:string) => void;
  setAuthorImage: (image: string) => void;
  setAuthorName: (name: string) => void;
  setTitle:(name:string)=>void;
  settextColor:(color:string)=>void;
}

// useCounterStore
export const useSettingStore = create<States & Actions>((set) => ({
  // States
  svgRef:null,
  bg: 'Background Light Gradient 1',
  size: 'Medium cover',
  authorImage: '/avataaars.png',
  authorName: 'John Doe',
  Title:'Lorem ipsum odor amet, consectetuer adipiscing elit.',
  textColor:'#656565',
    
  // Actions
  setBg: (newBg: string) => set((state) => ({ ...state, bg: newBg })),
  setSize: (newSize: string) => set((state) => ({ ...state, size: newSize })), 
  setAuthorImage: (image) => set((state) => ({ ...state, authorImage: image })),
  setAuthorName: (name) => set((state) => ({ ...state, authorName: name })),
  setTitle: (title) => set((state) => ({ ...state, Title: title })),
  settextColor: (color) => set((state) => ({ ...state, textColor: color })),
}));