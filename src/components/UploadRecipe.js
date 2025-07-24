import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const UploadRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleRemoveIngredient = (idx) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const handleAddInstruction = () => setInstructions([...instructions, ""]);
  const handleRemoveInstruction = (idx) => setInstructions(instructions.filter((_, i) => i !== idx));

  // Validation
  const isValid = title.trim() && ingredients.filter(i => i.trim()).length > 0 && instructions.filter(i => i.trim()).length > 0;

  const handleUpload = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    setLoading(true);
    try {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error('Error uploading recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <motion.main 
        className="flex-1 flex flex-col items-center py-10 pt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mb-8 relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
            onClick={() => navigate(-1)}
            aria-label="Close Upload Recipe"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Add a New Recipe</h1>
          <p className="text-gray-500 text-lg mb-6">Share your best dish with the CookMate community!</p>
          
          {/* Upload Photo */}
          <div className="flex flex-col items-center mb-8">
            <label className="flex flex-col items-center justify-center w-40 h-40 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 border-2 border-dashed border-orange-300 transition">
              {photo ? (
                <img src={URL.createObjectURL(photo)} alt="Recipe" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-gray-400">Upload recipe photo</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={e => setPhoto(e.target.files[0])} />
            </label>
            <span className="text-xs text-gray-400 mt-2">JPG, PNG, or GIF. Max 5MB.</span>
          </div>
          
          <form onSubmit={handleUpload} autoComplete="off">
            {/* Title & Description */}
            <div className="mb-6">
              <input
                className="w-full mb-3 px-4 py-3 rounded-lg border border-gray-200 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Recipe Title (e.g. My best-ever pizza...)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Share a little more about this dish. What or who inspired you to cook it? What makes it special? ..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
              {touched && !title.trim() && <div className="text-red-500 text-sm mt-1">Title is required.</div>}
            </div>
            
            <hr className="my-6" />
            
            {/* Ingredients */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-xl font-semibold text-white bg-orange-500 rounded-2xl px-4 py-1 mr-2">Ingredients</span>
                <button 
                  type="button" 
                  className="ml-2 text-gray-400 hover:text-orange-500 transition" 
                  onClick={handleAddIngredient} 
                  aria-label="Add ingredient"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center mb-2 gap-2">
                  <input
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    placeholder={`Ingredient ${idx + 1}`}
                    value={ing}
                    onChange={e => {
                      const newIngredients = [...ingredients];
                      newIngredients[idx] = e.target.value;
                      setIngredients(newIngredients);
                    }}
                    required
                  />
                  {ingredients.length > 1 && (
                    <button 
                      type="button" 
                      className="text-red-500 hover:text-red-700 text-lg px-2 transition" 
                      onClick={() => handleRemoveIngredient(idx)} 
                      aria-label="Remove ingredient"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {touched && ingredients.filter(i => i.trim()).length === 0 && <div className="text-red-500 text-sm mt-1">At least one ingredient is required.</div>}
              <span className="text-xs text-gray-400">Add each ingredient separately for clarity.</span>
            </div>
            
            <hr className="my-6" />
            
            {/* Instructions */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <span className="text-xl font-semibold text-white bg-orange-500 rounded-2xl px-4 py-1 mr-2">Instructions</span>
                <button 
                  type="button" 
                  className="ml-2 text-gray-400 hover:text-orange-500 transition" 
                  onClick={handleAddInstruction} 
                  aria-label="Add instruction"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {instructions.map((ins, idx) => (
                <div key={idx} className="flex items-center mb-2 gap-2">
                  <input
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    placeholder={`Step ${idx + 1}`}
                    value={ins}
                    onChange={e => {
                      const newInstructions = [...instructions];
                      newInstructions[idx] = e.target.value;
                      setInstructions(newInstructions);
                    }}
                    required
                  />
                  {instructions.length > 1 && (
                    <button 
                      type="button" 
                      className="text-red-500 hover:text-red-700 text-lg px-2 transition" 
                      onClick={() => handleRemoveInstruction(idx)} 
                      aria-label="Remove instruction"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {touched && instructions.filter(i => i.trim()).length === 0 && <div className="text-red-500 text-sm mt-1">At least one instruction is required.</div>}
              <span className="text-xs text-gray-400">Add each step separately for clarity.</span>
            </div>
            
            <button
              className={`w-full py-3 text-lg font-semibold rounded-2xl shadow transition ${
                isValid && !loading 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              type="submit"
              disabled={!isValid || loading}
            >
              {loading ? "Uploading..." : "Upload Recipe"}
            </button>
            
            {success && (
              <div className="mt-4 text-green-600 font-semibold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recipe uploaded! Redirecting...
              </div>
            )}
          </form>
        </div>
      </motion.main>
    </div>
  );
};

export default UploadRecipe;