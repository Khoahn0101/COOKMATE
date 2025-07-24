import React, { useState } from "react";

const IngredientsInstructionsCard = ({ ingredients, instructions, servings = 1 }) => {
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  // Toggle ingredient checked state
  const toggleIngredient = (index) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  // Clear all checked ingredients
  const clearChecked = () => {
    setCheckedIngredients([]);
  };

  // Check all ingredients
  const checkAll = () => {
    setCheckedIngredients(ingredients ? ingredients.map((_, index) => index) : []);
  };

  return (
    <div className="space-y-6">
      {/* Ingredients Section */}
      {ingredients && ingredients.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Ingredients</h3>
            <div className="flex space-x-2">
              <button
                onClick={checkAll}
                className="text-xs px-3 py-1 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
              >
                Check All
              </button>
              <button
                onClick={clearChecked}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {ingredients.map((ingredient, idx) => (
              <div
                key={idx}
                className={`flex items-start p-3 rounded-lg border transition-all duration-200 ${
                  checkedIngredients.includes(idx)
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedIngredients.includes(idx)}
                  onChange={() => toggleIngredient(idx)}
                  className="mt-1 mr-3 accent-orange-500 w-4 h-4"
                  aria-label={`Mark ${ingredient} as acquired`}
                />
                <span
                  className={`flex-1 text-gray-700 leading-relaxed ${
                    checkedIngredients.includes(idx)
                      ? 'line-through text-gray-500'
                      : ''
                  }`}
                >
                  {ingredient}
                </span>
                {checkedIngredients.includes(idx) && (
                  <i className="fas fa-check text-green-500 ml-2"></i>
                )}
              </div>
            ))}
          </div>
          
          {/* Progress indicator */}
          {ingredients.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{checkedIngredients.length} of {ingredients.length} ingredients</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(checkedIngredients.length / ingredients.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cooking Instructions Section */}
      {instructions && instructions.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Cooking Instructions</h3>
          
          <div className="space-y-4">
            {instructions.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold mr-4 text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Instructions summary */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <i className="fas fa-utensils mr-2 text-orange-500"></i>
              <span>{instructions.length} step{instructions.length !== 1 ? 's' : ''} to complete</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {(!ingredients || ingredients.length === 0) && (!instructions || instructions.length === 0) && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center text-gray-500">
            <i className="fas fa-info-circle text-2xl mb-2"></i>
            <p>No ingredients or instructions available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsInstructionsCard; 