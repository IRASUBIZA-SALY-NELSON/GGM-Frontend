import React from 'react'
import { 
  Users, 
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Search,
  Bell,
  Plus,
  Settings,
  MoreHorizontal
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '560',
      change: '+2%',
      changeType: 'increase',
      period: 'Today, July 12, 2023',
      icon: Users,
    },
    {
      title: 'Total Revenue',
      value: '1,050,000 rwf',
      change: '+8%',
      changeType: 'increase',
      period: 'Today, July 12, 2023',
    },
    {
      title: 'Today Distributors',
      value: '470',
      change: '-5%',
      changeType: 'decrease',
      period: 'Today, July 12, 2023',
    },
    {
      title: 'Total Orders',
      value: '250',
      change: '+3%',
      changeType: 'increase',
      period: 'Today, July 12, 2023',
    },
  ]

  const userRoles = [
    { name: 'Administrators', percentage: 30, count: '70 people', color: 'bg-purple-600' },
    { name: 'Warehouse Managers', percentage: 25, count: '21 people', color: 'bg-purple-500' },
    { name: 'Sales Managers', percentage: 20, count: '50 people', color: 'bg-purple-400' },
    { name: 'Sales Assistants', percentage: 15, count: '20 people', color: 'bg-purple-300' },
    { name: 'Accountant', percentage: 5, count: '15 people', color: 'bg-purple-200' },
    { name: 'Store Manager', percentage: 5, count: '10 people', color: 'bg-purple-100' },
  ]

  const recentUsers = [
    { name: 'Leslie Monson', action: 'Delete User', role: 'Administrator', time: '09:21 AM', avatar: 'LM' },
    { name: 'Darlene Robertson', action: 'Approve Order', role: 'Store Manager', time: '10:15 AM', avatar: 'DR' },
    { name: 'Jacob Jones', action: 'Approve Order', role: 'Accountant', time: '10:24 AM', avatar: 'JJ' },
    { name: 'Kathryn Murphy', action: 'Place Order', role: 'Accountant', time: '09:10 AM', avatar: 'KM' },
    { name: 'Leslie Alexander', action: 'Delete Order', role: 'Store Manager', time: '09:15 AM', avatar: 'LA' },
    { name: 'Ronald Richards', action: 'Update Profile', role: 'Administrator', time: '09:49 AM', avatar: 'RR' },
    { name: 'Jenny Wilson', action: 'Update Report', role: 'Accountant', time: '11:50 AM', avatar: 'JW' },
  ]

  return (
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {stat.icon && <stat.icon className="h-5 w-5 text-purple-600" />}
                        <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Today</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      <div className={`flex items-center text-xs ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'increase' ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
                  </div>
                ))}
              </div>

              {/* User Roles Analytics */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Users Roles Analytics Overview</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">April</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  {/* Donut Chart */}
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                      />
                      {/* Purple segments representing different user roles */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="8"
                        strokeDasharray="75 25"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="8"
                        strokeDasharray="62 38"
                        strokeDashoffset="-75"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="8"
                        strokeDasharray="50 50"
                        strokeDashoffset="-137"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">560</div>
                        <div className="text-sm text-gray-500">Total</div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3 flex-1">
                    {userRoles.map((role, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                          <span className="text-sm text-gray-700">{role.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-900">{role.percentage}%</span>
                          <span className="text-sm text-gray-500">{role.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recently Created Users */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recently Created User</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 pb-2 border-b border-gray-100">
                    <span>User Name</span>
                    <span>Last Action</span>
                    <span>User Role</span>
                    <span>Created At</span>
                  </div>
                  
                  {recentUsers.map((user, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center py-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{user.avatar}</span>
                        </div>
                        <span className="text-sm text-gray-900 truncate">{user.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 truncate">{user.action}</span>
                      <span className="text-sm text-gray-600 truncate">{user.role}</span>
                      <span className="text-sm text-gray-500">{user.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Links Only */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add New User</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Dashboard