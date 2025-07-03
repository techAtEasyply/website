import axios from "axios";
export async function callOpenAIApi(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        }
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error?.message || error.message || "Error communicating with OpenAI");
  }
}

export async function callGeminiApi(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          key: apiKey
        }
      }
    );
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error?.message || error.message || "Error communicating with Gemini API");
  }
}

