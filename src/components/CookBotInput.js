import React, { useState } from "react";
// import Navbar from "./Navbar";
import Button from "./Button";
import { motion } from "framer-motion";

const CookBotInput = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  // Example chat history for UI
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! I am your AI cooking assistant, here to help you create delicious meals with ease. Let me know your ingredients or preferences, and I'll suggest the perfect recipe for you!"
    },
    {
      from: "user",
      text: "I have chicken, garlic, pepper for dinner! What should I cook?"
    },
    {
      from: "bot",
      text: "You have a lot of delicious options! Here are some ideas depending on your preference:\n• Quick & Easy: Garlic Butter Chicken Breast\n• Savory & Comforting: Chicken Curry\n• Crispy & Crunchy: Fried Chicken\nWhat would you prefer to cook?"
    },
    {
      from: "user",
      text: "I would love the Garlic Butter Chicken Breast! Give me the recipe for this."
    },
    {
      from: "bot",
      text: "Here's a simple recipe for Garlic Butter Chicken Breast... (etc)"
    }
  ]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 text-white bg-gradient-to-br from-orange-500 to-orange-400 rounded-full shadow-2xl cursor-pointer hover:scale-105 hover:shadow-orange-400 transition-all duration-200"
        onClick={() => setOpen(true)}
        aria-label="Open CookBot"
        style={{ boxShadow: '0 8px 32px 0 rgba(255,115,43,0.18)' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12c0 3.866-3.582 7-8 7a8.96 8.96 0 01-3.13-.54l-4.37 1.31a1 1 0 01-1.26-1.26l1.31-4.37A8.96 8.96 0 013 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
          />
        </svg>
      </motion.button>

      {/* Chat Widget Panel */}
      {open && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 w-96 max-w-full h-[500px] bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-2xl flex flex-col border border-orange-100 animate-fadeInSlideUp"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
            onClick={() => setOpen(false)}
            aria-label="Close CookBot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Orange Sidebar */}
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-orange-500 to-orange-400 rounded-l-2xl"></div>
          {/* Header */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-2">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 rounded-full shadow">
              <i className="fas fa-robot text-white text-2xl"></i>
            </div>
            <span className="text-2xl font-bold text-orange-600">CookBot</span>
          </div>
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-4 pt-2 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl px-6 py-4 max-w-[80%] whitespace-pre-line shadow-sm transition-all duration-200 animate-fadeInBubble leading-relaxed break-words hyphens-auto ${
                    msg.from === "bot"
                      ? "bg-white text-gray-900 border border-orange-100 text-base font-medium"
                      : "bg-gradient-to-br from-orange-500 to-orange-400 text-white border border-orange-200 text-[1.05rem] font-semibold"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input Area */}
          <div className="px-6 py-4 bg-white rounded-b-2xl flex items-center gap-2 border-t border-orange-100">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              aria-label="Type your message"
            />
            <Button
              className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 rounded-full text-white hover:scale-105 hover:bg-orange-600 transition-all duration-200 shadow"
              onClick={handleSend}
              ariaLabel="Send message"
              style={{ minWidth: 0, padding: 0 }}
            >
              <i className="fas fa-paper-plane text-lg"></i>
            </Button>
          </div>
        </motion.div>
      )}
      {/* Animations */}
      <style>{`
        @keyframes fadeInSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 0.4s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInBubble {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInBubble {
          animation: fadeInBubble 0.25s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </>
  );
};

export default CookBotInput; 