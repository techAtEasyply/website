import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ll = {
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

export const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export const getQuestionText = (q: any) => {
    if (typeof q === "string") return q;
    if (q && typeof q === "object" && q.problem) return q.problem;
    return "";
  };