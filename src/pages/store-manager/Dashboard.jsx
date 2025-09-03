import React from 'react'
import { 
  Search, 
  Bell, 
  ChevronDown, 
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  CreditCard
} from 'lucide-react'

const Dashboard = () => {
  const statsCards = [
    {
      title: 'Total Orders',
      value: '560',
      change: '+8%',
      changeType: 'increase',
      updateTime: 'Update: July 14, 2023',
      icon: '📦',
      color: 'purple'
    },
    {
      title: 'Monthly Spending',
      value: '1,050,000 rwf',
      change: '+12%',
      changeType: 'increase',
      updateTime: 'Update: July 16, 2023',
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Top Selling Product',
      value: 'Jeans',
      change: '+8%',
      changeType: 'increase',
      updateTime: 'Update: July 14, 2023',
      icon: '👕',
      color: 'purple'
    },
    {
      title: 'Total Inventory Value',
      value: '2,000,200 rwf',
      change: '+12%',
      changeType: 'increase',
      updateTime: 'Update: July 16, 2023',
      icon: '📊',
      color: 'purple'
    }
  ]

  const recentOrders = [
    { id: 1, customer: 'Leasie Watson', avatar: 'LW', status: 'Pending', quantity: 100, date: '10/12/2025 10:12pm' },
    { id: 2, customer: 'Darlene Robertson', avatar: 'DR', status: 'Pending', quantity: 100, date: '10/12/2025 10:12pm' },
    { id: 3, customer: 'Jacob Jones', avatar: 'JJ', status: 'Pending', quantity: 200, date: '10/12/2025 10:12pm' },
    { id: 4, customer: 'Kathryn Murphy', avatar: 'KM', status: 'Approved', quantity: 300, date: '10/12/2025 10:12pm' },
    { id: 5, customer: 'Leslie Alexander', avatar: 'LA', status: 'Approved', quantity: 400, date: '10/12/2025 10:12pm' },
    { id: 6, customer: 'Ronald Richards', avatar: 'RR', status: 'Approved', quantity: 500, date: '10/12/2025 10:12pm' },
    { id: 7, customer: 'Jenny Wilson', avatar: 'JW', status: 'Approved', quantity: 600, date: '10/12/2025 10:12pm' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800'
      case 'Approved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello Robert</h1>
          <p className="text-sm text-gray-500">Good Morning</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">RA</span>
            </div>
            <span className="text-sm font-medium text-gray-900">Robert Allen</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Content - Stats and Chart */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.updateTime}</p>
              </div>
            ))}
          </div>

          {/* My Sales This Week Chart */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Sales This Week</h3>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                <path
                  d="M 50 150 Q 100 120 150 130 T 250 80 T 350 60 T 450 90 T 550 70"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 50 150 Q 100 120 150 130 T 250 80 T 350 60 T 450 90 T 550 70 L 550 180 L 50 180 Z"
                  fill="url(#gradient)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#E0E7FF" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Chart Labels */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-between px-12 text-xs text-gray-600">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-4 text-xs text-gray-600">
                <span>100%</span>
                <span>80%</span>
                <span>60%</span>
                <span>40%</span>
                <span>20%</span>
                <span>0</span>
              </div>
              
              {/* Peak indicator */}
              <div className="absolute top-12 right-20 bg-white rounded-lg px-3 py-2 shadow-lg border">
                <div className="text-xs text-gray-600">Sales</div>
                <div className="text-sm font-semibold text-gray-900">300,000 rwf</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">Days of the Week</span>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{order.avatar}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Showing</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    &lt;
                  </button>
                  <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    2
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    3
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    4
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Quick Links */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Place New Order</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="font-medium">View My Stock</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">Pay Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
