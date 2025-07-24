import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center w-72 h-72 min-w-[18rem] min-h-[18rem] max-w-xs max-h-xs">
      {/* Circular Image Container */}
      <div className="relative w-full flex justify-center">
        <div className="absolute -top-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
          <img
            src={recipe.image_url || recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 w-full px-6 pt-16 pb-6 items-center">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-1 text-center line-clamp-1">
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs mb-3 text-center line-clamp-2">
          {recipe.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Cooking Time */}
          <div className="flex items-center text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">{recipe.cooking_time}</span>
          </div>
          {/* Calories */}
          <div className="flex items-center text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs font-medium">{recipe.nutrition?.calories || 0}cal</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 rounded-xl transition-colors duration-200">
          See recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard; 