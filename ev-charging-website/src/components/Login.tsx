import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData);
      navigate('/dashboard'); 
    } catch (error) {
      setError((error as { detail?: string }).detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8EB03E] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8EB03E] outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8EB03E] to-[#6A8F2E] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Log In
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#8EB03E] hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;