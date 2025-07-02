import { Request, Response } from "express";
import axios from "axios";
import { callGeminiApi } from '../lib/apiCall';
import { techPrompt } from '../lib/genericPrompt';
import { generateInterviewPrompt } from '../lib/genericPrompt';

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
    let jsonString = response;
    let match = response.match(/```json\s*([\s\S]*?)\s*```/i);
    if (!match) {
      // Try generic code block
      match = response.match(/```([\s\S]*?)```/);
    }
    if (match) {
      jsonString = match[1];
    }

    let questionJson;
    try {
      questionJson = JSON.parse(jsonString);
    } catch (e) {
      // If parsing fails, return the raw response as fallback
      return res.status(200).json({ raw: response, error: "Failed to parse JSON from model response." });
    }

    res.status(200).json(questionJson);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to generate technical interview question" });
  }
}