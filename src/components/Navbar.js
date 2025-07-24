import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black shadow-sm backdrop-blur"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/cookmate.jpg"
              alt="CookMate Logo"
              className="w-10 h-10 mr-2 inline-block rounded-full cursor-pointer"
            />
            <h1
              className="text-2xl font-bold text-white cursor-pointer"
            >
              Cook<span className="text-white">Mate</span>
            </h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4" role="navigation" aria-label="Main menu">
          <Link to="/upload" className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition" aria-label="Add Recipe">
            <i className="fas fa-plus mr-2"></i> Add Recipe
          </Link>
          <Link to="/meal-planner" className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition" aria-label="Meal Planner">
            <i className="fas fa-calendar-alt mr-2"></i> Meal Planner
          </Link>
          <Link to="/profile" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition" aria-label="Profile">
            <i className="fas fa-user text-gray-700"></i>
          </Link>
        </nav>
        <button className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition" aria-label="Open menu">
          <i className="fas fa-bars text-gray-700"></i>
        </button>
      </div>
    </motion.header>
  );
} 