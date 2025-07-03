import { Request, Response } from "express";
import axios from "axios";
import { callGeminiApi } from '../lib/apiCall';
import { techPrompt } from '../lib/genericPrompt';
import { generateInterviewPrompt } from '../lib/genericPrompt';
import {jsonparse} from '../lib/utils'

export const evaluate = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  // console.log(prompt)

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }
  const data = await callGeminiApi(prompt)
  res.status(200).json({response : data});
}

export const techInterview = async (req: Request, res: Response) => {
  const { feild, difficulty } = req.body;

  if (!feild || !difficulty) {
    return res.status(400).json({ message: "Field and difficulty are required" });
  }
  const prompt = generateInterviewPrompt(feild, difficulty);

  try {
    const response = await callGeminiApi(prompt);

    // Try to extract JSON from markdown code block if present
    const questionJson = jsonparse(response)
    res.status(200).json(questionJson);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to generate technical interview question" });
  }
}