import { Socket } from 'socket.io';
import { callOllamaApi } from '../lib/apiCall';
import { generateIntroPrompt } from '../lib/utils';
import { jsonparse } from '../lib/utils';
import { generateAudioFromText , generatePrompt } from '../lib/utils';
import { io } from '../lib/socket';

// The socket instance is passed as 'this' when using socket.io event handlers
export async function introduction(this: Socket, payload: any) {
  const { question } = payload;
  const prompt = generateIntroPrompt(question);
  const response = await callOllamaApi(prompt);
  const final = jsonparse(response);
  try {
    const audioBuffer = await generateAudioFromText(final.response);
    this.emit('introduction', {
      text: final.response,
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
  const raww = await callOllamaApi(raw);
  const final = jsonparse(raww);
  console.log('this is the gemini response ->', final.response);
  try {
    const audioBuffer = await generateAudioFromText(final.response);
    this.emit('evaluate', {
      text: final.response,
      audio: audioBuffer.toString('base64'),
    });
  } catch (err) {
    console.error('Error generating audio:', err);
    this.emit('introduction_error', { message: 'Failed to generate audio.' });
    return;
  }
}

