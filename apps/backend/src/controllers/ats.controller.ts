import fs from "fs";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

function fileToBase64(filePath: string): string {
  const file = fs.readFileSync(filePath);
  return file.toString("base64");
}

function cleanupFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Error cleaning up file:", err);
  }
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const analyzeResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  let resumePath: string | null = null;
  try {
    if (!req.file) {
      res.status(400).json({ error: "No resume file uploaded" });
      return;
    }
    if (!req.body.jobDescription) {
      res.status(400).json({ error: "Job description is required" });
      return;
    }
    resumePath = req.file.path;
    const jobDescription: string = req.body.jobDescription;
    const promptType: string = req.body.promptType || "detailed";
    const pdfBase64: string = fileToBase64(resumePath);
    const detailedPrompt = `
You are an expert Technical Human Resource Manager. Carefully review the provided resume and compare it to the job description below.

Job Description:
${jobDescription}

Provide a detailed, professional evaluation including:
1. How well the candidate's experience aligns with job requirements
2. Specific strengths and relevant skills
3. Areas for improvement or missing qualifications
4. Actionable feedback for the candidate
5. Overall recommendation

Format your response clearly with sections for each point.
    `;
    const percentagePrompt = `
You are an advanced ATS (Applicant Tracking System) analyzing this resume against the job description below.

Job Description:
${jobDescription}

Provide:
1. Percentage match score (0-100%)
2. List of missing keywords/skills
3. Present skills that match the job
4. Suggestions to improve match score
5. Final recommendation

Format as:
MATCH SCORE: X%
MISSING KEYWORDS: [list]
MATCHING SKILLS: [list]
RECOMMENDATIONS: [suggestions]
FINAL THOUGHTS: [summary]
    `;
    const prompt =
      promptType === "percentage" ? percentagePrompt : detailedPrompt;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        },
      },
    ]);
    const response = result.response;
    const analysis = response.text();
    res.json({
      success: true,
      analysis: analysis,
      promptType: promptType,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Error analyzing resume:", err);
    res.status(500).json({
      error: "Failed to analyze resume",
      details: err.message,
    });
  } finally {
    if (resumePath) {
      cleanupFile(resumePath);
    }
  }
};
