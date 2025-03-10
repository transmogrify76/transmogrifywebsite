import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(formData);
      navigate('/login');
    } catch (error) {
      setError((error as { detail?: string }).detail || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Create Your Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8EB03E] outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8EB03E] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8EB03E] outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8EB03E] outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8EB03E] to-[#6A8F2E] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#8EB03E] hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;