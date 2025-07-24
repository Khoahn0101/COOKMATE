import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { recipes as fallbackRecipes } from "./App";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [navSolid, setNavSolid] = useState(false);

  const { scrollY: viewportScrollY } = useViewportScroll();
  const heroRef = useRef(null);
  const recipesSectionRef = useRef(null);

  // Parallax scale and fade
  const scale = useTransform(viewportScrollY, [0, 400], [1.2, 1]);
  const opacity = useTransform(viewportScrollY, [0, 400], [1, 0.3]);

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
      image: "https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg",
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
      image: "https://assets.epicurious.com/photos/6508a14155b19af4200459c7/1:1/w_2900,h_2900,c_limit/Sausage-Cheese-Basil-Lasanga_RECIPE.jpg",
      rating: 4.7,
      time: "1 hr",
      difficulty: "hard",
      tags: ["italian", "dinner"]
    },
    {
      id: 11,
      title: "Pad Thai",
      image: "https://www.seriouseats.com/thmb/gLZ3ZlKXVTGpgspZvvS8Afnw2TA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250214-SEA-PadThai-AmandaSuarez-hero-4251c730d61a40ba935f2d43153d6862.jpg",
      rating: 4.8,
      time: "15 mins",
      difficulty: "medium",
      tags: ["asian", "quick"]
    },
    {
      id: 12,
      title: "Butter Chicken",
      image: "https://www.shemins.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg",
      rating: 4.9,
      time: "35 mins",
      difficulty: "medium",
      tags: ["indian", "dinner"]
    },
    {
      id: 13,
      title: "Classic Burger",
      image: "https://i0.wp.com/rhubarbandcod.com/wp-content/uploads/2022/06/The-Classic-Cheeseburger-1.jpg?fit=1500%2C1071&ssl=1",
      rating: 4.5,
      time: "15 mins",
      difficulty: "easy",
      tags: ["american", "quick"]
    },
    {
      id: 14,
      title: "Vegetarian Chili",
      image: "https://s23209.pcdn.co/wp-content/uploads/2022/10/211129_DAMN-DELICIOUS_Vegetarian-Chili_279.jpg",
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
    const handleScroll = () => {
      setNavSolid(window.scrollY > 60); // adjust threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setRecipes(fallbackRecipes);
    setFilteredRecipes(fallbackRecipes);
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    let filtered = [];
    
    if (filter === 'all') {
      filtered = recipes;
    } else if (filter === 'quick') {
      filtered = recipes.filter(recipe => {
        // Handle both API data (prep_time + cooking_time) and fallback data (time)
        if (recipe.prep_time && recipe.cooking_time) {
          return (recipe.prep_time + recipe.cooking_time) <= 20;
        } else if (recipe.time) {
          // Extract number from time string like "15 mins" or "1 hr"
          const timeStr = recipe.time.toLowerCase();
          if (timeStr.includes('hr')) {
            return parseInt(timeStr) * 60 <= 20;
          } else {
            return parseInt(timeStr) <= 20;
          }
        }
        return false;
      });
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

  const scrollToRecipes = () => {
    recipesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      scrollToRecipes();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          navSolid
            ? "bg-black shadow-sm backdrop-blur"
            : "bg-transparent shadow-none backdrop-blur-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 transition-all duration-500">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/cookmate.jpg"
                alt="Utensils"
                className="w-10 h-10 mr-2 inline-block rounded-full cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <h1
                className="text-2xl font-bold text-white cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Cook<span className="text-white">Mate</span>
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/upload" className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">
                <i className="fas fa-plus mr-2"></i> Add Recipe
              </Link>
              <Link to="/meal-planner" className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">
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
      <section
        className="
          relative w-full
          min-h-[500px]         // Mobile default
          md:min-h-[700px]      // Medium screens (laptops)
          xl:min-h-[900px]      // Extra large screens (desktops)
          2xl:min-h-[100vh]      // Very large screens (80% of viewport height)
          flex items-center justify-center
        "
      >
        <img
          src="https://static01.nyt.com/images/2024/04/29/dining/29best-restaurants-washington19-04/29best-restaurants-washington19-04-superJumbo.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: "brightness(0.7)" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 z-10" />
        <div className="relative z-20 w-full max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow">
          Discover Culinary Excellence
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white drop-shadow">
          Savor handpicked recipes inspired by the finest cuisines across the globe
          </p>
          <div className="max-w-2xl mx-auto relative">
            <div
              className="flex items-center w-full"
              style={{
                background: "transparent",
                borderBottom: "2px solid rgba(255,255,255,0.3)",
                borderRadius: "1.5rem",
                padding: "0.25rem 0.5rem",
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
                backdropFilter: "blur(2px)",
              }}
            >
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 px-6 py-4 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none text-lg"
                style={{
                  minWidth: 0,
                  color: "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              />
              <button
                onClick={scrollToRecipes}
                className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full mr-2 -ml-3 shadow hover:bg-orange-600 transition"
                aria-label="Search"
                style={{
                  border: "none",
                  outline: "none",
                }}
              >
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
      <motion.main
        ref={recipesSectionRef}
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Recipes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe, idx) => {
            const difficultyClass = `difficulty-${recipe.difficulty}`;
            return (
              <motion.div
                key={recipe.id}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[450px] w-[350px] flex flex-col justify-end"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link to={`/recipe/${recipe.id}`} className="block h-full w-full">
                  <img
                    src={recipe.image_url || recipe.image}
                    alt={recipe.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <div className="relative z-20 p-4 flex flex-col justify-end h-full">
                    <h3 className="text-white text-xl font-bold mb-2 drop-shadow">{recipe.title}</h3>
                    <div className="flex items-center justify-between text-white text-sm mb-2">
                      <span className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        {recipe.rating}
                      </span>
                      <span className="flex items-center">
                        <i className="far fa-clock mr-1"></i> 
                        {recipe.prep_time && recipe.cooking_time 
                           ? `${Number(recipe.prep_time) + Number(recipe.cooking_time)} mins`
                            : recipe.time
                              }
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${difficultyClass} text-white bg-black bg-opacity-30`}>
                        {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.main>

      {/* Footer */}
      {/* REMOVE the following lines:
      <footer className="bg-black text-white py-8"> ... </footer> */}

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
          background-color: #f97316;
          color: white;
        }
      `}</style>
    </div>
  );
}
