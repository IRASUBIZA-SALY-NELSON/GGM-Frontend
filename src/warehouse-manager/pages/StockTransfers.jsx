import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const StockTransfers = () => {
  const [activeTab, setActiveTab] = useState('requested');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample transfer data
  const transfersData = [
    {
      id: 1,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 2,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 3,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 4,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 5,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 6,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 7,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 8,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    },
    {
      id: 9,
      source: "Main Factory Warehouse",
      destination: "City Electronics Store",
      requestedBy: "Ronald Richards",
      items: "100 units",
      date: "10/12/2025"
    }
  ];

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
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Robert Allen" 
                className="w-8 h-8 rounded-full"
              />
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">Robert Allen</div>
                <div className="text-xs text-gray-500">Warehouse Manager</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
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
                {transfersData.map((transfer) => (
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
                      <button className={`${actionButton.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
                        {actionButton.text}
                      </button>
                    </td>
                  </tr>
                ))}
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
