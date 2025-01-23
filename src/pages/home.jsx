import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
  render(){
    return (

      <div className="min-h-screen bg-gradient-to-r from-orange-400 to-red-500 flex flex-col justify-center items-center text-white">
        
        <div className="text-center py-16 px-6 max-w-lg">
          <h1 className="text-4xl font-extrabold leading-tight mb-6">
            Welcome to Your Virtual Assistant
          </h1>
          <p className="text-lg mb-6">
            Get answers, explore information, and chat with our AI-powered assistant. Experience the future of communication.
          </p>
  
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200"
            >
              Start Chatting
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-orange-500 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
  
          <div className="mt-12 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose Our Chatbot?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transform transition-all duration-200">
                <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                <p>Our chatbot is always ready to help, no matter the time of day.</p>
              </div>
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transform transition-all duration-200">
                <h3 className="text-xl font-semibold mb-2">Instant Responses</h3>
                <p>Get instant answers to your questions without any delays.</p>
              </div>
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transform transition-all duration-200">
                <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
                <p>Our chatbot is designed to be simple and easy to use for everyone.</p>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <center>
            <p className= "">&copy; Copyright Juanda Gilang Purnomo</p>
          </center>
        </footer>
      </div>
    );
  };
}
 
export default Home;
