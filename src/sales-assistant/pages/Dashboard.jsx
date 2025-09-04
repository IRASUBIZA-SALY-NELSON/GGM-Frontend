import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Eye, FileText, Filter } from 'lucide-react';

const Dashboard = () => {
  const [showFilter, setShowFilter] = useState(false);

  // Sample data for My Recent Orders
  const recentOrders = [
    {
      id: 1,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderDate: '10/12/2025',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderDate: '10/12/2025',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 3,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderDate: '10/12/2025',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 4,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderDate: '10/12/2025',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 5,
      distributorName: 'Louise Watson',
      distributorAvatar: '/distributor.png',
      salesAssistantName: 'Louise Watson',
      salesAssistantAvatar: '/distributor.png',
      orderDate: '10/12/2025',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  // Sample data for My Distributors
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
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Hello Robert 👋</h1>
            <p className="text-sm text-gray-500">Good Morning</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* My Revenue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">My Revenue (MTD)</p>
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

          {/* My Number of Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">My Number of Orders (MTD)</p>
                <p className="text-2xl font-bold text-gray-900">200</p>
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

          {/* My Quota */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">My Quota</p>
                <p className="text-2xl font-bold text-gray-900">86%</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <select className="text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '86%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* My Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Recent Orders</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Distributor Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sales Assistant Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Order Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={order.distributorAvatar} 
                            alt={order.distributorName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={order.salesAssistantAvatar} 
                            alt={order.salesAssistantName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{order.salesAssistantName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{order.orderDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </button>
                          <button className="inline-flex items-center px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                            <FileText className="w-3 h-3 mr-1" />
                            Exp to CSV
                          </button>
                        </div>
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

        {/* My Distributors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Distributors</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Distributor Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sales Assistant Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Order Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Total YTD Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {distributors.map((distributor) => (
                    <tr key={distributor.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={distributor.distributorAvatar} 
                            alt={distributor.distributorName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{distributor.distributorName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={distributor.salesAssistantAvatar} 
                            alt={distributor.salesAssistantName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{distributor.salesAssistantName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{distributor.lastOrderDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{distributor.totalRevenue}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                          View Distributor Details
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
    </div>
  );
};

export default Dashboard;
