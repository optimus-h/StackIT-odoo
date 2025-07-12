import React from "react";
import { useApp } from "../context/AppContext";

const ProfilePage: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Not logged in</h2>
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={currentUser.avatar}
          alt={currentUser.username}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{currentUser.username}</h1>
          <p className="text-gray-600">{currentUser.email}</p>
          <p className="text-gray-500 text-sm">Reputation: {currentUser.reputation}</p>
          <p className="text-gray-500 text-sm">Joined: {currentUser.joinDate.toLocaleDateString()}</p>
        </div>
      </div>
      {/* Add more profile info as needed */}
    </div>
  );
};

export default ProfilePage;