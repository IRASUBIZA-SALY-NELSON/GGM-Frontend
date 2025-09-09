import React, { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react'
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api'
import FilterModal from '../../components/modals/FilterModal'

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [users, setUsers] = useState([])
  const [distributors, setDistributors] = useState([])
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReportsData()
  }, [])

  const fetchReportsData = async () => {
    try {
      setLoading(true)
      
      // Fetch users and audit logs in parallel
      const [usersData, auditData] = await Promise.allSettled([
        apiCall(API_ENDPOINTS.USERS, { method: HTTP_METHODS.GET }),
        apiCall(API_ENDPOINTS.AUDIT_LOGS, { method: HTTP_METHODS.GET }).catch(() => [])
      ])
      
      const users = usersData.status === 'fulfilled' ? usersData.value : []
      setUsers(users)
      
      // Filter users with DISTRIBUTOR role
      const distributorUsers = users.filter(user => user.role === 'DISTRIBUTOR')
      setDistributors(distributorUsers)
      
      setAuditLogs(auditData.status === 'fulfilled' ? auditData.value : [])
      
    } catch (error) {
      console.error('Error fetching reports data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const distributorCount = distributors.length
  const totalUsers = users.length
  const totalDistributors = distributorCount

  const statsCards = [
    {
      title: 'Total Distributors',
      value: distributorCount.toString(),
      change: '+0%',
      changeType: 'increase',
      updateTime: `Update: ${new Date().toLocaleDateString()}`,
      icon: '📦',
      color: 'purple'
    },
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      change: '+0%',
      changeType: 'increase',
      updateTime: `Update: ${new Date().toLocaleDateString()}`,
      icon: '👤',
      color: 'purple'
    },
    {
      title: 'Total Distributors',
      value: totalDistributors.toString(),
      change: '+0%',
      changeType: 'increase',
      updateTime: `Update: ${new Date().toLocaleDateString()}`,
      icon: '👥',
      color: 'purple'
    }
  ]

  // Helper functions
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const getUserInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
    return 'U'
  }

  const getUserDisplayName = (actor) => {
    if (actor?.firstName && actor?.lastName) {
      return `${actor.firstName} ${actor.lastName}`
    }
    if (actor?.email) {
      return actor.email.split('@')[0]
    }
    return 'Unknown User'
  }

  const getRoleDisplayName = (role) => {
    if (!role) return 'Unknown'
    return role.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  const getActivityDescription = (log) => {
    if (log.description) return log.description
    
    const action = log.action?.toLowerCase() || 'performed'
    const entity = log.entity?.toLowerCase() || 'action'
    
    switch (log.action?.toUpperCase()) {
      case 'LOGIN':
        return 'User logged into the system'
      case 'LOGOUT':
        return 'User logged out of the system'
      case 'CREATE':
        return `Created new ${entity}${log.entityId ? ` (ID: ${log.entityId})` : ''}`
      case 'UPDATE':
        return `Updated ${entity}${log.entityId ? ` (ID: ${log.entityId})` : ''}`
      case 'DELETE':
        return `Deleted ${entity}${log.entityId ? ` (ID: ${log.entityId})` : ''}`
      case 'APPROVE':
        return `Approved ${entity}${log.entityId ? ` (ID: ${log.entityId})` : ''}`
      default:
        return `${action.charAt(0).toUpperCase() + action.slice(1)} ${entity}${log.entityId ? ` (ID: ${log.entityId})` : ''}`
    }
  }

  // Filter logs based on search term
  const filteredLogs = auditLogs.filter(log => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    const userName = getUserDisplayName(log.actor).toLowerCase()
    const role = getRoleDisplayName(log.actor?.role).toLowerCase()
    const activity = getActivityDescription(log).toLowerCase()
    
    return userName.includes(searchLower) || 
           role.includes(searchLower) || 
           activity.includes(searchLower)
  })

  const handleFilter = () => {
    setShowFilterModal(true)
  }

  const applyFilter = (filterData) => {
    console.log('Applying filter:', filterData)
    setShowFilterModal(false)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500">Track Reports for the overall system</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <button 
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
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
              <p className="text-xs text-gray-500">{stat.updateTime}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <span className="ml-2 text-gray-500">Loading reports...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <p className="text-red-600">Error loading reports: {error}</p>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <p className="text-gray-500">No reports found</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <tr key={`${log.timestamp}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {getUserInitials(log.actor?.firstName, log.actor?.lastName)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {getUserDisplayName(log.actor)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getRoleDisplayName(log.actor?.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getActivityDescription(log)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Showing</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-500">Showing 1 to 10 out of {auditLogs.length} records</span>
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

      {/* Filter Modal */}
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={applyFilter}
      />
    </div>
  )
}

export default Reports
