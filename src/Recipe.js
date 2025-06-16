import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data));
  }, [id]);

  if (!recipe) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">← Back to Home</Link>
      <h2 className="mb-3">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid rounded mb-4" />
      <p className="text-muted">{recipe.time} · {recipe.difficulty}</p>

      <h4>Ingredients</h4>
        <ul className="list-group mb-3">
        {recipe.ingredients.map((item, i) => (
            <li key={i} className="list-group-item">{item}</li>
        ))}
        </ul>

    <h4 className="mt-4">Directions</h4>
        <ol className="list-group list-group-numbered mb-3">
        {recipe.directions.map((step, i) => (
            <li key={i} className="list-group-item">{step}</li>
        ))}
        </ol>

    <h4 className="mt-4">Nutrition</h4>
        <ul className="list-group">
        {Object.entries(recipe.nutrition).map(([key, value]) => (
            <li key={key} className="list-group-item d-flex justify-content-between">
            <span>{key}</span>
            <span className="fw-bold">{value}</span>
            </li>
        ))}
        </ul>

    </div>
  );
}
