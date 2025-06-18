import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { useNavigate, Link } from "react-router-dom";

const RecipeDetail = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(recipe.servings || 1);
  const [activeReviewTab, setActiveReviewTab] = useState("most-helpful");
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [saved, setSaved] = useState(false);
  const [showShoppingSuccess, setShowShoppingSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle ingredient checked state
  const toggleIngredient = (index) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  // Nutrition chart data from recipe.nutrition
  useEffect(() => {
    const chartDom = document.getElementById("nutrition-chart");
    if (chartDom && recipe.nutrition) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: { trigger: "item" },
        color: ["#6366F1", "#F59E0B", "#10B981", "#EF4444"],
        series: [
          {
            name: "Nutrition",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: { show: false, position: "center" },
            emphasis: {
              label: { show: true, fontSize: "18", fontWeight: "bold" },
            },
            labelLine: { show: false },
            data: [
              { value: parseInt(recipe.nutrition.carbs) || 0, name: "Carbs" },
              { value: parseInt(recipe.nutrition.protein) || 0, name: "Protein" },
              { value: parseInt(recipe.nutrition.fat) || 0, name: "Fat" },
              { value: parseInt(recipe.nutrition.fiber) || 0, name: "Fiber" },
            ],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", () => myChart.resize());
      return () => {
        window.removeEventListener("resize", () => myChart.resize());
        myChart.dispose();
      };
    }
  }, [recipe.nutrition]);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSaveRecipe = () => {
    setSaved((prev) => !prev);
  };

  const handleAddToShoppingList = () => {
    setShowShoppingSuccess(true);
    setTimeout(() => setShowShoppingSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition">
            <i className="fas fa-utensils text-3xl text-blue-600 mr-2"></i>
            <h1 className="text-2xl font-bold text-gray-800">Cook<span className="text-blue-600">Mate</span></h1>
          </Link>
          <div className="relative flex-1 max-w-md mx-6">
            <div className="flex items-center w-full bg-white rounded-full shadow">
              <input
                type="text"
                placeholder="Search recipes..."
                className="flex-1 py-3 pl-6 pr-4 text-base bg-transparent border-none rounded-full focus:outline-none focus:ring-0 placeholder-gray-400 text-gray-700"
                value={searchTerm || ''}
                onChange={onSearchChange}
                style={{ minWidth: 0 }}
              />
              <button className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mr-1 -ml-3 shadow hover:bg-blue-700 transition" aria-label="Search">
                <i className="fas fa-search text-white text-lg"></i>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer">
              <button className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                <span>EN</span>
                <i className="ml-1 fas fa-chevron-down text-xs"></i>
              </button>
            </div>
            <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition !rounded-button whitespace-nowrap">
              Sign in
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container px-6 py-8 mx-auto">
        {/* Upload Your Recipe Button */}
        <div className="flex justify-end mb-4">
          <button
            className="px-5 py-2 text-sm font-medium text-white bg-[#7CD681] rounded-full shadow hover:bg-green-500 transition"
            onClick={() => navigate('/upload')}
          >
            Upload Your Recipe
          </button>
        </div>
        {/* Hero Section */}
        <div className="relative mb-10 overflow-hidden rounded-xl shadow-lg">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                  {recipe.title}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(Math.round(parseFloat(recipe.rating) || 0)).keys()].map((star) => (
                      <i key={star} className="text-yellow-400 fas fa-star"></i>
                    ))}
                  </div>
                  <span className="ml-2 text-white">({recipe.reviews || 0} reviews)</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap transition shadow ${saved ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  onClick={handleSaveRecipe}
                >
                  <i className={`mr-2 fas ${saved ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
                  {saved ? 'Saved' : 'Save Recipe'}
                </button>
                <div className="flex space-x-2">
                  <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition !rounded-button whitespace-nowrap">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full cursor-pointer hover:bg-blue-500 transition !rounded-button whitespace-nowrap">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full cursor-pointer hover:bg-red-700 transition !rounded-button whitespace-nowrap">
                    <i className="fab fa-pinterest-p"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recipe Overview */}
        <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
          <div className="col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 p-6 mb-8 bg-white rounded-lg shadow-sm divide-x divide-gray-100 text-center">
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-blue-500 fas fa-clock"></i>
                <span className="text-sm text-gray-500">Prep Time</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{recipe.prepTime}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-blue-500 fas fa-fire"></i>
                <span className="text-sm text-gray-500">Cook Time</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{recipe.cookingTime || recipe.cookTime}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-blue-500 fas fa-utensils"></i>
                <span className="text-sm text-gray-500">Difficulty</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{recipe.difficulty}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-blue-500 fas fa-users"></i>
                <span className="text-sm text-gray-500">Servings</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{servings} people</span>
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {recipe.tags && recipe.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                About this Recipe
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {recipe.description}
              </p>
            </div>
            {/* Ingredients */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Ingredients
                </h2>
                <div className="flex items-center">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 transition !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="mx-3 font-medium">{servings} servings</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 transition !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <ul className="space-y-3">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`ingredient-${index}`}
                      checked={checkedIngredients.includes(index)}
                      onChange={() => toggleIngredient(index)}
                      className="w-5 h-5 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className={`flex-1 ${checkedIngredients.includes(index) ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {ingredient}
                    </label>
                  </li>
                ))}
              </ul>
              <button
                className="flex items-center px-4 py-2 mt-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200 transition !rounded-button whitespace-nowrap"
                onClick={handleAddToShoppingList}
              >
                <i className="mr-2 fas fa-shopping-cart"></i>
                Add to Shopping List
              </button>
              {showShoppingSuccess && (
                <div className="mt-4 text-green-600 text-sm font-medium flex items-center gap-2">
                  <i className="fas fa-check-circle"></i> Added to shopping list!
                </div>
              )}
            </div>
            {/* Instructions */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                Cooking Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions && recipe.instructions.map((step, idx) => (
                  <li className="flex" key={idx}>
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-4 font-bold text-white bg-blue-600 rounded-full">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            {/* Reviews (static for now) */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition !rounded-button whitespace-nowrap">
                  Write a Review
                </button>
              </div>
              {/* ... (static reviews, can be made dynamic) ... */}
              <div className="space-y-6 mt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">A</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Alice</span>
                      <span className="text-yellow-400"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i></span>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-gray-700 mt-1">Absolutely delicious! The instructions were easy to follow and my family loved it.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">B</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Bob</span>
                      <span className="text-yellow-400"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span>
                      <span className="text-xs text-gray-400">1 week ago</span>
                    </div>
                    <p className="text-gray-700 mt-1">Great recipe! Will make again.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            {/* Nutritional Information */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                Nutritional Information
              </h2>
              <div className="h-64 mb-6" id="nutrition-chart"></div>
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Calories</span>
                  <span className="font-medium">{recipe.nutrition?.calories || '-'} kcal</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Protein</span>
                  <span className="font-medium">{recipe.nutrition?.protein || '-'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Carbohydrates</span>
                  <span className="font-medium">{recipe.nutrition?.carbs || '-'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Fat</span>
                  <span className="font-medium">{recipe.nutrition?.fat || '-'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Fiber</span>
                  <span className="font-medium">{recipe.nutrition?.fiber || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sodium</span>
                  <span className="font-medium">{recipe.nutrition?.sodium || '-'}</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * Percent Daily Values are based on a 2,000 calorie diet. Your
                daily values may be higher or lower depending on your calorie
                needs.
              </p>
            </div>
            {/* Print and Jump Buttons */}
            <div className="flex flex-col mb-8 space-y-3">
              <button className="flex items-center justify-center px-4 py-3 font-medium text-blue-600 bg-white border border-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 transition !rounded-button whitespace-nowrap">
                <i className="mr-2 fas fa-print"></i>
                Print Recipe
              </button>
              <button className="flex items-center justify-center px-4 py-3 font-medium text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition !rounded-button whitespace-nowrap">
                <i className="mr-2 fas fa-share-alt"></i>
                Share Recipe
              </button>
            </div>
            {/* Equipment Needed (static for now) */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                Equipment Needed
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Large pot for boiling pasta</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Large skillet or frying pan</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Mixing bowl</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Whisk</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Cheese grater</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Colander</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-blue-500 fas fa-check"></i>
                  <span className="text-gray-700">Tongs or pasta server</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Related Recipes (placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail; 