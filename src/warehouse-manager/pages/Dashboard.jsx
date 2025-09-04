import React, { useState } from 'react';
import { Search, Filter, Eye, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WarehouseManagerDashboard = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('April');

  // Sample data for stats cards
  const statsData = [
    {
      title: "Today's Shipments",
      value: "560",
      change: "+16%",
      changeType: "positive",
      subtitle: "Update: July 16, 2023"
    },
    {
      title: "Orders to Process Today",
      value: "100",
      change: "+8%",
      changeType: "positive",
      subtitle: "Update: July 16, 2023"
    },
    {
      title: "Pending Reconcile",
      value: "500",
      change: "-6%",
      changeType: "negative",
      subtitle: "Update: July 16, 2023"
    },
    {
      title: "Low Stock Alerts",
      value: "50",
      change: "+3%",
      changeType: "positive",
      subtitle: "Update: July 16, 2023"
    }
  ];

  // Sample data for order fulfillment queue
  const ordersData = [
    {
      id: 1,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000rwf",
      status: "To be Picked",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000rwf",
      status: "Picking",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 3,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000rwf",
      status: "To be Picked",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 4,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000rwf",
      status: "Packed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 5,
      distributorName: "Ronald Richards",
      salesAssistant: "Ronald Richards",
      orderValue: "500,000rwf",
      status: "Packed",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const chartData = [
    { label: "To be Picked", percentage: 25, count: "25 orders", color: "bg-purple-600" },
    { label: "Picking", percentage: 20, count: "20 orders", color: "bg-purple-400" },
    { label: "To be Packed", percentage: 20, count: "20 orders", color: "bg-purple-300" },
    { label: "Packed", percentage: 35, count: "35 orders", color: "bg-purple-200" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Hello Robert</h1>
            <p className="text-sm text-gray-500">Good Morning</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Robert Allen" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/warehouse-manager/process-orders')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Process Orders
            </button>
            <button 
              onClick={() => navigate('/warehouse-manager/stock-management')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Receive New Stock
            </button>
            <button 
              onClick={() => navigate('/warehouse-manager/stock-transfers')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Create Transfer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Fulfillment Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Fulfillment Analytics Overview</h3>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
              </select>
            </div>
            
            {/* Donut Chart */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="10" 
                    strokeDasharray="87.96" strokeDashoffset="21.99" className="transition-all duration-300"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#a78bfa" strokeWidth="10" 
                    strokeDasharray="50.27" strokeDashoffset="71.26" className="transition-all duration-300"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#c4b5fd" strokeWidth="10" 
                    strokeDasharray="50.27" strokeDashoffset="121.53" className="transition-all duration-300"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd6fe" strokeWidth="10" 
                    strokeDasharray="87.96" strokeDashoffset="171.8" className="transition-all duration-300"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">100</div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                    <div className="text-xs text-gray-500">{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Fulfillment Queue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Fulfillment Queue</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Distributor Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Sales Assistant Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Order Value</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ordersData.map((order) => (
                    <tr key={order.id}>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="/distributor.png" 
                            alt={order.distributorName} 
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="/distributor.png" 
                            alt={order.salesAssistant} 
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{order.salesAssistant}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-900">{order.orderValue}</td>
                      <td className="py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700">
                            View Order
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing 1 to 5 of 5 results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseManagerDashboard;
