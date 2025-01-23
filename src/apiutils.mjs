//Juanda Gilang Purnomo
import axios from "axios";
export async function getGroqChatCompletion(prompt) {
  const API_KEY = "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";
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  try {
    const response = await axios.post(
      API_URL,
      {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192", 
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error calling Groq API:", error.response?.data || error.message);
    throw new Error("Failed to fetch response from Groq API.");
  }
}
