import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";
import NutritionCard from "./NutritionCard";
import IngredientsInstructionsCard from "./IngredientsInstructionsCard";
import { motion } from "framer-motion";

const RecipeDetail = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(recipe.servings || 1);
  const [activeReviewTab, setActiveReviewTab] = useState("most-helpful");
  const [saved, setSaved] = useState(false);
  const [showShoppingSuccess, setShowShoppingSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');



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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <motion.main
        className="flex-1 container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Hero Section */}
        <div className="relative mb-10 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="object-cover w-full h-96"
            style={{ borderRadius: '1rem' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
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
                  <span className="ml-2 text-white">({recipe.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition shadow ${saved ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                  onClick={handleSaveRecipe}
                  ariaLabel={saved ? 'Unsave recipe' : 'Save recipe'}
                >
                  <i className={`mr-2 fas fa-bookmark`}></i>
                  {saved ? 'Saved' : 'Save Recipe'}
                </Button>
                <Button
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition shadow bg-gray-100 text-gray-800 hover:bg-gray-200"
                  onClick={handleAddToShoppingList}
                  ariaLabel="Add ingredients to shopping list"
                >
                  <i className="mr-2 fas fa-shopping-cart"></i>
                  Add to Shopping List
                </Button>
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
                <i className="mb-2 text-3xl text-orange-500 fas fa-clock"></i>
                <span className="text-sm text-gray-500">Prep Time</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{recipe.prepTime || recipe.prep_time}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-orange-500 fas fa-fire"></i>
                <span className="text-sm text-gray-500">Cook Time</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{recipe.cookingTime || recipe.cookTime || recipe.cooking_time}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-orange-500 fas fa-utensils"></i>
                <span className="text-sm text-gray-500">Difficulty</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{recipe.difficulty}</span>
              </div>
              <div className="flex flex-col items-center justify-center py-2">
                <i className="mb-2 text-3xl text-orange-500 fas fa-users"></i>
                <span className="text-sm text-gray-500">Servings</span>
                <span className="font-bold text-lg text-gray-900 mt-1">{servings} people</span>
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {recipe.tags && recipe.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
            </div>
            
            {/* Ingredients and Instructions */}
            <IngredientsInstructionsCard 
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              servings={servings}
            />
            {/* Back Button */}
            {onBack && (
              <Button className="mt-6" onClick={onBack} ariaLabel="Back to recipes">Back to Recipes</Button>
            )}
          </div>
          {/* Nutrition/Sidebar */}
          <NutritionCard nutrition={recipe.nutrition} />
        </div>
        {/* Shopping List Success Toast */}
        {showShoppingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50"
            role="status"
            aria-live="polite"
          >
            Ingredients added to shopping list!
          </motion.div>
        )}
      </motion.main>
    </div>
  );
};

export default RecipeDetail; 