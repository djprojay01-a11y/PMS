import React, { useState, useEffect } from 'react';
import { promotionVehicleAPI, promotionAPI, vehicleAPI } from '../services/api';
import { Link } from 'react-router-dom';

const PromotionVehicles = () => {
  const [links, setLinks] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [linksRes, promosRes, vehiclesRes] = await Promise.all([
        promotionVehicleAPI.getAll(),
        promotionAPI.getAll({}),
        vehicleAPI.getAll({}),
      ]);
      setLinks(linksRes.data);
      setPromotions(promosRes.data);
      setVehicles(vehiclesRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!selectedPromotion || !selectedVehicle) {
      setError('Please select both promotion and vehicle');
      return;
    }

    try {
      await promotionVehicleAPI.create({
        promotion: selectedPromotion,
        vehicle: selectedVehicle,
        performance: 'Pending',
      });
      setSelectedPromotion('');
      setSelectedVehicle('');
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create link');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this link?')) {
      try {
        await promotionVehicleAPI.delete(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete link');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Promotion-Vehicle Links</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? '✕ Close' : '+ Add Link'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Add Link Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Create New Link</h2>
            <form onSubmit={handleAddLink}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Promotion *</label>
                  <select
                    value={selectedPromotion}
                    onChange={(e) => setSelectedPromotion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a promotion</option>
                    {promotions.map((promo) => (
                      <option key={promo._id} value={promo._id}>
                        {promo.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Vehicle *</label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a vehicle</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.brand} {vehicle.model} ({vehicle.plateNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Link
              </button>
            </form>
          </div>
        )}

        {/* Links List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : links.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            No promotion-vehicle links found
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Promotion</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Performance</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{link.promotion?.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {link.vehicle?.brand} {link.vehicle?.model}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">{link.promotion?.discountType}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            link.performance === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : link.performance === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {link.performance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(link._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionVehicles;
