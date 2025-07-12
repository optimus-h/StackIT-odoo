import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const SignupPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // You can add real signup logic here
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just go to login
    onNavigate("login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => onNavigate("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
