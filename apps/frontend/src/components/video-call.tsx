"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Bot, Mic } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useInterviewStore } from '@/store/useInterview'

export default function VideoCall() {
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videosuccess, setvideosuccess] = useState(true)
  const isVideoOff = useInterviewStore((state: any) => state.isVideoOff);

  // useEffect(() => {
  //   // Simulate AI speaking intervals
  //   const interval = setInterval(() => {
  //     setIsAISpeaking((prev) => !prev)
  //   }, 3000)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    // Get user media for video
    async function getMedia() {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
        setvideosuccess(true)
      } catch (error) {
        setvideosuccess(false)
        console.error("Error accessing media devices.", error);
      }
    }
    if (!isVideoOff) {
      getMedia();
    }
  }, [isVideoOff]);

  return (
    <div className="flex-1 p-4 space-y-4">
      {/* AI Interviewer */}
      <motion.div
        className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video"
        animate={{
          boxShadow: isAISpeaking ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <motion.div
            animate={{
              scale: isAISpeaking ? 1.1 : 1,
              rotate: isAISpeaking ? [0, 1, -1, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="w-20 h-20 border-4 border-blue-400">
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                <Bot className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        {/* AI Name Tag */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAISpeaking ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}></div>
          <span className="text-white text-sm font-medium">AI Interviewer</span>
          {isAISpeaking && <Mic className="w-3 h-3 text-green-400" />}
        </div>
      </motion.div>

      {/* User Video */}
      <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video">
        {/* If video is off, do not show the video element */}
        {!isVideoOff && videosuccess ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
            <div className='w-full h-full object-cover'>
          <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gray-500 text-white">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
          </div>
            </div>
        )}

        {/* User Name Tag */}
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-white text-sm font-medium">You</span>
        </div>
      </div>

      {/* Interview Progress */}
      <div className="bg-gray-700/50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Question 1 of 3</span>
          <span className="text-blue-400">Technical Round</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-2 rounded-full w-1/3 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  )
}
