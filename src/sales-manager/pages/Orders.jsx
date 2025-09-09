import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Filter, Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8001/api/orders', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const orders = await response.json();
        
        const processedOrders = orders.map(order => ({
          id: order.id,
          distributorName: order.customerName || order.distributorName || 'Unknown Distributor',
          distributorAvatar: '/distributor.png',
          salesAssistantName: order.salesAssistant || order.createdBy || 'Unknown Sales Assistant',
          salesAssistantAvatar: '/distributor.png',
          orderValue: `${(order.totalAmount || order.amount || 0).toLocaleString()}rwf`,
          status: order.status || 'Pending',
          statusColor: getStatusColor(order.status)
        }));
        
        setOrdersData(processedOrders);
      } else {
        console.warn('Failed to fetch orders:', response.statusText);
        setOrdersData([]);
      }
    } catch (error) {
      console.warn('Error fetching orders:', error);
      setOrdersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const confirmApprove = async () => {
    if (!selectedOrder) return;
    
    try {
      const response = await fetch(`http://localhost:8001/api/orders/${selectedOrder.id}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        // Refresh orders list
        fetchOrders();
      } else {
        console.error('Failed to approve order');
        alert('Failed to approve order. Please try again.');
      }
    } catch (error) {
      console.error('Error approving order:', error);
      alert('Error approving order. Please try again.');
    }
    
    setShowApproveModal(false);
    setSelectedOrder(null);
  };

  const confirmReject = async () => {
    if (!selectedOrder) return;
    
    try {
      const response = await fetch(`http://localhost:8001/api/orders/${selectedOrder.id}/reject`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        // Refresh orders list
        fetchOrders();
      } else {
        console.error('Failed to reject order');
        alert('Failed to reject order. Please try again.');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Error rejecting order. Please try again.');
    }
    
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {loading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  Loading orders...
                </td>
              </tr>
            ) : ordersData.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              ordersData
                .filter(order => 
                  order.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.salesAssistantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.status.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((order) => (
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
                ))
            )}
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
