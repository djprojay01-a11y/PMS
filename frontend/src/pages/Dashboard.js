import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to SwiftWheels PMS</h1>
          <p className="text-xl text-gray-600 mt-2">Promotion and Marketing Subsystem</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Username</p>
              <p className="text-xl font-semibold text-gray-800">{user?.userName}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="text-xl font-semibold text-gray-800 uppercase">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/vehicles"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Vehicles</h3>
            <p className="text-gray-600">Manage vehicle inventory and details</p>
          </Link>

          <Link
            to="/customers"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Customers</h3>
            <p className="text-gray-600">Manage customer information and status</p>
          </Link>

          <Link
            to="/promotions"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Promotions</h3>
            <p className="text-gray-600">Create and manage promotional campaigns</p>
          </Link>

          <Link
            to="/promotion-vehicles"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Promotion-Vehicle Links</h3>
            <p className="text-gray-600">Link promotions to vehicles</p>
          </Link>

          <Link
            to="/reports"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reports</h3>
            <p className="text-gray-600">Generate and view system reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
