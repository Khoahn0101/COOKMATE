import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

const allRecipes = [
  {
    id: 1,
    name: "Baked Chicken Breasts",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 400,
    categories: ["chicken", "meat"],
  },
  {
    id: 2,
    name: "Oven Baked Chicken Breast",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    difficulty: "Medium",
    calories: 500,
    categories: ["chicken", "meat"],
  },
  {
    id: 3,
    name: "Grilled Salmon",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    difficulty: "Medium",
    calories: 600,
    categories: ["fish", "seafood"],
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 350,
    categories: ["vegetables", "vegan"],
  },
  {
    id: 5,
    name: "Egg Fried Rice",
    image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 450,
    categories: ["eggs", "rice", "vegetables"],
  },
  {
    id: 6,
    name: "Beef Stroganoff",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    difficulty: "Medium",
    calories: 700,
    categories: ["beef", "meat", "dairy"],
  },
  {
    id: 7,
    name: "Vegan Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 500,
    categories: ["vegan", "vegetables", "beans"],
  },
  {
    id: 8,
    name: "Tofu Stir Fry",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 400,
    categories: ["tofu", "vegan", "vegetables"],
  },
  {
    id: 9,
    name: "Classic Spaghetti Bolognese",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    difficulty: "Medium",
    calories: 650,
    categories: ["beef", "pasta"],
  },
  {
    id: 10,
    name: "Shrimp Scampi",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    difficulty: "Medium",
    calories: 550,
    categories: ["seafood", "fish", "pasta"],
  },
  {
    id: 11,
    name: "Greek Salad",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 300,
    categories: ["vegetables", "dairy"],
  },
  {
    id: 12,
    name: "Pork Chops with Apples",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    difficulty: "Medium",
    calories: 600,
    categories: ["pork", "meat"],
  },
  {
    id: 13,
    name: "Lamb Curry",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    difficulty: "Hard",
    calories: 800,
    categories: ["lamb", "meat"],
  },
  {
    id: 14,
    name: "Turkey Sandwich",
    image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=800&q=80",
    difficulty: "Easy",
    calories: 350,
    categories: ["turkey", "meat", "dairy"],
  },
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
      r.categories.some((cat) => selectedCategories.includes(cat))
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
    (sum, recipe) => sum + (recipe.calories || 0),
    0
  );
  const isSufficient = totalCalories >= 1800 && totalCalories <= 2200;

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
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Planner</h1>
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
              className={`px-4 py-2 rounded-full font-medium transition text-sm ${activeDay === day.toLowerCase() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
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
                <i className="fas fa-egg text-yellow-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Breakfast</h2>
              </div>
                    <select
                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedBreakfast}
                    onChange={e => setSelectedBreakfast(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                {filterRecipes(allRecipes).map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                    ))}
                  </select>
                  <button
                className="w-full mb-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={handleAddBreakfast}
                disabled={!selectedBreakfast}
                  >
                Add to Breakfast
                  </button>
              <div className="w-full">
                {breakfastRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2 mb-2">
                    <div className="flex items-center">
                      <img src={recipe.image} alt={recipe.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                      <span className="font-medium text-gray-800">{recipe.name}</span>
                      <span className="ml-2 text-xs text-gray-500">{recipe.calories || 0} kcal</span>
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
                <i className="fas fa-hamburger text-green-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Lunch</h2>
              </div>
                  <select
                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedLunch}
                    onChange={e => setSelectedLunch(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                {filterRecipes(allRecipes).map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                    ))}
                  </select>
                  <button
                className="w-full mb-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    onClick={handleAddLunch}
                disabled={!selectedLunch}
                  >
                Add to Lunch
                  </button>
              <div className="w-full">
                {lunchRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2 mb-2">
                    <div className="flex items-center">
                      <img src={recipe.image} alt={recipe.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                      <span className="font-medium text-gray-800">{recipe.name}</span>
                      <span className="ml-2 text-xs text-gray-500">{recipe.calories || 0} kcal</span>
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
                <i className="fas fa-utensils text-blue-500 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Dinner</h2>
              </div>
                  <select
                className="w-full mb-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDinner}
                    onChange={e => setSelectedDinner(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                {filterRecipes(allRecipes).map(recipe => (
                  <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                    ))}
                  </select>
                  <button
                className="w-full mb-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={handleAddDinner}
                disabled={!selectedDinner}
                  >
                Add to Dinner
                  </button>
              <div className="w-full">
                {dinnerRecipes.map(recipe => (
                  <div key={recipe.id} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2 mb-2">
                    <div className="flex items-center">
                      <img src={recipe.image} alt={recipe.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                      <span className="font-medium text-gray-800">{recipe.name}</span>
                      <span className="ml-2 text-xs text-gray-500">{recipe.calories || 0} kcal</span>
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
                <i className="fas fa-shopping-cart text-blue-600 text-2xl mr-2"></i>
                <h2 className="text-xl font-bold text-gray-800">Shopping List</h2>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {ingredientCategories.map(cat => (
                  <button
                    key={cat.key}
                    className={`px-4 py-2 rounded-full border font-medium transition text-sm select-none ${selectedCategories.includes(cat.key) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
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
                <i className="fas fa-fire text-red-500 text-xl mr-2"></i>
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
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

export default MealPlanner; 