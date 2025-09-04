import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';

const ProcessOrders = () => {
  const [activeTab, setActiveTab] = useState('to-be-picked');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample order data
  const ordersData = [
    {
      id: 1,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 2,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 3,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 4,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 5,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 6,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 7,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 8,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    },
    {
      id: 9,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000 rwf",
      items: "100 units",
      age: "1 day 3hours"
    }
  ];

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
                {ordersData.map((order) => (
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
