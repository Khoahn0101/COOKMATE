import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      {/* Hero Section */}
      <div className="hidden md:block bg-cover bg-center w-2/3" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80)'}}></div>
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 bg-white p-8 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl" onClick={() => navigate("/")} aria-label="Close">
          &times;
        </button>
        <h1 className="text-3xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-500 text-sm mb-8">Please login to your account</p>
        <form className="w-full max-w-xs space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Username or Email</label>
            <input type="text" className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your username or email" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your password" />
          </div>
          <div className="flex justify-between items-center text-xs mt-2">
            <button type="button" className="text-indigo-600 hover:underline" onClick={() => alert('Forgot Password?')}>Forgot Password</button>
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-full font-semibold mt-4">Login</button>
        </form>
        <button className="w-full flex items-center justify-center gap-2 py-2 mt-6 bg-gray-100 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200">
          <svg width="18" height="18" fill="currentColor" className="text-blue-700"><path d="M17.64 9.2045c0-.638-.057-1.252-.163-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.72v2.26h2.908c1.703-1.57 2.685-3.89 2.685-6.621z"/><path d="M9 18c2.43 0 4.47-.81 5.96-2.19l-2.908-2.26c-.81.54-1.85.86-3.052.86-2.348 0-4.34-1.59-5.05-3.73H1.01v2.34A8.997 8.997 0 0 0 9 18z"/><path d="M3.95 10.68A5.41 5.41 0 0 1 3.5 9c0-.59.1-1.16.27-1.68V4.98H1.01A8.997 8.997 0 0 0 0 9c0 1.42.34 2.77.95 3.97l2.998-2.29z"/><path d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.47.81 11.43 0 9 0A8.997 8.997 0 0 0 1.01 4.98l2.998 2.34C4.66 5.17 6.66 3.58 9 3.58z"/><path d="M17.64 9.2045c0-.638-.057-1.252-.163-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.72v2.26h2.908c1.703-1.57 2.685-3.89 2.685-6.621z"/></svg>
          Login with Facebook
        </button>
        <div className="text-xs text-gray-400 mt-8">Terms and Conditions & Privacy Policy</div>
        <div className="flex justify-center mt-4 text-sm">
          <span className="text-gray-600">Don&apos;t have an account?</span>
          <button className="ml-2 text-indigo-600 hover:underline" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login; 