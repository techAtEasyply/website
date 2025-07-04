
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Video, VideoOff, Phone, Settings, MessageSquare, Play, RotateCcw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CodeEditor from "@/components/code-editor"
import VideoCall from "@/components/video-call"
import ChatPanel from "@/components/chat-panel"
import { useInterviewStore } from "@/store/useInterview"
import { play } from 'elevenlabs'
import { ll, formatTime, getQuestionText } from '../lib/utils'
import { useInterviewSpeech } from '@/hooks/useInterviewSpeech'
import { TopPanel , LeftPanel , RightPanel } from '@/components/interview'

const phaseKeys = ["phase_1", "phase_2", "phase_3", "phase_4"];

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phase, setPhase] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
   const currentPhaseKey = phaseKeys[phase];
  const currentPhase = ll[currentPhaseKey];
  const questionsArray = currentPhase.questions;
  const firstQuestion = getQuestionText(questionsArray[0]);
  const [text, setText] = useState("");
  const recognitionRef = useRef<any>(null);

  // Add a type for the store to avoid lint errors
  const {
    isMuted = false,
    isVideoOff = false,
    showChat = false,
    isInterviewActive = true,
    setIsMuted = () => {},
    setIsVideoOff = () => {},
    setShowChat = () => {},
    setIsInterviewActive = () => {},
    connectSocket = () => {},
    disconnectSocket = () => {},
    introduction = (question: string) => {},
    audio,
    evaluateAnswer,
    isAiSpeaking
  } = useInterviewStore() as {
    isMuted?: boolean;
    isVideoOff?: boolean;
    showChat?: boolean;
    isInterviewActive?: boolean;
    setIsMuted?: (v: boolean) => void;
    setIsVideoOff?: (v: boolean) => void;
    setShowChat?: (v: boolean) => void;
    setIsInterviewActive?: (v: boolean) => void;
    connectSocket?: () => void;
    disconnectSocket?: () => void;
    introduction?: (question: string) => void;
    audio?: any;
      evaluateAnswer: any;
    isAiSpeaking :boolean
    };

  const { listening } = useInterviewSpeech({
  isMuted,
  isAiSpeaking,
  questionsArray,
  phase,
  currentQuestion,
  phaseKeys,
  ll,
  setCurrentQuestion,
  setPhase,
  evaluateAnswer,
  getQuestionText,
  setText
});




  useEffect(() => {
    connectSocket();
    setTimeout(() => {
      // 1 second has passed
    }, 1000);

    console.log("sending introduction");
    introduction(firstQuestion);

    return disconnectSocket();
  }, []);

  // // Play audio when received from backend
  // useEffect(() => {
  //   const playAudio = async () => {
  //     if (!audio) return;
  //     try {
  //       console.log("audio will play now");
  //
  //     } catch (err) {
  //       console.error("Error playing audio:", err);
  //     }
  //   };
  //   playAudio();
  // }, [audio]);



  // ! Setup recognition instance only on client


  // Timer effect (uncomment if needed)
  // useEffect(() => {
  //   if (isInterviewActive) {
  //     const timer = setInterval(() => {
  //       setTimeElapsed((prev) => prev + 1)
  //     }, 1000)
  //     return () => clearInterval(timer)
  //   }
  // }, [isInterviewActive])



  const questions = [
    {
      id: 1,
      title: "Two Sum Problem",
      difficulty: "Easy",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      initialCode: `function twoSum(nums, target) {
    // Your solution here

}`,
      testCases: [
        { input: "[2,7,11,15], target = 9", output: "[0,1]" },
        { input: "[3,2,4], target = 6", output: "[1,2]" },
      ],
    },
  ]

  const currentQ = questions[currentQuestion]

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <TopPanel timeElapsed={timeElapsed} setShowChat={setShowChat} showChat = {showChat} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video Call */}
          <LeftPanel/>

        {/* Right Panel - Code Editor */}
          <RightPanel currentQ={currentQ}/>

        {/* Chat Panel */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 border-l border-gray-700 overflow-hidden"
            >
              <ChatPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
