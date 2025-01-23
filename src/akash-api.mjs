import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://chatapi.akash.network/api/v1',
  headers: {
    'Authorization': 'Bearer sk-ZOaKpklcCTD7_5VW1Ef1bA',
    'Content-Type': 'application/json'
  }
});

const getChatCompletion = async (prompt) => {
  try {
    const response = await apiClient.post('/chat/completions', {
      model: "Meta-Llama-3-1-8B-Instruct-FP8",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getChatCompletion;