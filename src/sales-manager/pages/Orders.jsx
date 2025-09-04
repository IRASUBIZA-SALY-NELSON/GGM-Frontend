import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Filter, Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample orders data matching the design
  const ordersData = [
    {
      id: 1,
      distributorName: 'Leasie Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leasie Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      distributorName: 'Leasie Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leasie Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      distributorName: 'Leasie Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leasie Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 4,
      distributorName: 'Leasie Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leasie Watson',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '1,000rwf',
      status: 'Approved',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 5,
      distributorName: 'Leslie Alexander',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leslie Alexander',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '400,000rwf',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100'
    },
    {
      id: 6,
      distributorName: 'Leslie Alexander',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leslie Alexander',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '400,000rwf',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100'
    },
    {
      id: 7,
      distributorName: 'Leslie Alexander',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Leslie Alexander',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '400,000rwf',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100'
    },
    {
      id: 8,
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Ronald Richards',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '500,000rwf',
      status: 'Pending',
      statusColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 9,
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Ronald Richards',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '500,000rwf',
      status: 'Pending',
      statusColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 10,
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Ronald Richards',
      salesAssistantAvatar: '/distributor.png',
      orderValue: '500,000rwf',
      status: 'Pending',
      statusColor: 'text-yellow-600 bg-yellow-100'
    }
  ];

  const handleViewOrder = (orderId) => {
    navigate(`/sales-manager/orders/${orderId}`);
  };

  const handleApprove = (order) => {
    setSelectedOrder(order);
    setShowApproveModal(true);
  };

  const handleReject = (order) => {
    setSelectedOrder(order);
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    // Handle approve logic here
    setShowApproveModal(false);
    setSelectedOrder(null);
  };

  const confirmReject = () => {
    // Handle reject logic here
    setShowRejectModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500">Keep Track Of All Orders</p>
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

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distributor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Assistant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordersData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={order.distributorAvatar} alt="" />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{order.distributorName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={order.salesAssistantAvatar} alt="" />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{order.salesAssistantName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Review
                  </button>
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="inline-flex items-center px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Exp to CSV
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

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <div className="text-purple-600 text-2xl">✓</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to Approve this Order?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The order will be approved successfully.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Approve Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <div className="text-red-600 text-2xl">⚠</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to reject this order?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The order will be rejected successfully.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
