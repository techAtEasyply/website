
import axios from 'axios';

import dotenv from 'dotenv';
import { ElevenLabsClient, play } from "elevenlabs";
import { Buffer } from 'buffer';
export function generatePrompt(question : string, answer : string, followUpQuestion : string) {
  return `
You're a friendly and professional interviewer.

Here’s the setup:
- Question: "${question}"
- Candidate's Answer: "${answer}"
- Next follow-up question to ask: "${followUpQuestion}"

Your task:
- Write a single, natural, human-like response that includes:
  1. A brief review of the answer.
  2. A smooth, connected follow-up question.
- The full message should flow like a conversation — do not make it feel like two separate parts.
- Return the output in **only this JSON format**:

{
  "response": "<your connected message including review and follow-up question>"
}

Example:
{
  "response": "That's a great answer with clear goals and enthusiasm. I'm curious — what motivated you to pursue a career in software engineering?"
}
`;
}


function generateCodingPrompt(problem : any, userAnswer: string) {
  return `
You're acting as a DSA/coding interviewer.

Here's the context:
- Problem: "${problem.problem}"
- Input: ${problem.input}
- Expected Output: ${problem.output}
- Candidate's Code / Answer: "${userAnswer}"

Your task is:
- Write a **connected, natural message** that:
  1. Briefly reviews the candidate’s code/logic.
  2. Then, **ask a relevant follow-up question** based on this context.
     This follow-up could involve:
     - Asking about the time/space complexity
     - Whether the candidate considered edge cases
     - How they'd handle a modified version of the problem (e.g., sorted array, duplicates allowed, negative numbers included, multiple solutions)
     - Or request them to slightly change or optimize their approach

Only return this in **JSON format**:

{
  "response": "<connected review + relevant follow-up>"
}

Example output:
{
  "response": "You’ve correctly identified the two numbers that sum to the target, and your approach works well for this input. If we modify the problem to return all possible pairs instead of just one, how would you update your solution?"
}
`;
}

export function generateIntroPrompt(question : string) {
  return `
You are acting as a **professional technical interviewer** from a reputable tech company.

Your task is to:
1. Start the conversation by **introducing yourself** using a friendly, realistic tone with a fake name (e.g., "Hi, I'm Rahul from XYZ Tech").
2. Mention your role (like "I'm a software engineer" or "technical interviewer at XYZ").
3. Politely explain what the candidate should expect in the interview.
4. Then, **smoothly transition into the following question**, making the conversation feel natural and connected.

ONLY return your result in this JSON format:
{
  "response": "<your full introduction followed by the first question in a conversational, connected way>"
}

Here’s the question you’ll be asking:
"${question}"
`;
}



dotenv.config();

export async function generateAudioFromText(text: string) {

  console.log(process.env.ELEVEN_LABS_API_KEY)
  const client = new ElevenLabsClient({ apiKey: process.env.ELEVEN_LABS_API_KEY });
  try {

    if (!process.env.VOICE_ID) {
      console.log("voice id not defined")
      return
    }
    const audioStream = await client.textToSpeech.convert(process.env.VOICE_ID, {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128"
    });
    console.log("Audio stream received.");
    return audioStream
  } catch (error : any) {
    console.error('Error generating audio:', error.message);
    throw new Error('Audio generation failed');
  }

}


export function jsonparse(data : string) {
  let jsonString = data;
    let match = data.match(/```json\s*([\s\S]*?)\s*```/i);
    if (!match) {
      // Try generic code block
      match = data.match(/```([\s\S]*?)```/);
    }
    if (match) {
      jsonString = match[1];
    }

    let questionJson;
    try {
      questionJson = JSON.parse(jsonString);
    } catch (e) {
      // If parsing fails, return the raw data as fallback
      console.log('error in json parsing')
    }

  return questionJson
}


export async function webReadableStreamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}






