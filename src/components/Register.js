import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Navbar from "./Navbar";
import Button from "./Button";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username/email and password.");
      return;
    }
    setError("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Hero Image */}
        <motion.div
          className="hidden md:block bg-cover bg-center w-2/3"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80)', borderRadius: '0 2rem 2rem 0' }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        {/* Form Section */}
        <motion.div
          className="flex flex-col justify-center items-center w-full md:w-1/3 bg-gray-50 p-6 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 relative">
            <Link to="/" className="flex items-center mb-6 hover:opacity-80 transition" aria-label="Home">
              <img src="/cookmate.jpg" alt="CookMate Logo" className="w-8 h-8 mr-2 rounded-full" />
              <span className="text-xl font-bold text-gray-800">Cook<span className="text-orange-500">Mate</span></span>
            </Link>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl" onClick={() => navigate("/")} aria-label="Close register form">
              &times;
            </button>
            <h1 className="text-2xl font-bold text-orange-500 mb-2">Register</h1>
            <p className="text-gray-500 text-sm mb-6">Create your free CookMate account.</p>
            <form className="w-full space-y-4" onSubmit={handleSubmit} autoComplete="off" aria-label="Register form">
              <div>
                <label className="block text-xs text-gray-500 mb-1" htmlFor="register-username">Username or Email</label>
                <input
                  id="register-username"
                  type="text"
                  className="w-full px-4 py-3 rounded-full bg-transparent border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  placeholder="Enter your username or email"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  aria-label="Username or Email"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" htmlFor="register-password">Password</label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-full bg-transparent border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}
              <Button type="submit" className="w-full mt-4" ariaLabel="Register">Register</Button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="mx-3 text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <Button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200" ariaLabel="Register with Facebook">
              <svg width="18" height="18" fill="currentColor" className="text-blue-700"><path d="M17.64 9.2045c0-.638-.057-1.252-.163-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.72v2.26h2.908c1.703-1.57 2.685-3.89 2.685-6.621z"/><path d="M9 18c2.43 0 4.47-.81 5.96-2.19l-2.908-2.26c-.81.54-1.85.86-3.052.86-2.348 0-4.34-1.59-5.05-3.73H1.01v2.34A8.997 8.997 0 0 0 9 18z"/><path d="M3.95 10.68A5.41 5.41 0 0 1 3.5 9c0-.59.1-1.16.27-1.68V4.98H1.01A8.997 8.997 0 0 0 0 9c0 1.42.34 2.77.95 3.97l2.998-2.29z"/><path d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.47.81 11.43 0 9 0A8.997 8.997 0 0 0 1.01 4.98l2.998 2.34C4.66 5.17 6.66 3.58 9 3.58z"/><path d="M17.64 9.2045c0-.638-.057-1.252-.163-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.72v2.26h2.908c1.703-1.57 2.685-3.89 2.685-6.621z"/></svg>
              Register with Facebook
            </Button>
            <div className="text-xs text-gray-400 mt-8 text-center">Terms and Conditions & Privacy Policy</div>
            <div className="flex justify-center mt-4 text-sm">
              <span className="text-gray-600">Already have an account?</span>
              <button className="ml-2 text-orange-500 hover:underline" onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register; 