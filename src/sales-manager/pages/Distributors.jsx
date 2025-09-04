import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Filter, Plus, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Distributors = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  // Sample distributors data matching the design
  const distributorsData = [
    {
      id: 1,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    },
    {
      id: 2,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    },
    {
      id: 3,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    },
    {
      id: 4,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    },
    {
      id: 5,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    },
    {
      id: 6,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    },
    {
      id: 7,
      companyName: 'AMACO CLOTHES LTD',
      managerName: 'Leasie Watson',
      managerAvatar: '/distributor.png',
      lastOrder: '10/12/2025',
      orderValue: '100,000rwf'
    }
  ];

  const handleViewDistributor = (distributorId) => {
    navigate(`/sales-manager/distributors/${distributorId}`);
  };

  const handleAddDistributor = () => {
    navigate('/sales-manager/distributors/add-new');
  };

  const handleDeleteDistributor = (distributor) => {
    setSelectedDistributor(distributor);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    setShowDeleteModal(false);
    setSelectedDistributor(null);
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Distributor Management</h1>
          <p className="text-sm text-gray-500">Keep Track Of All Distributors</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/distributor.png" alt="Profile" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today Distributors</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">470</p>
              <p className="text-xs text-gray-500 mt-1">Update Sep 14, 2024</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Distributor Contribution</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">5,000,000rwf</p>
              <p className="text-xs text-gray-500 mt-1">Update July 14, 2024</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Revenue Per Account</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">560,000rwf</p>
              <p className="text-xs text-gray-500 mt-1">Update May 14, 2024</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddDistributor}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>ADD DISTRIBUTOR</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Distributors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {distributorsData.map((distributor) => (
              <tr key={distributor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {distributor.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={distributor.managerAvatar} alt="" />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{distributor.managerName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {distributor.lastOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {distributor.orderValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleViewDistributor(distributor.id)}
                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeleteDistributor(distributor)}
                    className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Showing</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Distributor
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete {selectedDistributor?.companyName}? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributors;
