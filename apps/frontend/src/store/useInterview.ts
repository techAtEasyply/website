import { create }  from 'zustand';

export const useInterviewStore = create((set, get) => ({
  isMuted: false,
  isVideoOff: false,
  showChat: false,
  isInterviewActive: true,
  setIsMuted: (isMuted: boolean) => set({ isMuted }),
  setIsVideoOff: (isVideoOff: boolean) => set({ isVideoOff }),
  setShowChat: (showChat: boolean) => set({ showChat }),
  setIsInterviewActive: (isInterviewActive: boolean) => set({ isInterviewActive }),
}))