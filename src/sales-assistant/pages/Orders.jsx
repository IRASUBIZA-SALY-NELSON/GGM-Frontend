import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, FileText, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  // Sample orders data
  const orders = [
    {
      id: 1,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 2,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 3,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 4,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 5,
      distributorName: 'Louise Alexander',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Alexander',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000,000rwf',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 6,
      distributorName: 'Louise Alexander',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Alexander',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '600,000rwf',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 7,
      distributorName: 'Louise Alexander',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Alexander',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '600,000rwf',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 8,
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Ronald Richards',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '500,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 9,
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Ronald Richards',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '500,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      actions: ['View', 'Edit', 'Delete']
    },
    {
      id: 10,
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Ronald Richards',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '500,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      actions: ['View', 'Edit', 'Delete']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Order Management</h1>
            <p className="text-sm text-gray-500">View Orders and Activities</p>
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
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Place New Order</span>
            </button>
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Sales Assistant Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Order Value</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={order.distributorAvatar} 
                          alt={order.distributorName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={order.salesAssistantAvatar} 
                          alt={order.salesAssistantName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-sm text-gray-700">{order.salesAssistantName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{order.orderValue}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => navigate(`/sales-assistant/orders/${order.id}`)}
                          className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button className="inline-flex items-center px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                        <button className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                          Delete
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
    </div>
  );
};

export default Orders;
