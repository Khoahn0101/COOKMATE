import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";
import RecipeCard from "./RecipeCard";
import { motion } from "framer-motion";
import { recipes as fallbackRecipes } from "../App";

const ingredientCategories = [
  { key: "chicken", label: "Chicken" },
  { key: "beef", label: "Beef" },
  { key: "fish", label: "Fish" },
  { key: "vegetables", label: "Vegetables" },
  { key: "eggs", label: "Eggs" },
  { key: "dairy", label: "Dairy" },
  { key: "vegan", label: "Vegan" },
  { key: "pasta", label: "Pasta" },
  { key: "rice", label: "Rice" },
  { key: "seafood", label: "Seafood" },
  { key: "pork", label: "Pork" },
  { key: "lamb", label: "Lamb" },
  { key: "turkey", label: "Turkey" },
  { key: "tofu", label: "Tofu" },
  { key: "beans", label: "Beans" },
];



const MealPlanner = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState("monday");
  const [selectedCategories, setSelectedCategories] = useState([]); // array of keys
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const [selectedBreakfast, setSelectedBreakfast] = useState("");
  const [selectedLunch, setSelectedLunch] = useState("");
  const [selectedDinner, setSelectedDinner] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes from API
  useEffect(() => {
    setAllRecipes(fallbackRecipes);
    setLoading(false);
  }, []);

  // Toggle ingredient category
  const toggleCategory = (key) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Filter recipes by selected categories
  const filterRecipes = (recipes) => {
    if (selectedCategories.length === 0) return recipes;
    return recipes.filter((r) =>
      r.tags && r.tags.some((tag) => selectedCategories.includes(tag.toLowerCase()))
    );
  };

  // Add/Remove recipe functions
  const handleAddBreakfast = () => {
    const recipe = allRecipes.find((r) => String(r.id) === selectedBreakfast);
    if (recipe && !breakfastRecipes.some((r) => r.id === recipe.id)) {
      setBreakfastRecipes([...breakfastRecipes, recipe]);
    }
  };
  const handleRemoveBreakfast = (id) => {
    setBreakfastRecipes(breakfastRecipes.filter((r) => r.id !== id));
  };
  const handleAddLunch = () => {
    const recipe = allRecipes.find((r) => String(r.id) === selectedLunch);
    if (recipe && !lunchRecipes.some((r) => r.id === recipe.id)) {
      setLunchRecipes([...lunchRecipes, recipe]);
    }
  };
  const handleRemoveLunch = (id) => {
    setLunchRecipes(lunchRecipes.filter((r) => r.id !== id));
  };
  const handleAddDinner = () => {
    const recipe = allRecipes.find((r) => String(r.id) === selectedDinner);
    if (recipe && !dinnerRecipes.some((r) => r.id === recipe.id)) {
      setDinnerRecipes([...dinnerRecipes, recipe]);
    }
  };
  const handleRemoveDinner = (id) => {
    setDinnerRecipes(dinnerRecipes.filter((r) => r.id !== id));
  };

  // Calculate total calories for the day
  const totalCalories = [...breakfastRecipes, ...lunchRecipes, ...dinnerRecipes].reduce(
    (sum, recipe) => sum + (recipe.nutrition?.calories || 0),
    0
  );
  const isSufficient = totalCalories >= 1800 && totalCalories <= 2200;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        className="flex-1 container mx-auto px-4 py-8 mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Meal Planner</h1>
          <p className="text-gray-600 text-lg">Plan your weekly meals and generate shopping lists</p>
        </div>

        {/* Days of the week */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-full font-medium transition text-sm ${activeDay === day.toLowerCase() ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-100"}`}
              onClick={() => setActiveDay(day.toLowerCase())}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Main Layout: Meals (left) and Shopping List (right) */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Meals Column */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Breakfast */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center mb-4">
                <i className="fas fa-egg text-orange-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Breakfast</h2>
              </div>
                    <select
                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={selectedBreakfast}
                    onChange={e => setSelectedBreakfast(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                {filterRecipes(allRecipes).map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
                    ))}
                  </select>
                  <Button
                className="w-full mb-4"
                    onClick={handleAddBreakfast}
                disabled={!selectedBreakfast}
                  >
                Add to Breakfast
                  </Button>
              <div className="w-full">
                {breakfastRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2 mb-2">
                    <div className="flex items-center">
                      <img src={recipe.image} alt={recipe.title} className="w-10 h-10 rounded-lg object-cover mr-3" />
                      <span className="font-medium text-gray-800">{recipe.title}</span>
                      <span className="ml-2 text-xs text-gray-500">{recipe.nutrition?.calories || 0} kcal</span>
                      </div>
                      <button
                      className="text-red-500 hover:text-red-700 text-lg"
                        onClick={() => handleRemoveBreakfast(recipe.id)}
                      >
                      <i className="fas fa-trash"></i>
                      </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Lunch */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center mb-4">
                <i className="fas fa-hamburger text-orange-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Lunch</h2>
              </div>
                  <select
                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={selectedLunch}
                    onChange={e => setSelectedLunch(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                {filterRecipes(allRecipes).map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
                    ))}
                  </select>
                  <Button
                className="w-full mb-4"
                    onClick={handleAddLunch}
                disabled={!selectedLunch}
                  >
                Add to Lunch
                  </Button>
              <div className="w-full">
                {lunchRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2 mb-2">
                    <div className="flex items-center">
                      <img src={recipe.image} alt={recipe.title} className="w-10 h-10 rounded-lg object-cover mr-3" />
                      <span className="font-medium text-gray-800">{recipe.title}</span>
                      <span className="ml-2 text-xs text-gray-500">{recipe.nutrition?.calories || 0} kcal</span>
                      </div>
                      <button
                      className="text-red-500 hover:text-red-700 text-lg"
                        onClick={() => handleRemoveLunch(recipe.id)}
                      >
                      <i className="fas fa-trash"></i>
                      </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Dinner */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center mb-4">
                <i className="fas fa-utensils text-orange-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Dinner</h2>
              </div>
                  <select
                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={selectedDinner}
                    onChange={e => setSelectedDinner(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                {filterRecipes(allRecipes).map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
                    ))}
                  </select>
                  <Button
                className="w-full mb-4"
                    onClick={handleAddDinner}
                disabled={!selectedDinner}
                  >
                Add to Dinner
                  </Button>
              <div className="w-full">
                {dinnerRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2 mb-2">
                    <div className="flex items-center">
                      <img src={recipe.image} alt={recipe.title} className="w-10 h-10 rounded-lg object-cover mr-3" />
                      <span className="font-medium text-gray-800">{recipe.title}</span>
                      <span className="ml-2 text-xs text-gray-500">{recipe.nutrition?.calories || 0} kcal</span>
                      </div>
                      <button
                      className="text-red-500 hover:text-red-700 text-lg"
                        onClick={() => handleRemoveDinner(recipe.id)}
                      >
                      <i className="fas fa-trash"></i>
                      </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Shopping List Column */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-shopping-cart text-orange-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Shopping List</h2>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {ingredientCategories.map(cat => (
                  <button
                    key={cat.key}
                    className={`px-4 py-2 rounded-full border font-medium transition text-sm select-none ${selectedCategories.includes(cat.key) ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-orange-50'}`}
                    onClick={() => toggleCategory(cat.key)}
                    type="button"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Total Calories Section */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center mb-2">
                <i className="fas fa-fire text-orange-500 text-xl mr-2"></i>
                <span className="text-lg font-semibold text-gray-800">Total Calories</span>
                  </div>
              <div className="text-2xl font-bold mb-2">{totalCalories} kcal</div>
              {isSufficient ? (
                <div className="flex items-center text-green-600 font-semibold">
                  <i className="fas fa-check-circle mr-2"></i> Sufficient for a day
                </div>
              ) : (
                <div className="flex items-center text-red-600 font-semibold">
                  <i className="fas fa-exclamation-triangle mr-2"></i> Not sufficient for a day
              </div>
            )}
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default MealPlanner; 