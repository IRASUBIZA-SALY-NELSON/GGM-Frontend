import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StockTransfers = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('requested');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [transfersData, setTransfersData] = useState([]);
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
      'requested': ['REQUESTED', 'PENDING'],
      'in-progress': ['IN_PROGRESS', 'APPROVED'],
      'shipped': ['SHIPPED'],
      'delivered': ['DELIVERED', 'COMPLETED']
    };
    return statusMap[tabId] || [];
  };

  const fetchTransfers = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/stock-transfers', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const transfers = await response.json();
        
        // Filter transfers based on active tab
        const statusesToShow = getStatusForTab(activeTab);
        const filteredTransfers = transfers.filter(transfer => 
          statusesToShow.includes(transfer.status)
        );
        
        // Process transfers for display
        const processedTransfers = filteredTransfers.map(transfer => ({
          id: transfer.id,
          source: transfer.sourceLocation || transfer.fromWarehouse || 'Unknown Source',
          destination: transfer.destinationLocation || transfer.toWarehouse || 'Unknown Destination',
          requestedBy: transfer.requestedByName || transfer.createdByName || 'Unknown User',
          items: `${transfer.totalQuantity || 0} units`,
          date: transfer.requestedDate ? new Date(transfer.requestedDate).toLocaleDateString() : 
                transfer.createdAt ? new Date(transfer.createdAt).toLocaleDateString() : 'Unknown',
          status: transfer.status,
          createdAt: transfer.createdAt || transfer.requestedDate
        }));
        
        setTransfersData(processedTransfers);
      } else {
        console.warn('Failed to fetch stock transfers:', response.statusText);
        setTransfersData([]);
      }
    } catch (error) {
      console.warn('Error fetching stock transfers:', error);
      setTransfersData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTransferStatus = async (transferId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/stock-transfers/${transferId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Refresh transfers after status update
        fetchTransfers();
      } else {
        console.warn('Failed to update transfer status:', response.statusText);
      }
    } catch (error) {
      console.warn('Error updating transfer status:', error);
    }
  };

  const handleActionClick = (transferId) => {
    const nextStatusMap = {
      'requested': 'IN_PROGRESS',
      'in-progress': 'SHIPPED',
      'shipped': 'DELIVERED',
      'delivered': 'COMPLETED'
    };
    
    const nextStatus = nextStatusMap[activeTab];
    if (nextStatus) {
      updateTransferStatus(transferId, nextStatus);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [activeTab]);

  const tabs = [
    {
      id: 'requested',
      label: 'Requested',
      icon: '📋',
      step: '01',
      title: 'Stock transfers option 1',
      subtitle: 'Control center for moving inventory between locations'
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      icon: '🔄',
      step: '02',
      title: 'Stock transfers option 2',
      subtitle: 'Control center for moving inventory between locations'
    },
    {
      id: 'shipped',
      label: 'Shipped',
      icon: '🚚',
      step: '03',
      title: 'Stock transfers option 3',
      subtitle: 'Control center for moving inventory between locations'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      icon: '✅',
      step: '04',
      title: 'Stock transfers option 4',
      subtitle: 'Control center for moving inventory between locations'
    }
  ];

  const getCurrentTab = () => tabs.find(tab => tab.id === activeTab);
  const currentTab = getCurrentTab();

  const getActionButton = () => {
    switch (activeTab) {
      case 'requested':
        return { text: 'Approve', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'in-progress':
        return { text: 'Ship', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'shipped':
        return { text: 'Confirm', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'delivered':
        return { text: 'Complete', color: 'bg-purple-600 hover:bg-purple-700' };
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
            <h1 className="text-2xl font-semibold text-gray-900">Stock Transfers</h1>
            <p className="text-sm text-gray-500">{currentTab.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Transfer Status Tabs */}
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

          {/* Transfers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Source
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Destination
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Requested By
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Items
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                    Date
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
                      Loading transfers...
                    </td>
                  </tr>
                ) : transfersData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No transfers found for this status
                    </td>
                  </tr>
                ) : (
                  transfersData.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{transfer.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transfer.destination}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="/distributor.png" 
                          alt={transfer.requestedBy} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-700">{transfer.requestedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transfer.items}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transfer.date}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleActionClick(transfer.id)}
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
              Showing 1 to 9 of 45 results
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
              <span>📋</span>
              <span>Review Request</span>
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

export default StockTransfers;
