import React from "react";

const recipes = [
  {
    title: "Homemade Pizza",
    time: "45 mins",
    difficulty: "Medium",
    image: "https://static.wixstatic.com/media/425567_2c6bff493fd5449786b2196b1441b87b~mv2.jpg",
  },
  {
    title: "Chicken Curry",
    time: "30 mins",
    difficulty: "Easy",
    image: "https://static.wixstatic.com/media/425567_2c6bff493fd5449786b2196b1441b87b~mv2.jpg",
  },
  {
    title: "Chocolate Cake",
    time: "60 mins",
    difficulty: "Hard",
    image: "https://static.wixstatic.com/media/425567_2c6bff493fd5449786b2196b1441b87b~mv2.jpg",
  },
];

export default function CookMateApp() {
  return (
    <div className="bg-light min-vh-100 text-dark">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary" href="#">CookMate</a>
          <input type="text" className="form-control w-25" placeholder="Search recipes..." />
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm w-auto">
              <option>EN</option>
              <option>VN</option>
            </select>
            <button className="btn btn-primary btn-sm">Sign In</button>
          </div>
        </div>
      </nav>

      <div className="text-center py-5 container">
        <h2 className="display-6 fw-bold mb-3">Find Your Next Culinary Adventure</h2>
        <p className="text-muted mb-4">
          Discover thousands of recipes and get personalized suggestions from our AI assistant.
        </p>

        <div className="mb-4 d-flex justify-content-center flex-wrap gap-2">
          {["All", "Recipe Gallery", "Meal Planner", "Upload Your Recipe"].map((tab) => (
            <button
              key={tab}
              className={`btn btn-sm rounded-pill ${
                tab === "All" ? "btn-primary text-white" : "btn-outline-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {recipes.map((recipe) => (
            <div className="col-md-4" key={recipe.title}>
              <div className="card h-100 shadow-sm">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text text-muted small">
                    {recipe.time} · {recipe.difficulty}
                  </p>
                  <button className="btn btn-primary w-100">View Recipe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
