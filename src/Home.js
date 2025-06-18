import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Recipe data (fallback if API fails)
  const fallbackRecipes = [
    {
      id: 1,
      title: "Homemade Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      time: "25 mins",
      difficulty: "medium",
      tags: ["italian", "dinner"]
    },
    {
      id: 2,
      title: "Pasta Carbonara",
      image: "https://www.allrecipes.com/thmb/a_0Wyk_LLCtH-VPqg2uLD9I5Pk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
      rating: 4.9,
      time: "15 mins",
      difficulty: "medium",
      tags: ["italian", "quick"]
    },
    {
      id: 3,
      title: "Chicken Curry",
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg",
      rating: 4.7,
      time: "30 mins",
      difficulty: "easy",
      tags: ["indian", "dinner"]
    },
    {
      id: 4,
      title: "Chocolate Cake",
      image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
      rating: 5.0,
      time: "40 mins",
      difficulty: "hard",
      tags: ["dessert", "baking"]
    },
    {
      id: 5,
      title: "Caesar Salad",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
      rating: 4.3,
      time: "5 mins",
      difficulty: "easy",
      tags: ["salad", "vegetarian", "quick"]
    },
    {
      id: 6,
      title: "Beef Stir Fry",
      image: "https://www.allrecipes.com/thmb/7N-Xq1XMMJw8G0KJv2e0ETUYB2I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228823-quick-beef-stir-fry-DDMFS-4x3-1f79b031d3134f02ac27d79e967dfef5.jpg",
      rating: 4.6,
      time: "10 mins",
      difficulty: "medium",
      tags: ["asian", "quick"]
    },
    {
      id: 7,
      title: "Pasta Primavera",
      image: "https://images.services.kitchenstories.io/w7kIw5bZaJP6rgq3Zj_HOouUq_U=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R2572-picnic-final-photo-4x3.jpg",
      rating: 4.4,
      time: "20 mins",
      difficulty: "easy",
      tags: ["italian", "vegetarian"]
    },
    {
      id: 8,
      title: "Grilled Salmon",
      image: "https://res.cloudinary.com/hksqkdlah/image/upload/41765-sfs-grilled-salmon-10664.jpg",
      rating: 4.9,
      time: "15 mins",
      difficulty: "easy",
      tags: ["seafood", "healthy"]
    },
    {
      id: 9,
      title: "Vegetable Soup",
      image: "https://thecozyapron.com/wp-content/uploads/2018/07/vegetable-soup_thecozyapron_1.jpg",
      rating: 4.2,
      time: "25 mins",
      difficulty: "easy",
      tags: ["soup", "vegetarian"]
    },
    {
      id: 10,
      title: "Lasagna",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      time: "1 hr",
      difficulty: "hard",
      tags: ["italian", "dinner"]
    },
    {
      id: 11,
      title: "Pad Thai",
      image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      time: "15 mins",
      difficulty: "medium",
      tags: ["asian", "quick"]
    },
    {
      id: 12,
      title: "Butter Chicken",
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      time: "35 mins",
      difficulty: "medium",
      tags: ["indian", "dinner"]
    },
    {
      id: 13,
      title: "Classic Burger",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      time: "15 mins",
      difficulty: "easy",
      tags: ["american", "quick"]
    },
    {
      id: 14,
      title: "Vegetarian Chili",
      image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      time: "40 mins",
      difficulty: "easy",
      tags: ["mexican", "vegetarian"]
    },
    {
      id: 15,
      title: "Vegan Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      time: "20 mins",
      difficulty: "easy",
      tags: ["vegan", "healthy"]
    }
  ];

  useEffect(() => {
    // Try to fetch from API first, fallback to static data
    fetch("http://localhost:8000/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch(() => {
        setRecipes(fallbackRecipes);
        setFilteredRecipes(fallbackRecipes);
      });
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    let filtered = [];
    
    if (filter === 'all') {
      filtered = recipes;
    } else if (filter === 'quick') {
      filtered = recipes.filter(recipe => parseInt(recipe.time) <= 20);
    } else if (filter === 'vegetarian') {
      filtered = recipes.filter(recipe => recipe.tags.includes('vegetarian') || recipe.tags.includes('vegan'));
    } else {
      filtered = recipes.filter(recipe => recipe.difficulty === filter);
    }
    
    setFilteredRecipes(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      handleFilter(activeFilter);
    } else {
      const searchFiltered = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(term.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredRecipes(searchFiltered);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-utensils text-3xl text-blue-600 mr-2"></i>
              <h1 className="text-2xl font-bold text-gray-800">Cook<span className="text-blue-600">Mate</span></h1>
            </div>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Delicious Recipes</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Browse our collection of mouth-watering recipes from around the world</p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center w-full bg-white rounded-full shadow-lg">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                value={searchTerm}
                onChange={handleSearch}
                className="flex-1 px-6 py-4 rounded-full bg-transparent border-none text-gray-800 focus:ring-0 focus:outline-none placeholder-gray-400 text-lg"
                style={{ minWidth: 0 }}
              />
              <button className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mr-2 -ml-3 shadow hover:bg-blue-700 transition" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            className={`filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All Recipes
          </button>
          <button 
            className={`filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${activeFilter === 'easy' ? 'active' : ''}`}
            onClick={() => handleFilter('easy')}
          >
            Easy
          </button>
          <button 
            className={`filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${activeFilter === 'medium' ? 'active' : ''}`}
            onClick={() => handleFilter('medium')}
          >
            Medium
          </button>
          <button 
            className={`filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${activeFilter === 'hard' ? 'active' : ''}`}
            onClick={() => handleFilter('hard')}
          >
            Hard
          </button>
          <button 
            className={`filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${activeFilter === 'quick' ? 'active' : ''}`}
            onClick={() => handleFilter('quick')}
          >
            <i className="fas fa-clock mr-2"></i> Quick Meals
          </button>
          <button 
            className={`filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition ${activeFilter === 'vegetarian' ? 'active' : ''}`}
            onClick={() => handleFilter('vegetarian')}
          >
            <i className="fas fa-leaf mr-2"></i> Vegetarian
          </button>
        </div>
      </div>

      {/* Recipe Gallery */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Recipes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => {
            const difficultyClass = `difficulty-${recipe.difficulty}`;
            
            return (
              <div key={recipe.id} className="recipe-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
                <Link to={`/recipe/${recipe.id}`}>
                  <div className="relative overflow-hidden h-48">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover recipe-image" />
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center shadow">
                      <i className="fas fa-star text-yellow-400 mr-1"></i>
                      <span className="text-sm font-semibold">{recipe.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{recipe.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">
                        <i className="far fa-clock mr-1"></i> {recipe.time}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${difficultyClass} text-white`}>
                        {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
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

      <style jsx>{`
        .recipe-card:hover .recipe-image {
          transform: scale(1.05);
        }
        .recipe-image {
          transition: transform 0.3s ease;
        }
        .difficulty-easy {
          background-color: #4ade80;
        }
        .difficulty-medium {
          background-color: #fbbf24;
        }
        .difficulty-hard {
          background-color: #f87171;
        }
        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        .filter-btn.active {
          background-color: #3b82f6;
          color: white;
        }
      `}</style>
    </div>
  );
}
