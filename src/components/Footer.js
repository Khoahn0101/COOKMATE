import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-black text-white py-8 mt-16"
      aria-label="Footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CookMate</h3>
            <p className="text-gray-400">Your culinary companion for delicious recipes and cooking inspiration.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Recipes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Chef's Picks</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Forums</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61576333157776" className="text-gray-400 hover:text-white transition text-xl" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2F_cookmate%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExajNaekF2aUNYZE9UYWpEUQEe2I3yzITCcp4ZtAhddW7d_SxnxBb7t3H18YjA9xpR_G1lN5f-fn_VCvtnOPw_aem_iiRcDXB6S-DnBZcHQvNNSA&h=AT3fUYOrGpzoOwjXw6VCXLU6CcDrPDNPGpJwpvM3ZSjBi8OZRHdwkSEZ2y6jnizJweAwP73CwNIo8_ElMKfsH7JZeS22itzi6x5S5ENQm4Yq2Qrs--xxmWBLMBz8CBQajJxq" className="text-gray-400 hover:text-white transition text-xl" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 CookMate. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
} 