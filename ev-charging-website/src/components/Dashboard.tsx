import React, { useEffect, useState } from 'react';
import { getUserProfile, logout } from '../api';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserData(response);
      } catch (error) {
        setError((error as { detail?: string }).detail || 'Failed to fetch user profile.');
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      setError((error as { detail?: string }).detail || 'Logout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-40">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {userData && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h2>
          <p className="text-gray-700">Email: {userData.email}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;