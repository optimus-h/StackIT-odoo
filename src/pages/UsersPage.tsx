import React from "react";
import { useApp } from "../context/AppContext";

const UsersPage: React.FC = () => {
  const { users } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white border rounded-lg p-4 flex items-center gap-4 shadow hover:shadow-md transition"
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">{user.username}</div>
              <div className="text-xs text-gray-500">Reputation: {user.reputation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
