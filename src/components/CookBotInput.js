import React, { useState } from "react";

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
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 text-white bg-[#4318D1] rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open CookBot"
      >
        {/* Chat SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12c0 3.866-3.582 7-8 7a8.96 8.96 0 01-3.13-.54l-4.37 1.31a1 1 0 01-1.26-1.26l1.31-4.37A8.96 8.96 0 013 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
          />
        </svg>
      </button>

      {/* Chat Widget Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-full h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
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
          {/* Purple Sidebar */}
          <div className="absolute left-0 top-0 h-full w-2 bg-indigo-700 rounded-l-2xl"></div>
          {/* Header */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-2">
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-700 rounded-full">
              <i className="fas fa-robot text-white text-xl"></i>
            </div>
            <span className="text-xl font-semibold text-indigo-700">CookBot</span>
          </div>
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-4 pt-2 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm whitespace-pre-line ${
                    msg.from === "bot"
                      ? "bg-gray-100 text-gray-900"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input Area */}
          <div className="px-6 py-4 bg-neutral-50 rounded-b-2xl flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="Type the message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button
              className="w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition"
              onClick={handleSend}
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookBotInput; 