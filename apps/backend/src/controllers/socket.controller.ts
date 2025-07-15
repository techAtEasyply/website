import { Socket } from 'socket.io';
import { callGeminiApi } from '../lib/apiCall';
import { generateIntroPrompt } from '../lib/utils';
import { jsonparse } from '../lib/utils';
import { generateAudioFromText , generatePrompt } from '../lib/utils';
import { io } from '../lib/socket';
import { webReadableStreamToBuffer } from '../lib/utils'; // <-- imported here

// The socket instance is passed as 'this' when using socket.io event handlers
export async function introduction(this: Socket, payload: any) {
  const { question } = payload;
  const prompt = generateIntroPrompt(question);
  const response = await callGeminiApi(prompt);
  const final = jsonparse(response);
  let audioStream;
  try {
    audioStream = await generateAudioFromText(final.response);
    // streamToBuffer returns a Promise, so we need to await it
    //@ts-ignore
    const audioBuffer = await webReadableStreamToBuffer(audioStream);
    this.emit('introduction', {
      text: final.response,
      //@ts-ignore
      audio: audioBuffer.toString('base64'),
    });
  } catch (err) {
    console.error('Error generating audio:', err);
    this.emit('introduction_error', { message: 'Failed to generate audio.' });
    return;
  }
}

export async function evaluateAns(this: Socket, payload: any){
  const { currentQuestion, answer, followupQuestion } = payload
  console.log(currentQuestion, answer, followupQuestion)
  const raw = generatePrompt(currentQuestion, answer, followupQuestion)
  const raww = await callGeminiApi(raw);
  const final = jsonparse(raww);
  console.log('this is the gemini response ->', final.response);
  let audioStream;
  try {
    audioStream = await generateAudioFromText(final.response);
    // streamToBuffer returns a Promise, so we need to await it
    //@ts-ignore
    const audioBuffer = await webReadableStreamToBuffer(audioStream);
    this.emit('evaluate', {
      text: final.response,
      //@ts-ignore
      audio: audioBuffer.toString('base64'),
    });
  } catch (err) {
    console.error('Error generating audio:', err);
    this.emit('introduction_error', { message: 'Failed to generate audio.' });
    return;
  }
}

