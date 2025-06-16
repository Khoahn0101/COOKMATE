import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const RecipeDetail = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(recipe.servings || 1);
  const [activeReviewTab, setActiveReviewTab] = useState("most-helpful");
  const [checkedIngredients, setCheckedIngredients] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 text-gray-600 cursor-pointer">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            CookMate
          </div>
        </div>
        <div className="relative flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled
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
        {/* Hero Section */}
        <div className="relative mb-10 overflow-hidden rounded-xl">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">
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
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="mr-2 fas fa-bookmark"></i>
                  Save Recipe
                </button>
                <div className="flex space-x-2">
                  <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
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
            <div className="flex flex-wrap p-6 mb-8 bg-white rounded-lg shadow-sm">
              <div className="flex items-center pr-6 mb-4 mr-6 border-r border-gray-200 md:mb-0">
                <i className="mr-3 text-2xl text-indigo-500 fas fa-clock"></i>
                <div>
                  <p className="text-sm text-gray-500">Prep Time</p>
                  <p className="font-medium">{recipe.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center pr-6 mb-4 mr-6 border-r border-gray-200 md:mb-0">
                <i className="mr-3 text-2xl text-indigo-500 fas fa-fire"></i>
                <div>
                  <p className="text-sm text-gray-500">Cook Time</p>
                  <p className="font-medium">{recipe.cookingTime || recipe.cookTime}</p>
                </div>
              </div>
              <div className="flex items-center pr-6 mb-4 mr-6 border-r border-gray-200 md:mb-0">
                <i className="mr-3 text-2xl text-indigo-500 fas fa-utensils"></i>
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="font-medium">{recipe.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="mr-3 text-2xl text-indigo-500 fas fa-users"></i>
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-medium">{servings} people</p>
                </div>
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
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
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
                    className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="mx-3 font-medium">{servings} servings</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full cursor-pointer !rounded-button whitespace-nowrap"
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
                      className="w-5 h-5 mr-3 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
              <button className="flex items-center px-4 py-2 mt-6 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                <i className="mr-2 fas fa-shopping-cart"></i>
                Add to Shopping List
              </button>
            </div>
            {/* Instructions */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Cooking Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions && recipe.instructions.map((step, idx) => (
                  <li className="flex" key={idx}>
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-4 font-bold text-white bg-indigo-600 rounded-full">
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                  Write a Review
                </button>
              </div>
              {/* ... (static reviews, can be made dynamic) ... */}
            </div>
          </div>
          <div className="col-span-1">
            {/* Nutritional Information */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
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
              <button className="flex items-center justify-center px-4 py-3 font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                <i className="mr-2 fas fa-print"></i>
                Print Recipe
              </button>
              <button className="flex items-center justify-center px-4 py-3 font-medium text-white bg-indigo-600 rounded-lg cursor-pointer !rounded-button whitespace-nowrap">
                <i className="mr-2 fas fa-share-alt"></i>
                Share Recipe
              </button>
            </div>
            {/* Equipment Needed (static for now) */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Equipment Needed
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Large pot for boiling pasta</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Large skillet or frying pan</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Mixing bowl</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Whisk</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Cheese grater</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Colander</span>
                </li>
                <li className="flex items-center">
                  <i className="mr-3 text-indigo-500 fas fa-check"></i>
                  <span className="text-gray-700">Tongs or pasta server</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Related Recipes (placeholder) */}
        {/* ... You can add related recipes here if desired ... */}
      </main>
      {/* Floating Action Buttons */}
      <div className="fixed z-10 bottom-6 right-6">
        <button className="flex items-center justify-center w-12 h-12 text-white bg-indigo-600 rounded-full shadow-lg cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
      {/* Chat Support Button */}
      <div className="fixed z-10 bottom-6 left-6">
        <button className="flex items-center justify-center w-12 h-12 text-white bg-indigo-600 rounded-full shadow-lg cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-comment"></i>
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail; 