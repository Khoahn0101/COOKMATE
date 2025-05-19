import React from "react";

const recipes = [
  {
    title: "Homemade Pizza",
    time: "45 mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1601924582975-4aa3b5b1d1b4",
  },
  {
    title: "Chicken Curry",
    time: "30 mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1589307000057-cb6395f44703",
  },
  {
    title: "Chocolate Cake",
    time: "60 mins",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1608139742805-5ae7d7b3ed7e",
  },
];

export default function CookMateApp() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-700">CookMate</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          className="border rounded px-3 py-1"
        />
        <div className="flex gap-2">
          <select className="border rounded px-2">
            <option>EN</option>
            <option>VN</option>
          </select>
          <button className="bg-purple-700 text-white px-4 py-1 rounded">Sign In</button>
        </div>
      </nav>

      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-2">Find Your Next Culinary Adventure</h2>
        <p className="text-gray-600 mb-4">
          Discover thousands of recipes and get personalized suggestions from our AI assistant.
        </p>
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["All", "Recipe Gallery", "Meal Planner", "Upload Your Recipe"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 rounded-full border ${
                tab === "All" ? "bg-purple-700 text-white" : "bg-white text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {recipes.map((recipe) => (
            <div key={recipe.title} className="bg-white rounded-xl shadow p-4">
              <img src={recipe.image} alt={recipe.title} className="rounded-xl h-48 w-full object-cover mb-4" />
              <h3 className="text-xl font-bold mb-1">{recipe.title}</h3>
              <p className="text-gray-600 text-sm">
                {recipe.time} &middot; {recipe.difficulty}
              </p>
              <button className="mt-4 bg-purple-700 text-white w-full py-2 rounded-lg">
                View Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
