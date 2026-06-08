import React, { useState, useEffect } from 'react';
import { promotionAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPromotions();
  }, [search, status]);

  const fetchPromotions = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      const response = await promotionAPI.getAll(params);
      setPromotions(response.data);
    } catch (err) {
      setError('Failed to fetch promotions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      try {
        await promotionAPI.delete(id);
        fetchPromotions();
      } catch (err) {
        setError('Failed to delete promotion');
      }
    }
  };

  const isActive = (promo) => {
    const now = new Date();
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);
    return now >= start && now <= end;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Promotions</h1>
          <Link
            to="/promotions/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Promotion
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : promotions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            No promotions found
          </div>
        ) : (
          <div className="grid gap-6">
            {promotions.map((promo) => (
              <div key={promo._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{promo.title}</h3>
                    <p className="text-gray-600 mb-4">{promo.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isActive(promo)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {isActive(promo) ? 'Running' : 'Scheduled'}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        promo.status === 'Active'
                          ? 'bg-blue-100 text-blue-800'
                          : promo.status === 'Inactive'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {promo.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Discount Type</p>
                    <p className="font-semibold text-gray-800">{promo.discountType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Discount Value</p>
                    <p className="font-semibold text-gray-800">{promo.discountValue}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-semibold text-gray-800">{new Date(promo.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">End Date</p>
                    <p className="font-semibold text-gray-800">{new Date(promo.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/promotions/edit/${promo._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(promo._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotions;
