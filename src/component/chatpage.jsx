import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import getChatCompletion from '../akash-api.mjs';
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
      chats: [],
      loading: false,
      typingText: "",
    };
  }

  handleSendPrompt = async () => {
    const { prompt } = this.state;

    if (!prompt.trim()) {
      alert("Prompt cannot be empty!");
      return;
    }

    const userMessage = { role: "user", content: prompt };
    this.setState((prevState) => ({
      chats: [...prevState.chats, userMessage],
      prompt: "",
      loading: true,
    }));

    try {
      const response = await getChatCompletion(prompt);
      const apiResponse = response.choices[0].message.content || "No response from API";

      let index = 0;
      let typingSpeed;

      if (apiResponse.length < 100) {
        typingSpeed = 50;
      } else if (apiResponse.length < 500) {
        typingSpeed = 20;
      } else {
        typingSpeed = 10;
      }

      const typingInterval = setInterval(() => {
        this.setState((prevState) => ({
          typingText: prevState.typingText + apiResponse.charAt(index),
        }));

        index++;
        if (index >= apiResponse.length) {
          clearInterval(typingInterval);
          this.setState((prevState) => ({
            chats: [...prevState.chats, { role: "bot", content: apiResponse }],
            typingText: "",
          }));
        }
      }, typingSpeed);
    } catch (error) {
      this.setState((prevState) => ({
        chats: [...prevState.chats, { role: "bot", content: "Error fetching response from API." }],
        typingText: "",
      }));
    }

    this.setState({ loading: false });
  };

  handlePromptChange = (event) => {
    this.setState({ prompt: event.target.value });
  };

  handleKeyDown = (event) => {
    const { prompt } = this.state;
    if (event.key === "Enter" && prompt.trim() !== "") {
      event.preventDefault();
      this.handleSendPrompt();
    }
  };

  logout = async () => {
    try {
      await signOut(auth); 
      alert("Successfully logged out.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  render() {
    const { prompt, chats, loading, typingText } = this.state;

    return (
      
      <div className="min-h-screen bg-white text-black flex flex-col items-center p-8">
        <div className="max-w-2xl w-full">
        <button
            onClick={this.logout}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition mb-4"
          >
          Logout
        </button>
          <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center">
            IChat
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md h-screen overflow-y-auto mb-4">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 p-2 rounded-lg ${
                  chat.role === "user"
                    ? "bg-gray-100 text-right"
                    : "bg-orange-200 text-left"
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
            onChange={this.handlePromptChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Enter your prompt here..."
            rows="6"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-lg"
          />
          <button
            onClick={this.handleSendPrompt}
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
  }
}

export default ChatPage;
