import React from "react";
import { motion } from "framer-motion";

export default function Card({ image, title, children, onClick, className = "", alt = "", ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
      className={`relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer flex flex-col justify-end bg-white ${className}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={title}
      {...props}
    >
      {image && (
        <img
          src={image}
          alt={alt || title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          style={{ borderRadius: "1rem" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <div className="relative z-20 p-4 flex flex-col justify-end h-full">
        <h3 className="text-white text-xl font-bold mb-2 drop-shadow">{title}</h3>
        {children}
      </div>
    </motion.div>
  );
} 