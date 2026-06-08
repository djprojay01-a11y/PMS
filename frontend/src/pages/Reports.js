import React, { useState } from 'react';
import { reportAPI } from '../services/api';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [detailedReport, setDetailedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('summary');

  const generateReport = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await reportAPI.generate({});
      setReportData(response.data);
      setActiveTab('summary');
    } catch (err) {
      setError('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const generateDetailedReport = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await reportAPI.getDetailed();
      setDetailedReport(response.data);
      setActiveTab('detailed');
    } catch (err) {
      setError('Failed to generate detailed report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Reports</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
          >
            {loading && activeTab === 'summary' ? 'Generating...' : 'Generate Summary Report'}
          </button>
          <button
            onClick={generateDetailedReport}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-semibold"
          >
            {loading && activeTab === 'detailed' ? 'Generating...' : 'Generate Detailed Report'}
          </button>
        </div>

        {/* Tabs */}
        {(reportData || detailedReport) && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-6 py-3 font-semibold ${
                  activeTab === 'summary'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Summary Report
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`px-6 py-3 font-semibold ${
                  activeTab === 'detailed'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Detailed Report
              </button>
            </div>

            <div className="p-8">
              {/* Summary Report */}
              {activeTab === 'summary' && reportData && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Promotion-Vehicle Report</h2>
                  <p className="text-gray-600 mb-6">Total Records: {reportData.total}</p>

                  {reportData.data.length === 0 ? (
                    <p className="text-gray-600">No data available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Promotion</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Value</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.data.map((row, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm text-gray-800">{row.customerName}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">
                                {row.vehicleBrand} {row.vehicleModel}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">{row.promotionTitle}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{row.discountType}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{row.discountValue}</td>
                              <td className="px-6 py-4 text-sm">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                  {row.performance}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Report */}
              {activeTab === 'detailed' && detailedReport && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Detailed System Report</h2>

                  {/* Summary Stats */}
                  <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <p className="text-gray-600 text-sm">Total Promotions</p>
                      <p className="text-3xl font-bold text-blue-600">{detailedReport.totalPromotions}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {detailedReport.activePromotions} Active
                      </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <p className="text-gray-600 text-sm">Total Vehicles</p>
                      <p className="text-3xl font-bold text-green-600">{detailedReport.totalVehicles}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {detailedReport.activeVehicles} Active
                      </p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <p className="text-gray-600 text-sm">Total Customers</p>
                      <p className="text-3xl font-bold text-purple-600">{detailedReport.totalCustomers}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {detailedReport.activeCustomers} Active
                      </p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <p className="text-gray-600 text-sm">Total Links</p>
                      <p className="text-3xl font-bold text-orange-600">{detailedReport.totalLinks}</p>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <h3 className="text-xl font-bold mb-4">Promotion-Vehicle Details</h3>
                  {detailedReport.promotionVehicleDetails.length === 0 ? (
                    <p className="text-gray-600">No data available</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Promotion</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plate</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Type</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Value</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detailedReport.promotionVehicleDetails.map((row, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm text-gray-800">{row.promotionTitle}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">
                                {row.vehicleBrand} {row.vehicleModel}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">{row.vehiclePlate}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{row.discountType}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{row.discountValue}</td>
                              <td className="px-6 py-4 text-sm">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                  {row.performance}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
