import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, onClick, type = "button", className = "", ariaLabel, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-full bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </motion.button>
  );
} 