// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail";
import MealPlanner from "./components/MealPlanner";
import CookBotInput from "./components/CookBotInput";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadRecipe from "./components/UploadRecipe";

const recipes = [
  {
    id: 1,
    title: "Homemade Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    reviews: 112,
    prepTime: "20 mins",
    cookingTime: "25 mins",
    difficulty: "Medium",
    servings: 4,
    tags: ["Italian", "Main Course", "Cheesy"],
    description: "A delicious homemade pizza with crispy crust and melted cheese. Perfect for family dinner or gatherings.",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp instant yeast",
      "1 tsp salt",
      "1 cup warm water",
      "2 tbsp olive oil",
      "1 cup pizza sauce",
      "2 cups shredded mozzarella cheese",
      "Your favorite toppings"
    ],
    instructions: [
      "Mix flour, yeast, and salt in a large bowl",
      "Add warm water and olive oil, knead until smooth",
      "Let the dough rise for 1 hour",
      "Roll out the dough and add toppings",
      "Bake at 450°F for 15-20 minutes"
    ],
    nutrition: {
      calories: 700,
      protein: "28g",
      fat: "22g",
      carbs: "90g"
    }
  },
  {
    id: 2,
    title: "Pasta Carbonara",
    image: "https://www.allrecipes.com/thmb/a_0W8yk_LLCtH-VPqg2uLD9I5Pk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
    rating: "4.9",
    reviews: 128,
    prepTime: "10 mins",
    cookingTime: "15 mins",
    difficulty: "Medium",
    servings: 4,
    tags: ["Italian", "Main Course", "High Protein"],
    description: "Pasta carbonara is a classic Italian dish from Rome made with eggs, hard cheese, cured pork, and black pepper. The cheese is usually Pecorino Romano, Parmigiano-Reggiano, or a combination of the two.",
    ingredients: [
      "400g spaghetti",
      "150g pancetta",
      "2 large eggs",
      "1 cup grated Pecorino Romano",
      "1/2 cup grated Parmesan",
      "Freshly ground black pepper",
      "Salt"
    ],
    instructions: [
      "Cook spaghetti in salted boiling water until al dente.",
      "Fry pancetta until crisp.",
      "Beat eggs and mix with cheeses.",
      "Drain pasta, reserving some water.",
      "Mix pasta with pancetta, remove from heat, add egg-cheese mixture, and toss quickly.",
      "Add pasta water if needed for creaminess. Season with pepper."
    ],
    nutrition: {
      calories: 650,
      protein: "25g",
      fat: "22g",
      carbs: "80g"
    }
  },
  {
    id: 3,
    title: "Chicken Curry",
    image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg",
    rating: "4.7",
    reviews: 98,
    prepTime: "15 mins",
    cookingTime: "30 mins",
    difficulty: "Easy",
    servings: 4,
    tags: ["Asian", "Main Course", "Spicy"],
    description: "Aromatic chicken curry with tender chicken pieces simmered in a rich, spicy sauce.",
    ingredients: [
      "500g chicken breast",
      "2 tbsp curry powder",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 can coconut milk",
      "1 tbsp ginger, grated",
      "Salt and pepper"
    ],
    instructions: [
      "Sauté onion, garlic, and ginger until fragrant.",
      "Add chicken and brown.",
      "Stir in curry powder.",
      "Pour in coconut milk and simmer until chicken is cooked.",
      "Season to taste."
    ],
    nutrition: {
      calories: 520,
      protein: "35g",
      fat: "28g",
      carbs: "30g"
    }
  },
  {
    id: 4,
    title: "Chocolate Cake",
    image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
    rating: "5.0",
    reviews: 210,
    prepTime: "20 mins",
    cookingTime: "40 mins",
    difficulty: "Hard",
    servings: 8,
    tags: ["Dessert", "Chocolate", "Baking"],
    description: "Rich and moist chocolate cake with decadent chocolate frosting.",
    ingredients: [
      "2 cups flour",
      "2 cups sugar",
      "3/4 cup cocoa powder",
      "2 tsp baking powder",
      "1.5 tsp baking soda",
      "1 cup milk",
      "2 eggs",
      "1/2 cup vegetable oil",
      "2 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Mix dry ingredients.",
      "Add wet ingredients and mix until smooth.",
      "Pour into pans and bake 30-35 mins.",
      "Cool and frost as desired."
    ],
    nutrition: {
      calories: 430,
      protein: "6g",
      fat: "18g",
      carbs: "65g"
    }
  },
  {
    id: 5,
    title: "Caesar Salad",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
    rating: "4.3",
    reviews: 67,
    prepTime: "10 mins",
    cookingTime: "5 mins",
    difficulty: "Easy",
    servings: 2,
    tags: ["Salad", "Healthy", "Quick"],
    description: "Classic Caesar salad with crisp romaine, parmesan, croutons, and creamy dressing.",
    ingredients: [
      "1 head romaine lettuce",
      "1/2 cup croutons",
      "1/4 cup grated parmesan",
      "Caesar dressing",
      "Salt and pepper"
    ],
    instructions: [
      "Chop lettuce and place in bowl.",
      "Add croutons and parmesan.",
      "Toss with dressing.",
      "Season and serve."
    ],
    nutrition: {
      calories: 220,
      protein: "7g",
      fat: "14g",
      carbs: "18g"
    }
  },
  {
    id: 6,
    title: "Beef Stir Fry",
    image: "https://www.allrecipes.com/thmb/7N-Xq1XMMJw8G0KJv2e0ETUYB2I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228823-quick-beef-stir-fry-DDMFS-4x3-1f79b031d3134f02ac27d79e967dfef5.jpg",
    rating: "4.6",
    reviews: 80,
    prepTime: "15 mins",
    cookingTime: "10 mins",
    difficulty: "Medium",
    servings: 3,
    tags: ["Asian", "Main Course", "Quick"],
    description: "Savory beef stir fry with colorful vegetables in a flavorful sauce.",
    ingredients: [
      "300g beef sirloin, sliced",
      "1 bell pepper, sliced",
      "1 cup broccoli florets",
      "1 carrot, sliced",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp cornstarch"
    ],
    instructions: [
      "Mix beef with cornstarch and soy sauce.",
      "Stir fry beef, set aside.",
      "Stir fry veggies, return beef, add sauces.",
      "Cook until sauce thickens."
    ],
    nutrition: {
      calories: 390,
      protein: "28g",
      fat: "18g",
      carbs: "28g"
    }
  },
  {
    id: 7,
    title: "Pasta Primavera",
    image: "https://images.services.kitchenstories.io/w7kIw5bZaJP6rgq3Zj_HOouUq_U=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/R2572-picnic-final-photo-4x3.jpg",
    rating: "4.4",
    reviews: 54,
    prepTime: "15 mins",
    cookingTime: "20 mins",
    difficulty: "Easy",
    servings: 4,
    tags: ["Italian", "Vegetarian", "Main Course"],
    description: "Fresh pasta primavera with seasonal vegetables and a light sauce.",
    ingredients: [
      "350g penne pasta",
      "1 zucchini, sliced",
      "1 bell pepper, sliced",
      "1 cup cherry tomatoes",
      "1/2 cup peas",
      "2 tbsp olive oil",
      "Parmesan cheese"
    ],
    instructions: [
      "Cook pasta until al dente.",
      "Sauté veggies in olive oil.",
      "Add pasta and toss.",
      "Top with parmesan."
    ],
    nutrition: {
      calories: 480,
      protein: "14g",
      fat: "10g",
      carbs: "85g"
    }
  },
  {
    id: 8,
    title: "Grilled Salmon",
    image: "https://res.cloudinary.com/hksqkdlah/image/upload/41765-sfs-grilled-salmon-10664.jpg",
    rating: "4.9",
    reviews: 102,
    prepTime: "10 mins",
    cookingTime: "15 mins",
    difficulty: "Easy",
    servings: 2,
    tags: ["Seafood", "Healthy", "Main Course"],
    description: "Perfectly grilled salmon fillets with a lemon butter glaze.",
    ingredients: [
      "2 salmon fillets",
      "1 tbsp olive oil",
      "1 lemon, sliced",
      "Salt and pepper",
      "1 tbsp butter"
    ],
    instructions: [
      "Brush salmon with oil, season.",
      "Grill 5-6 mins per side.",
      "Top with lemon and butter."
    ],
    nutrition: {
      calories: 420,
      protein: "34g",
      fat: "28g",
      carbs: "4g"
    }
  },
  {
    id: 9,
    title: "Vegetable Soup",
    image: "https://thecozyapron.com/wp-content/uploads/2018/07/vegetable-soup_thecozyapron_1.jpg",
    rating: "4.2",
    reviews: 39,
    prepTime: "10 mins",
    cookingTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    tags: ["Soup", "Vegetarian", "Healthy"],
    description: "Hearty vegetable soup with a medley of fresh veggies in a savory broth.",
    ingredients: [
      "1 onion, chopped",
      "2 carrots, sliced",
      "2 celery stalks, sliced",
      "2 potatoes, diced",
      "1 zucchini, diced",
      "1 can diced tomatoes",
      "4 cups vegetable broth"
    ],
    instructions: [
      "Sauté onion, carrots, celery.",
      "Add potatoes, zucchini, tomatoes, broth.",
      "Simmer until veggies are tender."
    ],
    nutrition: {
      calories: 180,
      protein: "5g",
      fat: "2g",
      carbs: "38g"
    }
  },
  {
    id: 10,
    title: "Lasagna",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    rating: "4.7",
    reviews: 95,
    prepTime: "30 mins",
    cookingTime: "1 hr",
    difficulty: "Hard",
    servings: 6,
    tags: ["Italian", "Main Course", "Cheesy"],
    description: "Classic Italian lasagna with layers of pasta, meat sauce, and cheese.",
    ingredients: [
      "12 lasagna noodles",
      "1 lb ground beef",
      "2 cups ricotta cheese",
      "2 cups mozzarella cheese",
      "2 cups marinara sauce",
      "1/2 cup grated parmesan",
      "1 egg",
      "Salt and pepper"
    ],
    instructions: [
      "Cook noodles, brown beef, mix cheeses with egg.",
      "Layer noodles, meat, cheese, and sauce.",
      "Bake at 375°F for 45 minutes."
    ],
    nutrition: {
      calories: 850,
      protein: "38g",
      fat: "42g",
      carbs: "70g"
    }
  },
  {
    id: 11,
    title: "Pad Thai",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    reviews: 120,
    prepTime: "20 mins",
    cookingTime: "15 mins",
    difficulty: "Medium",
    servings: 2,
    tags: ["Asian", "Main Course", "Noodles"],
    description: "Popular Thai stir-fried noodles with shrimp, tofu, and peanuts.",
    ingredients: [
      "200g rice noodles",
      "100g shrimp",
      "1 egg",
      "50g tofu",
      "2 tbsp fish sauce",
      "1 tbsp tamarind paste",
      "2 tbsp peanuts",
      "Bean sprouts"
    ],
    instructions: [
      "Soak noodles, stir-fry shrimp and tofu.",
      "Add egg, noodles, sauces, and toss.",
      "Top with peanuts and sprouts."
    ],
    nutrition: {
      calories: 600,
      protein: "28g",
      fat: "18g",
      carbs: "80g"
    }
  },
  {
    id: 12,
    title: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
    rating: "4.9",
    reviews: 140,
    prepTime: "25 mins",
    cookingTime: "35 mins",
    difficulty: "Medium",
    servings: 4,
    tags: ["Indian", "Main Course", "Spicy"],
    description: "Creamy tomato-based chicken curry, a North Indian favorite.",
    ingredients: [
      "500g chicken breast",
      "1 cup tomato puree",
      "1/2 cup cream",
      "2 tbsp butter",
      "2 tbsp garam masala",
      "1 onion, chopped",
      "2 cloves garlic, minced"
    ],
    instructions: [
      "Marinate and cook chicken.",
      "Prepare sauce with tomato, cream, and spices.",
      "Combine and simmer."
    ],
    nutrition: {
      calories: 700,
      protein: "40g",
      fat: "38g",
      carbs: "30g"
    }
  },
  {
    id: 13,
    title: "Classic Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    rating: "4.5",
    reviews: 110,
    prepTime: "10 mins",
    cookingTime: "15 mins",
    difficulty: "Easy",
    servings: 1,
    tags: ["American", "Main Course", "Beef"],
    description: "Juicy grilled beef burger with lettuce, tomato, and cheese.",
    ingredients: [
      "1 beef patty",
      "1 burger bun",
      "1 slice cheddar cheese",
      "Lettuce",
      "Tomato",
      "Onion",
      "Ketchup, mustard"
    ],
    instructions: [
      "Grill patty, toast bun.",
      "Assemble with toppings and condiments."
    ],
    nutrition: {
      calories: 550,
      protein: "28g",
      fat: "30g",
      carbs: "40g"
    }
  },
  {
    id: 14,
    title: "Vegetarian Chili",
    image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=800&q=80",
    rating: "4.6",
    reviews: 85,
    prepTime: "15 mins",
    cookingTime: "40 mins",
    difficulty: "Easy",
    servings: 4,
    tags: ["American", "Vegetarian", "Main Course"],
    description: "Hearty chili with beans, tomatoes, and spices. 100% vegetarian!",
    ingredients: [
      "1 can kidney beans",
      "1 can black beans",
      "1 can diced tomatoes",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "2 tbsp chili powder",
      "1 bell pepper, chopped"
    ],
    instructions: [
      "Sauté onion, garlic, and pepper.",
      "Add beans, tomatoes, and spices.",
      "Simmer for 30 minutes."
    ],
    nutrition: {
      calories: 320,
      protein: "12g",
      fat: "4g",
      carbs: "60g"
    }
  },
  {
    id: 15,
    title: "Vegan Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    rating: "4.8",
    reviews: 75,
    prepTime: "20 mins",
    cookingTime: "0 mins",
    difficulty: "Easy",
    servings: 2,
    tags: ["Vegan", "Healthy", "Asian", "Bowl"],
    description: "Colorful bowl with quinoa, chickpeas, veggies, and tahini dressing.",
    ingredients: [
      "1 cup cooked quinoa",
      "1/2 cup chickpeas",
      "1/2 cup shredded carrots",
      "1/2 cup edamame",
      "1/2 avocado",
      "Tahini dressing"
    ],
    instructions: [
      "Arrange all ingredients in a bowl.",
      "Drizzle with tahini dressing."
    ],
    nutrition: {
      calories: 400,
      protein: "14g",
      fat: "12g",
      carbs: "60g"
    }
  },
  
  // Add more recipes here...
];

const RecipeGallery = ({ activeTab, setActiveTab, activeCuisine, setActiveCuisine, searchTerm, onSearchChange, recipes }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          CookMate
        </div>
        <div className="relative flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={onSearchChange}
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
          <button className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full cursor-pointer !rounded-button whitespace-nowrap" onClick={() => navigate('/login')}>
            Sign in
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="container px-6 py-8 mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Gallery</h1>
          <p className="mt-2 text-gray-600">
            Browse our collection of delicious recipes
          </p>
        </div>
        {/* Navigation Tabs */}
        <div className="flex mb-6 space-x-4 overflow-x-auto">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeTab === "recipe" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
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
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeTab === "upload" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => {
              setActiveTab("upload");
              navigate("/upload");
            }}
          >
            Upload Your Recipe
          </button>
        </div>
        {/* Cuisine Filters */}
        <div className="flex mb-8 space-x-3 overflow-x-auto">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeCuisine === "all" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActiveCuisine("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeCuisine === "italian" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActiveCuisine("italian")}
          >
            Italian
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeCuisine === "asian" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActiveCuisine("asian")}
          >
            Asian
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeCuisine === "indian" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActiveCuisine("indian")}
          >
            Indian
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer !rounded-button whitespace-nowrap ${activeCuisine === "american" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
            onClick={() => setActiveCuisine("american")}
          >
            American
          </button>
        </div>
        {/* Recipe Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 text-lg">No recipes found for this cuisine.</div>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{recipe.title}</h3>
                    <div className="flex items-center">
                      <i className="text-yellow-400 fas fa-star"></i>
                      <span className="ml-1 text-sm text-gray-600">{recipe.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>{recipe.cookingTime}</span>
                    <span className="mx-2">•</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="w-full py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))
          )}
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

const RecipeDetailWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => String(r.id) === id);
  if (!recipe) return <div>Recipe not found</div>;
  return <RecipeDetail recipe={recipe} onBack={() => navigate(-1)} />;
};

const App = () => {
  const [activeTab, setActiveTab] = useState("recipe");
  const [activeCuisine, setActiveCuisine] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter recipes by cuisine and search term
  const filteredRecipes = recipes.filter(recipe => {
    // Cuisine filter
    const cuisineMatch =
      activeCuisine === "all" ||
      (recipe.tags && recipe.tags.map(t => t.toLowerCase()).includes(activeCuisine));
    // Search filter
    const searchMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return cuisineMatch && searchMatch;
  });

  const onSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RecipeGallery
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeCuisine={activeCuisine}
              setActiveCuisine={setActiveCuisine}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              recipes={filteredRecipes}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:id" element={<RecipeDetailWrapper />} />
        <Route path="/planner" element={<MealPlanner activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/upload" element={<UploadRecipe />} />
      </Routes>
      <CookBotInput />
    </Router>
  );
};

export default App;
