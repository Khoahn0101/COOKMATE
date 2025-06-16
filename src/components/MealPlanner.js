import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const allRecipes = [
  {
    id: 1,
    name: "Baked Chicken Breasts",
    image:
      "https://readdy.ai/api/search-image?query=Baked%20chicken%20breasts%20with%20herbs%20and%20spices%20on%20a%20white%20plate%2C%20juicy%20and%20tender%20meat%20with%20golden%20crust%2C%20garnished%20with%20fresh%20rosemary%20and%20lemon%20slices%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting%20and%20simple%20elegant%20background&width=400&height=200&seq=10&orientation=landscape",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Oven Baked Chicken Breast",
    image:
      "https://readdy.ai/api/search-image?query=Oven%20baked%20chicken%20breast%20with%20herbs%20and%20spices%2C%20sliced%20to%20show%20juicy%20interior%2C%20served%20on%20a%20rustic%20wooden%20board%20with%20roasted%20vegetables%2C%20professional%20food%20photography%20with%20warm%20lighting%20and%20simple%20elegant%20background&width=400&height=200&seq=11&orientation=landscape",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    image:
      "https://readdy.ai/api/search-image?query=Grilled%20salmon%20fillet%20with%20lemon%20and%20herbs%2C%20perfectly%20cooked%20with%20crispy%20skin%2C%20served%20on%20a%20white%20plate%20with%20fresh%20vegetables%2C%20professional%20food%20photography%20with%20natural%20lighting%20and%20simple%20elegant%20background&width=400&height=200&seq=12&orientation=landscape",
    difficulty: "Medium",
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    image:
      "https://readdy.ai/api/search-image?query=Colorful%20vegetable%20stir%20fry%20with%20bell%20peppers%2C%20broccoli%2C%20carrots%20and%20snap%20peas%20in%20a%20savory%20sauce%2C%20served%20in%20a%20white%20bowl%2C%20healthy%20vegan%20meal%2C%20professional%20food%20photography%20with%20bright%20lighting%20and%20simple%20elegant%20background&width=400&height=200&seq=13&orientation=landscape",
    difficulty: "Easy",
  },
];

const MealPlanner = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("planner");
  const [activeDay, setActiveDay] = useState("monday");
  const [activePlanType, setActivePlanType] = useState("weekly");
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "eggs flour", checked: false },
    { id: 2, name: "tomatoes", checked: false },
    { id: 3, name: "chicken breast", checked: false },
  ]);
  const [showRecipeFilter, setShowRecipeFilter] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedMealType, setSelectedMealType] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");

  // Meals state
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [lunchRecipes, setLunchRecipes] = useState([]);
  const [dinnerRecipes, setDinnerRecipes] = useState([]);
  const [selectedBreakfast, setSelectedBreakfast] = useState("");
  const [selectedLunch, setSelectedLunch] = useState("");
  const [selectedDinner, setSelectedDinner] = useState("");

  const addIngredient = () => {
    const newIngredient = {
      id: ingredients.length + 1,
      name: "",
      checked: false,
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const toggleIngredientCheck = (id) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient
      )
    );
  };

  const handleIngredientChange = (id, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, name: value } : ingredient
      )
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          CookMate
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-full cursor-pointer"
            onClick={() => navigate("/")}
          >
            Recipe Gallery
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-full cursor-pointer"
            onClick={() => navigate("/planner")}
          >
            Meal Planner
          </button>
        </div>
        <div className="relative flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-search text-gray-500"></i>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <button className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
              <span>EN</span>
              <i className="ml-1 fas fa-chevron-down text-xs"></i>
            </button>
          </div>
          <button className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
            Sign in
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-6 py-8 mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
          <p className="mt-2 text-gray-600">
            Plan your weekly meals and generate shopping lists
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex mb-6 space-x-4 overflow-x-auto">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeTab === "all" ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"}`}
            onClick={() => {
              setActiveTab("all");
              navigate("/");
            }}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeTab === "recipe" ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"}`}
            onClick={() => {
              setActiveTab("recipe");
              navigate("/");
            }}
          >
            Recipe Gallery
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeTab === "planner" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => {
              setActiveTab("planner");
              navigate("/planner");
            }}
          >
            Meal Planner
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeTab === "upload" ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Your Recipe
          </button>
        </div>

        {/* Plan Type Selector */}
        <div className="flex mb-6 space-x-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activePlanType === "weekly" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActivePlanType("weekly")}
          >
            Weekly Plan
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activePlanType === "monthly" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActivePlanType("monthly")}
          >
            Monthly Plan
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activePlanType === "longterm" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActivePlanType("longterm")}
          >
            Long-term Prep
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex mb-8 space-x-3 overflow-x-auto">
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
            "aboutyou",
          ].map((day) => (
            <button
              key={day}
              className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeDay === day ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
              onClick={() => setActiveDay(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Meal Planning */}
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {activeDay.charAt(0).toUpperCase() + activeDay.slice(1)}'s Meals
              </h2>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap"
                  onClick={() => setShowRecipeFilter(!showRecipeFilter)}
                >
                  <i className="fas fa-filter mr-2"></i>Filter
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showRecipeFilter && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cuisine Type
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedCuisine}
                      onChange={(e) => setSelectedCuisine(e.target.value)}
                    >
                      <option value="all">All Cuisines</option>
                      <option value="italian">Italian</option>
                      <option value="asian">Asian</option>
                      <option value="american">American</option>
                      <option value="mexican">Mexican</option>
                      <option value="indian">Indian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meal Type
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedMealType}
                      onChange={(e) => setSelectedMealType(e.target.value)}
                    >
                      <option value="all">All Meals</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dietary Restrictions
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedDiet}
                      onChange={(e) => setSelectedDiet(e.target.value)}
                    >
                      <option value="all">No Restrictions</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="glutenFree">Gluten Free</option>
                      <option value="dairyFree">Dairy Free</option>
                      <option value="keto">Keto</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-full mr-2 cursor-pointer !rounded-button whitespace-nowrap">
                    Reset
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Meal Time Sections */}
            <div className="space-y-6">
              {/* Breakfast Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Breakfast
                </h3>
                <div className="mb-2 flex gap-2">
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={selectedBreakfast}
                    onChange={e => setSelectedBreakfast(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                    {allRecipes.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                  <button
                    className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer"
                    onClick={handleAddBreakfast}
                  >
                    Add Recipe
                  </button>
                </div>
                {breakfastRecipes.length === 0 && (
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    <span className="text-gray-400">No recipes added.</span>
                  </div>
                )}
                {breakfastRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white border rounded-lg overflow-hidden mb-3 flex">
                    <div className="w-1/4 h-24 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="w-3/4 p-4 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-gray-900">{recipe.name}</h4>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{recipe.difficulty}</span>
                      </div>
                      <button
                        className="mt-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full cursor-pointer"
                        onClick={() => handleRemoveBreakfast(recipe.id)}
                      >
                        Remove Dish
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lunch Section */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Lunch
                </h3>
                <div className="mb-2 flex gap-2">
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={selectedLunch}
                    onChange={e => setSelectedLunch(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                    {allRecipes.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                  <button
                    className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer"
                    onClick={handleAddLunch}
                  >
                    Add Recipe
                  </button>
                </div>
                {lunchRecipes.length === 0 && (
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    <span className="text-gray-400">No recipes added.</span>
                  </div>
                )}
                {lunchRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white border rounded-lg overflow-hidden mb-3 flex">
                    <div className="w-1/4 h-24 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="w-3/4 p-4 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-gray-900">{recipe.name}</h4>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{recipe.difficulty}</span>
                      </div>
                      <button
                        className="mt-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full cursor-pointer"
                        onClick={() => handleRemoveLunch(recipe.id)}
                      >
                        Remove Dish
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dinner Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Dinner
                </h3>
                <div className="mb-2 flex gap-2">
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={selectedDinner}
                    onChange={e => setSelectedDinner(e.target.value)}
                  >
                    <option value="">Select a recipe</option>
                    {allRecipes.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                  <button
                    className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer"
                    onClick={handleAddDinner}
                  >
                    Add Recipe
                  </button>
                </div>
                {dinnerRecipes.length === 0 && (
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    <span className="text-gray-400">No recipes added.</span>
                  </div>
                )}
                {dinnerRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white border rounded-lg overflow-hidden mb-3 flex">
                    <div className="w-1/4 h-24 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="w-3/4 p-4 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-gray-900">{recipe.name}</h4>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{recipe.difficulty}</span>
                      </div>
                      <button
                        className="mt-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full cursor-pointer"
                        onClick={() => handleRemoveDinner(recipe.id)}
                      >
                        Remove Dish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Ingredient List */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Ingredient List
                </h2>
                <button
                  onClick={addIngredient}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Add Ingredient
                </button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`ingredient-${ingredient.id}`}
                      checked={ingredient.checked}
                      onChange={() => toggleIngredientCheck(ingredient.id)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, e.target.value)
                      }
                      placeholder="Enter ingredient"
                      className={`ml-3 flex-1 border-none focus:ring-0 ${ingredient.checked ? "line-through text-gray-400" : "text-gray-700"}`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer !rounded-button whitespace-nowrap">
                  Generate Shopping List
                </button>
              </div>
            </div>

            {/* Long-term Prep Options */}
            {activePlanType === "longterm" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Long-term Prep Options
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prep Schedule
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Weekly Batch Cooking</option>
                      <option>Monthly Freezer Meals</option>
                      <option>Bi-weekly Prep</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Storage Duration
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="short"
                          name="duration"
                          className="h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor="short"
                          className="ml-2 text-sm text-gray-700"
                        >
                          3-5 days
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="medium"
                          name="duration"
                          className="h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor="medium"
                          className="ml-2 text-sm text-gray-700"
                        >
                          1-2 weeks
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="long"
                          name="duration"
                          className="h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor="long"
                          className="ml-2 text-sm text-gray-700"
                        >
                          1+ month
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="freezer-friendly"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="freezer-friendly"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Freezer-friendly recipes only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="portion-control"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="portion-control"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Include portion control
                    </label>
                  </div>
                  <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer !rounded-button whitespace-nowrap">
                    Generate Long-term Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6">
        <button className="flex items-center justify-center w-12 h-12 text-white bg-indigo-600 rounded-full shadow-lg cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-comment"></i>
        </button>
      </div>
    </div>
  );
};

export default MealPlanner; 