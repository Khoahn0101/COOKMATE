import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleAddInstruction = () => setInstructions([...instructions, ""]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8 mb-8 relative">
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
        <h1 className="text-3xl font-bold text-[#4318D1] mb-2">Upload Your Recipe</h1>
        <p className="text-gray-500 text-lg mb-6">Share your best dish with the CookMate community!</p>
        {/* Upload Photo */}
        <div className="flex flex-col items-center mb-8">
          <label className="flex flex-col items-center justify-center w-40 h-40 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300">
            {photo ? (
              <img src={URL.createObjectURL(photo)} alt="Recipe" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span className="text-gray-400">Upload recipe photo</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={e => setPhoto(e.target.files[0])} />
          </label>
        </div>
        {/* Title & Description */}
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-200 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
          placeholder="Title: My best-ever pizza..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-200 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
          placeholder="Share a little more about this dish. What or who inspired you to cook it? What makes it special? ..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
        {/* Ingredients */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="text-xl font-semibold text-white bg-[#4318D1] rounded-2xl px-4 py-1 mr-2">Ingredients</span>
            <button type="button" className="ml-2 text-[#999] hover:text-[#4318D1]" onClick={handleAddIngredient} aria-label="Add ingredient">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
          {ingredients.map((ing, idx) => (
            <input
              key={idx}
              className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
              placeholder="Ingredient"
              value={ing}
              onChange={e => {
                const newIngredients = [...ingredients];
                newIngredients[idx] = e.target.value;
                setIngredients(newIngredients);
              }}
            />
          ))}
        </div>
        {/* Instructions */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="text-xl font-semibold text-white bg-[#4318D1] rounded-2xl px-4 py-1 mr-2">Instructions</span>
            <button type="button" className="ml-2 text-[#999] hover:text-[#4318D1]" onClick={handleAddInstruction} aria-label="Add instruction">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
          {instructions.map((ins, idx) => (
            <input
              key={idx}
              className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
              placeholder="Instruction"
              value={ins}
              onChange={e => {
                const newInstructions = [...instructions];
                newInstructions[idx] = e.target.value;
                setInstructions(newInstructions);
              }}
            />
          ))}
        </div>
        {/* Upload Button */}
        <button className="w-full py-3 bg-[#7CD681] text-white text-lg font-semibold rounded-2xl shadow hover:bg-green-500 transition">Upload</button>
      </div>
    </div>
  );
};

export default UploadRecipe; 