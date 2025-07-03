import { create } from 'zustand';
import { io, Socket } from "socket.io-client"
import {play} from 'elevenlabs'
import { audio } from 'elevenlabs/api/resources/voices/resources/pvc/resources/samples';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/"

export const useInterviewStore = create((set, get) => ({
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