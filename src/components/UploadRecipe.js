import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const UploadRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleRemoveIngredient = (idx) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const handleAddInstruction = () => setInstructions([...instructions, ""]);
  const handleRemoveInstruction = (idx) => setInstructions(instructions.filter((_, i) => i !== idx));

  // Validation
  const isValid = title.trim() && ingredients.filter(i => i.trim()).length > 0 && instructions.filter(i => i.trim()).length > 0;

  const handleUpload = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center hover:opacity-80 transition">
              <i className="fas fa-utensils text-3xl text-blue-600 mr-2"></i>
              <h1 className="text-2xl font-bold text-gray-800">Cook<span className="text-blue-600">Mate</span></h1>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/upload" className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                <i className="fas fa-plus mr-2"></i> Add Recipe
              </Link>
              <Link to="/meal-planner" className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition">
                <i className="fas fa-calendar-alt mr-2"></i> Meal Planner
              </Link>
              <Link to="/login" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <i className="fas fa-user text-gray-700"></i>
              </Link>
            </div>
            <button className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <i className="fas fa-bars text-gray-700"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 mb-8 relative">
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
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Add a New Recipe</h1>
          <p className="text-gray-500 text-lg mb-6">Share your best dish with the CookMate community!</p>
          {/* Upload Photo */}
          <div className="flex flex-col items-center mb-8">
            <label className="flex flex-col items-center justify-center w-40 h-40 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-300 border-2 border-dashed border-blue-300">
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
            <span className="text-xs text-gray-400 mt-2">JPG, PNG, or GIF. Max 5MB.</span>
          </div>
          <form onSubmit={handleUpload} autoComplete="off">
            {/* Title & Description */}
            <div className="mb-6">
              <input
                className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-200 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Recipe Title (e.g. My best-ever pizza...)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-200 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <span className="text-xl font-semibold text-white bg-blue-600 rounded-2xl px-4 py-1 mr-2">Ingredients</span>
                <button type="button" className="ml-2 text-gray-400 hover:text-blue-600" onClick={handleAddIngredient} aria-label="Add ingredient">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center mb-2 gap-2">
                  <input
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <button type="button" className="text-red-500 hover:text-red-700 text-lg px-2" onClick={() => handleRemoveIngredient(idx)} aria-label="Remove ingredient">
                      <i className="fas fa-trash"></i>
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
                <span className="text-xl font-semibold text-white bg-blue-600 rounded-2xl px-4 py-1 mr-2">Instructions</span>
                <button type="button" className="ml-2 text-gray-400 hover:text-blue-600" onClick={handleAddInstruction} aria-label="Add instruction">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              {instructions.map((ins, idx) => (
                <div key={idx} className="flex items-center mb-2 gap-2">
                  <input
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <button type="button" className="text-red-500 hover:text-red-700 text-lg px-2" onClick={() => handleRemoveInstruction(idx)} aria-label="Remove instruction">
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
              ))}
              {touched && instructions.filter(i => i.trim()).length === 0 && <div className="text-red-500 text-sm mt-1">At least one instruction is required.</div>}
              <span className="text-xs text-gray-400">Add each step separately for clarity.</span>
            </div>
            <button
              className={`w-full py-3 text-lg font-semibold rounded-2xl shadow transition ${isValid ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              type="submit"
              disabled={!isValid}
            >
              Upload
            </button>
            {success && (
              <div className="mt-4 text-green-600 font-semibold flex items-center justify-center">
                <i className="fas fa-check-circle mr-2"></i> Recipe uploaded! Redirecting...
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><i className="fab fa-pinterest"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2025 CookMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UploadRecipe; 