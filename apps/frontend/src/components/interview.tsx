import { RotateCcw, Play } from "lucide-react";
import { useInterviewStore } from "@/store/useInterview";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";
 import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, Clock } from "lucide-react";
import { formatTime } from "../lib/utils";
import VideoCall from "@/components/video-call";
import CodeEditor from "@/components/code-editor"

export function TopPanel(props: {
  timeElapsed: number;
  setShowChat: (v: boolean) => void;
  showChat: boolean;
}) {
  // Import needed components and utils inside the function
  // (for demonstration, but in practice, imports are at the top of the file)
  // eslint-disable-next-line @typescript-eslint/no-var-requires


  const { timeElapsed, setShowChat, showChat } = props;

  return (
    <>
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
    </>
  );
}



export function LeftPanel() {
  // Import all needed state and props from the store
  const {
    isMuted = false,
    isVideoOff = false,
    setIsMuted = () => {},
    setIsVideoOff = () => {},
    setIsInterviewActive = () => {},
    listening = false,
    // text, // Uncomment if you want to show recognized text
  } = useInterviewStore() as {
    isMuted?: boolean;
    isVideoOff?: boolean;
    setIsMuted?: (v: boolean) => void;
    setIsVideoOff?: (v: boolean) => void;
    setIsInterviewActive?: (v: boolean) => void;
    listening?: boolean;
    // text?: string;
  };

  return (
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
              onClick={() => setIsMuted && setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsVideoOff && setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={() => setIsInterviewActive && setIsInterviewActive(false)}
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
  );
}




type TestCase = {
  input: string;
  output: string;
};

type Question = {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  initialCode: string;
  testCases: TestCase[];
};

type CodeEditorProps = {
  currentQ: Question;
};

export function RightPanel({ currentQ }: any) {
  return (
    <>
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
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-200 font-mono min-h-[200px]">
              <pre>{currentQ?.initialCode}</pre>
            </div>
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
    </>
  );
}