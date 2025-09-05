import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProcessOrders = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('to-be-picked');
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const getStatusForTab = (tabId) => {
    const statusMap = {
      'to-be-picked': ['TO_BE_PICKED', 'PENDING'],
      'picking': ['PICKING'],
      'to-be-packed': ['TO_BE_PACKED'],
      'packed': ['PACKED']
    };
    return statusMap[tabId] || [];
  };

  const calculateAge = (createdAt) => {
    if (!createdAt) return 'Unknown';
    
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      const remainingHours = diffHours % 24;
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ${remainingHours}h`;
    } else {
      return `${diffHours}h`;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('https://ggm-backend-h025.onrender.com/api/orders', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const orders = await response.json();
        
        // Filter orders based on active tab
        const statusesToShow = getStatusForTab(activeTab);
        const filteredOrders = orders.filter(order => 
          statusesToShow.includes(order.status)
        );
        
        // Process orders for display
        const processedOrders = filteredOrders.map(order => ({
          id: order.id,
          distributorName: order.distributorName || order.customerName || 'Unknown Distributor',
          salesAssistant: order.salesAssistantName || 'Unassigned',
          orderValue: `${order.totalAmount || 0} rwf`,
          items: `${order.totalQuantity || 0} units`,
          age: calculateAge(order.createdAt || order.orderDate),
          status: order.status,
          createdAt: order.createdAt || order.orderDate
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://ggm-backend-h025.onrender.com/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Refresh orders after status update
        fetchOrders();
      } else {
        console.warn('Failed to update order status:', response.statusText);
      }
    } catch (error) {
      console.warn('Error updating order status:', error);
    }
  };

  const handleActionClick = (orderId) => {
    const nextStatusMap = {
      'to-be-picked': 'PICKING',
      'picking': 'TO_BE_PACKED',
      'to-be-packed': 'PACKED',
      'packed': 'SHIPPED'
    };
    
    const nextStatus = nextStatusMap[activeTab];
    if (nextStatus) {
      updateOrderStatus(orderId, nextStatus);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const tabs = [
    {
      id: 'to-be-picked',
      label: 'To Be Picked',
      icon: '📦',
      step: '01',
      title: 'Process Order step 1',
      subtitle: 'Focus on order efficiency through your processing'
    },
    {
      id: 'picking',
      label: 'Picking',
      icon: '🔄',
      step: '02',
      title: 'Process Order step 2',
      subtitle: 'Focus on order efficiency through your processing'
    },
    {
      id: 'to-be-packed',
      label: 'To Be Packed',
      icon: '📋',
      step: '03',
      title: 'Process Order step 3',
      subtitle: 'Focus on order efficiency through your processing'
    },
    {
      id: 'packed',
      label: 'Packed',
      icon: '✅',
      step: '04',
      title: 'Process Order step 4',
      subtitle: 'Focus on order efficiency through your processing'
    }
  ];

  const getCurrentTab = () => tabs.find(tab => tab.id === activeTab);
  const currentTab = getCurrentTab();

  const getActionButton = () => {
    switch (activeTab) {
      case 'to-be-picked':
        return { text: 'Start Picking', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'picking':
        return { text: 'Picking Complete', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'to-be-packed':
        return { text: 'Start Packing', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'packed':
        return { text: 'Mark as Shipped', color: 'bg-purple-600 hover:bg-purple-700' };
      default:
        return { text: 'Action', color: 'bg-purple-600 hover:bg-purple-700' };
    }
  };

  const actionButton = getActionButton();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">{currentTab.step} {currentTab.title}</div>
            <h1 className="text-2xl font-semibold text-gray-900">Order Processing</h1>
            <p className="text-sm text-gray-500">{currentTab.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Process Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Distributor Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Sales Assistant Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Order Value
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Items
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Age
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : ordersData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No orders found for this status
                    </td>
                  </tr>
                ) : (
                  ordersData.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="/distributor.png" 
                          alt={order.distributorName} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="/distributor.png" 
                          alt={order.salesAssistant} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-700">{order.salesAssistant}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.orderValue}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.items}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.age}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleActionClick(order.id)}
                        className={`${actionButton.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                      >
                        {actionButton.text}
                      </button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing 1 to 10 of 50 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">4</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">5</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Actions Menu (Top Right) */}
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 hidden" id="actions-menu">
          <div className="text-xs text-gray-500 mb-2">Actions to be...</div>
          <div className="space-y-1">
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>👁️</span>
              <span>View Details</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>🏁</span>
              <span>Start Picking</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>📄</span>
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessOrders;
