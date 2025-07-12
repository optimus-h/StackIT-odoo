import React from "react";
import { useApp } from "../context/AppContext";

const SettingsPage: React.FC = () => {
  const { currentUser, onNavigate } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Not logged in</h2>
        <p className="text-gray-600">Please log in to access settings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={currentUser.email}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        {/* Add more settings fields as needed */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
      <div className="mt-8">
        <button
          onClick={() => onNavigate('profile')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Profile
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;