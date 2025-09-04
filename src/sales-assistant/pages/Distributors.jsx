import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Distributors = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const navigate = useNavigate();

  // Sample distributors data
  const distributors = [
    {
      id: 1,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    },
    {
      id: 2,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    },
    {
      id: 3,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    },
    {
      id: 4,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    },
    {
      id: 5,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    },
    {
      id: 6,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    },
    {
      id: 7,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      lastOrderDate: '10/12/2025',
      totalRevenue: '100,000rwf'
    }
  ];

  const handleDeleteClick = (distributor) => {
    setSelectedDistributor(distributor);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    setShowDeleteModal(false);
    setSelectedDistributor(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Distributor Management</h1>
            <p className="text-sm text-gray-500">View Distributors Activities</p>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today Distributors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Today Distributors</p>
                <p className="text-2xl font-bold text-gray-900">470</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">-4%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>

          {/* Total Distributor Contribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Distributor Contribution</p>
                <p className="text-2xl font-bold text-gray-900">5,000,000rwf</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>

          {/* Average Revenue Per Account */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Revenue Per Account</p>
                <p className="text-2xl font-bold text-gray-900">560,000rwf</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
            />
          </div>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>

        {/* Distributors Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Sales Assistant Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Last Order Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Total YTD Revenue</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {distributors.map((distributor) => (
                  <tr key={distributor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={distributor.distributorAvatar} 
                          alt={distributor.distributorName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{distributor.distributorName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={distributor.salesAssistantAvatar} 
                          alt={distributor.salesAssistantName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-sm text-gray-700">{distributor.salesAssistantName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{distributor.lastOrderDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{distributor.totalRevenue}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => navigate(`/sales-assistant/distributors/${distributor.id}`)}
                          className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                        >
                          View Distributor Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Showing</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-700">Showing 1 to 10 out of 46 records</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">4</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <div className="text-red-600 text-2xl font-bold">⚠</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to delete this order?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This order will be deleted permanently.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributors;
