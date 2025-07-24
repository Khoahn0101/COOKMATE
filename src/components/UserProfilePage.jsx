import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";
import { motion } from "framer-motion";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Placeholder user data - replace with actual user data from your app
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // URL to user avatar image
    joinDate: "March 2024",
    recipesPosted: 12,
    recipesSaved: 45,
    totalCookTime: "156 hours",
    favoriteCuisine: "Italian"
  });

  const handleEditProfile = () => {
    setIsEditing(true);
    // Add your edit profile logic here
    console.log("Edit profile clicked");
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    navigate("/login");
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Add your save profile logic here
    console.log("Save profile clicked");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset any changes if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <motion.main
        className="flex-1 container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <i className="fas fa-user text-3xl text-orange-500"></i>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <i className="fas fa-camera text-sm"></i>
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {userData.fullName}
              </h2>
              <p className="text-gray-600 mb-2">{userData.email}</p>
              <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-500 mb-1">
                  {userData.recipesPosted}
                </div>
                <div className="text-sm text-gray-600">Recipes Posted</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-500 mb-1">
                  {userData.recipesSaved}
                </div>
                <div className="text-sm text-gray-600">Recipes Saved</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-500 mb-1">
                  {userData.totalCookTime}
                </div>
                <div className="text-sm text-gray-600">Total Cook Time</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-orange-500 mb-1">
                  {userData.favoriteCuisine}
                </div>
                <div className="text-sm text-gray-600">Favorite Cuisine</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isEditing ? (
                <>
                  <Button
                    className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                    onClick={handleSaveProfile}
                    ariaLabel="Save profile changes"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Changes
                  </Button>
                  <Button
                    className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={handleCancelEdit}
                    ariaLabel="Cancel editing"
                  >
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                    onClick={handleEditProfile}
                    ariaLabel="Edit profile"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit Profile
                  </Button>
                  <Button
                    className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                    ariaLabel="Logout from account"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Additional Settings Section */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-bell text-orange-500 mr-3"></i>
                  <div>
                    <div className="font-medium text-gray-800">Notifications</div>
                    <div className="text-sm text-gray-600">Manage your notification preferences</div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-shield-alt text-orange-500 mr-3"></i>
                  <div>
                    <div className="font-medium text-gray-800">Privacy & Security</div>
                    <div className="text-sm text-gray-600">Update your privacy settings</div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <i className="fas fa-palette text-orange-500 mr-3"></i>
                  <div>
                    <div className="font-medium text-gray-800">Appearance</div>
                    <div className="text-sm text-gray-600">Customize your app theme</div>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default UserProfilePage; 