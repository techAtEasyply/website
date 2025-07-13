import { create } from 'zustand';
import { io, Socket } from "socket.io-client"
import {play} from 'elevenlabs'
import { audio } from 'elevenlabs/api/resources/voices/resources/pvc/resources/samples';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/"

// Add types for code execution state
export interface InterviewStore {
  isMuted: boolean;
  isVideoOff: boolean;
  showChat: boolean;
  isInterviewActive: boolean;
  setIsMuted: (isMuted: boolean) => void;
  setIsVideoOff: (isVideoOff: boolean) => void;
  setShowChat: (showChat: boolean) => void;
  setIsInterviewActive: (isInterviewActive: boolean) => void;
  socket: Socket | null;
  audio: any;
  currentQuestion: string;
  answer: string;
  isAiSpeaking: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
  introduction: (question: string) => void;
  evaluateAnswer: (currentQuestion: string, answer: string, followupQuestion: string) => void;
  // Code execution state
  code: string;
  language: string;
  stdin: string;
  output: string;
  loading: boolean;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setStdin: (stdin: string) => void;
  setOutput: (output: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useInterviewStore = create<InterviewStore>((set, get) => ({
  isMuted: false,
  isVideoOff: false,
  showChat: false,
  isInterviewActive: true,
  setIsMuted: (isMuted: boolean) => set({ isMuted }),
  setIsVideoOff: (isVideoOff: boolean) => set({ isVideoOff }),
  setShowChat: (showChat: boolean) => set({ showChat }),
  setIsInterviewActive: (isInterviewActive: boolean) => set({ isInterviewActive }),
  socket: null,
  audio: null,
  currentQuestion: "",
  answer: "",
  isAiSpeaking: false,

  // --- Code Execution State ---
  code: "",
  language: "javascript",
  stdin: "",
  output: "",
  loading: false,
  setCode: (code: string) => set({ code }),
  setLanguage: (language: string) => set({ language }),
  setStdin: (stdin: string) => set({ stdin }),
  setOutput: (output: string) => set({ output }),
  setLoading: (loading: boolean) => set({ loading }),

  connectSocket:  () => {
    const state = get() as any;
    console.log(BASE_URL)
    const newSocket: Socket = io(BASE_URL);
    newSocket.connect();

    // Listen for introduction audio after connecting
     newSocket.on("introduction", async (data: { audio: any, text: string }) => {
       console.log(data)
       set({isAiSpeaking : true})
       try {
        if (data && data.audio) {

        const audioElement = new Audio(`data:audio/mpeg;base64,${data.audio}`);
        await audioElement.play();
        set({ audio: data.audio });
      }
       } catch (error) {
        console.error(error)
       } finally {
         set({ isAiSpeaking: false })
         console.log('you can speak now!!!')
       }

     });

    newSocket.on("evaluate", async (data: { audio: any, text: string }) => {
      console.log(data)
      try {
        if (data && data.audio) {
        console.log('we are setting the audio')
        console.log(typeof data.audio)
        const audioElement = new Audio(`data:audio/mpeg;base64,${data.audio}`);
        audioElement.play();
        set({ audio: data.audio });
      }
      } catch (error) {
        console.error(error)
      }  finally {
        set({ isAiSpeaking: false })
        console.log('you can speak now!!!')
       }

    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const state = get() as any;
    const socket: Socket | null = state.socket;
    if (socket?.connected) socket.disconnect();
  },

  introduction: (question: string) => {
    set({isAiSpeaking : true})
    const state = get() as any;
    const socket: Socket | null = state.socket;
    if (socket) {
      socket.emit("introduction", {
        phase: "phase_1",
        question: question,
      });
    }
  },

  evaluateAnswer: (currentQuestion: string, answer: string, followupQuestion: string) => {
    set({isAiSpeaking : true})
    const state = get() as any;
    const socket: Socket | null = state.socket;
    if (socket) {
      socket.emit("evaluate", {
        currentQuestion,
        answer,
        followupQuestion,
      });
    }
  }

}))