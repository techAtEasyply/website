"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface CodeEditorProps {
  initialCode: string
}

export default function CodeEditor({ initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [lineNumbers, setLineNumbers] = useState(
    Array.from({ length: initialCode?.split("\n").length }, (_, i) => i + 1),
  )

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setCode(newCode)

    // Update line numbers
    const lines = newCode.split("\n").length
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1))
  }

  return (
    <div className="h-full bg-gray-900 flex">
      {/* Line Numbers */}
      <div className="bg-gray-800 px-3 py-4 text-gray-500 text-sm font-mono select-none border-r border-gray-700">
        {lineNumbers.map((num) => (
          <div key={num} className="leading-6 text-right">
            {num}
          </div>
        ))}
      </div>

      {/* Code Area */}
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full bg-transparent text-gray-100 font-mono text-sm p-4 resize-none outline-none leading-6"
          style={{
            tabSize: 4,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          }}
          spellCheck={false}
        />

        {/* Syntax highlighting overlay would go here in a real implementation */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-400"
          >
            JavaScript
          </motion.div>
        </div>
      </div>
    </div>
  )
}
