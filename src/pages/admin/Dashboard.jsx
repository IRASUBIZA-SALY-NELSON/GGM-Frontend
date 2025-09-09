import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('http://localhost:8081/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUsers(userData)
        console.log('📊 Users fetched:', userData)
      } else {
        throw new Error('Failed to fetch users')
      }
    } catch (error) {
      console.error('❌ Error fetching users:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'ADMIN': 'Administrator',
      'MANAGER': 'Manager',
      'SALES_MANAGER': 'Sales Manager',
      'STORE_MANAGER': 'Store Manager',
      'WAREHOUSE_MANAGER': 'Warehouse Manager',
      'ACCOUNTANT': 'Accountant',
      'USER': 'User'
    }
    return roleMap[role] || role
  }

  const getUserInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
    if (firstName) {
      return firstName.charAt(0).toUpperCase()
    }
    return 'U'
  }

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A'
    const date = new Date(dateTime)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getLastActivity = (activities) => {
    if (!activities || activities.length === 0) return 'No activity'
    const lastActivity = activities[activities.length - 1]
    return lastActivity.activityName || 'Recent activity'
  }

  // Calculate user role statistics
  const calculateRoleStats = () => {
    const roleCount = {}
    const totalUsers = users.length

    users.forEach(user => {
      const role = getRoleDisplayName(user.role)
      roleCount[role] = (roleCount[role] || 0) + 1
    })

    return Object.entries(roleCount).map(([role, count], index) => ({
      name: role,
      count: `${count} people`,
      percentage: totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0,
      color: [
        'bg-purple-600',
        'bg-purple-500', 
        'bg-purple-400',
        'bg-purple-300',
        'bg-purple-200',
        'bg-purple-100'
      ][index % 6]
    }))
  }
  const distributorCountToday = users.filter(u => (u.role === 'DISTRIBUTOR')).length

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toString(),
      change: '+2%',
      changeType: 'increase',
      period: 'Today, July 12, 2023',
      icon: Users,
    },
    {
      title: 'Total Revenue',
      value: '000 rwf',
      change: '+8%',
      changeType: 'increase',
      period: 'Today, July 12, 2023',
    },
    {
      title: 'Total Distributors',
      value: distributorCountToday.toString(),
      change: '+0%',
      changeType: 'increase',
      period: new Date().toDateString(),
    },
    {
      title: 'Total Orders',
      value: '0',
      change: '+3%',
      changeType: 'increase',
      period: 'Today, July 12, 2023',
    },
  ]

  const userRoles = calculateRoleStats()

  // Navigation handlers for Quick Links
  const handleUserManagement = () => {
    navigate('/admin/user-management')
  }

  const handleAddNewUser = () => {
    navigate('/admin/user-management', { state: { openAddModal: true } })
  }

  const handleSettings = () => {
    navigate('/admin/settings')
  }

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
                        <div className="text-2xl font-bold text-gray-900">{users.length}</div>
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
                  <h3 className="text-lg font-semibold text-gray-900">Recently Created Users</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading users: {error}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 pb-2 border-b border-gray-100">
                      <span>User Name</span>
                      <span>Last Activity</span>
                      <span>User Role</span>
                      <span>Status</span>
                    </div>
                    
                    {users.slice(0, 7).map((user, index) => (
                      <div key={user.id || index} className="grid grid-cols-4 gap-4 items-center py-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {getUserInitials(user.firstName, user.lastName)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-900 truncate">
                            {user.firstName && user.lastName 
                              ? `${user.firstName} ${user.lastName}` 
                              : user.email || 'Unknown User'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 truncate">
                          {getLastActivity(user.activities)}
                        </span>
                        <span className="text-sm text-gray-600 truncate">
                          {getRoleDisplayName(user.role)}
                        </span>
                        <span className={`text-sm px-2 py-1 rounded-full text-xs ${
                          user.userStatus === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.userStatus || 'Unknown'}
                        </span>
                      </div>
                    ))}
                    
                    {users.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No users found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Quick Links Only */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleUserManagement}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </button>
                  <button 
                    onClick={handleAddNewUser}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New User</span>
                  </button>
                  <button 
                    onClick={handleSettings}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
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