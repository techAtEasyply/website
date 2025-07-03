
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
const ll = {
  phase_1: {
    name: "Communication & Resume",
    questions: [
      "Can you please introduce yourself?",
      "Tell me about your most impactful project mentioned in your resume.",
      "What motivated you to pursue a career in software engineering?",
      "What are your hobbies, and how do they influence your personality or work ethic?"
    ]
  },
  phase_2: {
    name: "CS Fundamentals",
    questions: [
      "What is the difference between a process and a thread?",
      "Explain normalization in DBMS. Why is it important?",
      "What is polymorphism in OOP? Give a real-world example.",
      "Which bash command would you use to list all hidden files in a directory?"
    ]
  },
  phase_3: {
    name: "DSA & Coding",
    questions: [
      {
        problem: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        input: "[2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        difficulty: "Easy"
      },
      {
        problem: "Given a string s, find the length of the longest substring without repeating characters.",
        input: "\"abcabcbb\"",
        output: "3",
        difficulty: "Medium"
      }
    ]
  },
  phase_4: {
    name: "Behavioral / HR",
    questions: [
      "Tell me about a time you handled a conflict in your team.",
      "Describe a situation where you made a mistake. What did you learn?",
      "How do you handle stress during tight deadlines?",
      "Where do you see yourself in 3–5 years?"
    ]
  }
};

const phaseKeys = ["phase_1", "phase_2", "phase_3", "phase_4"];

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phase, setPhase] = useState(0); // phase index, 0-based
  const [timeElapsed, setTimeElapsed] = useState(0);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Get current phase key and questions array
  const currentPhaseKey = phaseKeys[phase];
  const currentPhase = ll[currentPhaseKey];
  const questionsArray = currentPhase.questions;

  // For DSA phase, questions are objects, so handle accordingly
  const getQuestionText = (q: any) => {
    if (typeof q === "string") return q;
    if (q && typeof q === "object" && q.problem) return q.problem;
    return "";
  };

  const firstQuestion = getQuestionText(questionsArray[0]);

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
  //       // If audio is a stream (e.g., Buffer or Uint8Array), convert to Blob and play
  //     } catch (err) {
  //       console.error("Error playing audio:", err);
  //     }
  //   };
  //   playAudio();
  // }, [audio]);

  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // ! Setup recognition instance only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!isAiSpeaking) {
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-IN";
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTranscript += transcript + " ";
          }
          if (finalTranscript) {
            setText((prev) => prev + finalTranscript);
            console.log(finalTranscript);

            // Move to next question or next phase
            const nextQuestionIndex = currentQuestion + 1;
            const isLastQuestionInPhase = nextQuestionIndex >= questionsArray.length;
            let nextPhase = phase;
            let nextQuestion = currentQuestion;

            if (!isLastQuestionInPhase) {
              // More questions in current phase
              nextQuestion = nextQuestionIndex;
            } else if (phase < phaseKeys.length - 1) {
              // Move to next phase
              nextPhase = phase + 1;
              nextQuestion = 0;
            } else {
              // Last question of last phase, do nothing or end interview
              // Optionally, you can set a flag to end the interview here
            }

            // Call evaluateAnswer with current, transcript, and next question (if exists)
            const currentQ = questionsArray[currentQuestion];
            let nextQ: any = null;
            if (!isLastQuestionInPhase) {
              nextQ = questionsArray[nextQuestionIndex];
            } else if (nextPhase < phaseKeys.length) {
              const nextPhaseKey = phaseKeys[nextPhase];
              const nextPhaseQuestions = ll[nextPhaseKey].questions;
              nextQ = nextPhaseQuestions[0];
            }

            evaluateAnswer(
              getQuestionText(currentQ),
              finalTranscript,
              nextQ ? getQuestionText(nextQ) : null
            );

            // Update state to move forward
            setCurrentQuestion(nextQuestion);
            setPhase(nextPhase);
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
        }

        recognitionRef.current = recognition
      }
    }
    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null
        recognitionRef.current.onerror = null
        recognitionRef.current.stop()
      }
    }
       }
  }, [])

  // ! Start/stop listening when mic is toggled
  useEffect(() => {
    if (!recognitionRef.current) return
    if (!isMuted) {
      try {
        recognitionRef.current.start()
        setListening(true)
      } catch (e) {
        // Already started
      }
    } else {
      recognitionRef.current.stop()
      setListening(false)
    }
  }, [isMuted])

  // Timer effect (uncomment if needed)
  // useEffect(() => {
  //   if (isInterviewActive) {
  //     const timer = setInterval(() => {
  //       setTimeElapsed((prev) => prev + 1)
  //     }, 1000)
  //     return () => clearInterval(timer)
  //   }
  // }, [isInterviewActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Technical Interview</span>
            </div>
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeElapsed)}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video Call */}
        <div className="w-1/3 bg-gray-800 flex flex-col">
          <VideoCall />

          {/* Controls */}
          <div className="p-4 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center justify-center gap-4">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="lg"
                  className="rounded-full w-12 h-12 p-0"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isVideoOff ? "destructive" : "secondary"}
                  size="lg"
                  className="rounded-full w-12 h-12 p-0"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full w-12 h-12 p-0"
                  onClick={() => setIsInterviewActive(false)}
                >
                  <Phone className="w-5 h-5 rotate-[135deg]" />
                </Button>
              </motion.div>
            </div>
            {/* Show listening status and recognized text */}
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-400">
                Mic: {isMuted ? "Off" : "On"} | Listening: {listening ? "Yes" : "No"}
              </div>
              {/* <div className="text-xs text-green-400 break-words mt-1">
                {text && (
                  <>
                    <span className="font-semibold">Recognized:</span> {text}
                  </>
                )}
              </div> */}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Question Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-white">{currentQ?.title}</h2>
                <Badge
                  variant="secondary"
                  className={`${
                    currentQ?.difficulty === "Easy"
                      ? "bg-green-500/20 text-green-400"
                      : currentQ?.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {currentQ?.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </Button>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{currentQ?.description}</p>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex">
            <div className="flex-1">
              <CodeEditor initialCode={currentQ?.initialCode} />
            </div>

            {/* Test Cases Panel */}
            <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-medium text-white mb-3">Test Cases</h3>
                <div className="space-y-3">
                  {currentQ?.testCases?.map((testCase, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm">
                        <div className="text-gray-300 mb-1">Input:</div>
                        <code className="text-blue-400 text-xs">{testCase?.input}</code>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="text-gray-300 mb-1">Expected Output:</div>
                        <code className="text-green-400 text-xs">{testCase?.output}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Output */}
              <div className="flex-1 p-4">
                <h4 className="font-medium text-white mb-3">Console</h4>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-300 min-h-[100px]">
                  <div className="text-green-400">Ready to run your code...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
