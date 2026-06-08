import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { promotionAPI } from '../services/api';

const PromotionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    endDate: '',
    status: 'Active',
  });

  useEffect(() => {
    if (id) {
      fetchPromotion();
    }
  }, [id]);

  const fetchPromotion = async () => {
    try {
      const response = await promotionAPI.getById(id);
      const data = response.data;
      setFormData({
        ...data,
        startDate: new Date(data.startDate).toISOString().split('T')[0],
        endDate: new Date(data.endDate).toISOString().split('T')[0],
      });
    } catch (err) {
      setError('Failed to fetch promotion');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'discountValue' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      };

      if (id) {
        await promotionAPI.update(id, submitData);
      } else {
        await promotionAPI.create(submitData);
      }
      navigate('/promotions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save promotion');
    } finally {
      setLoading(false);
    }
  };

  const discountTypes = ['free', 'percentage', 'FLAT_RATE', 'CASHBACK', 'BUY_ONE_GET_ONE', 'Bundle', 'amount'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {id ? 'Edit Promotion' : 'Create New Promotion'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., New Year Sale, Holiday Price Slash"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Discount Type *</label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {discountTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Discount Value *</label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Promotion'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/promotions')}
              className="flex-1 bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionForm;
