import React, { useState, useEffect } from "react";
import { getGroqChatCompletion } from "../apiutils";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState(""); 

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      alert("Prompt cannot be empty!");
      return;
    }

    const userMessage = { role: "user", content: prompt };
    setChats((prevChats) => [...prevChats, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const data = await getGroqChatCompletion(prompt);
      const apiResponse = data.choices[0]?.message?.content || "No response from API";

        let index = 0;
        let typingSpeed;
        if (apiResponse.length < 100) {
          typingSpeed = 50; // Fast typing speed for short responses
        } else if (apiResponse.length < 500) {
          typingSpeed = 20; // Medium typing speed for medium-length responses
        } else {
          typingSpeed = 10; // Slow typing speed for long responses
        }
        const typingInterval = setInterval(() => {
          setTypingText((prev) => prev + apiResponse.charAt(index));
          index++;
          if (index >= apiResponse.length) {
            clearInterval(typingInterval);
            setChats((prevChats) => [
              ...prevChats,
              { role: "bot", content: apiResponse },
            ]);
            setTypingText("");
          }
        }, typingSpeed);
      } catch (error) {
        setChats((prevChats) => [
          ...prevChats,
          { role: "bot", content: "Error fetching response from API." },
        ]);
        setTypingText("");
      }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-8">
      <div className="max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center">
          Chat with Groq API
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md h-screen overflow-y-auto mb-4">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg ${
                chat.role === "user"
                  ? "bg-orange-100 text-right"
                  : "bg-orange-50 text-left"
              }`}
            >
              {chat.content && (
                <ReactMarkdown
                  children={DOMPurify.sanitize(chat.content)}
                  className="text-lg"
                />
              )}
            </div>
          ))}
          {typingText && (
            <div className="bg-orange-50 text-left p-2 rounded-lg mb-4">
              <ReactMarkdown
                children={DOMPurify.sanitize(typingText)}
                className="text-lg text-gray-600"
              />
            </div>
          )}
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="6"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-lg"
        />
        <button
          onClick={handleSendPrompt}
          disabled={loading}
          className={`mt-4 w-full py-3 text-lg font-semibold rounded-lg transition ${
            loading
              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {loading ? "Sending..." : "Send Prompt"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;