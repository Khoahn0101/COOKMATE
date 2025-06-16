import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Find Your Next Culinary Adventure</h2>
      <p className="text-muted text-center">
        Discover thousands of recipes and get personalized suggestions from our AI assistant.
      </p>

      <div className="row g-4 mt-4">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="card h-100 shadow-sm">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted small">
                  {recipe.time} · {recipe.difficulty}
                </p>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary w-100">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
