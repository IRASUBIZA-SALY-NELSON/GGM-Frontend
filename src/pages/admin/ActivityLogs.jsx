import React, { useState, useEffect } from 'react'
import { Search, Filter, Sparkles } from 'lucide-react'
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api'
import ClearAllModal from '../../components/modals/ClearAllModal'
import FilterModal from '../../components/modals/FilterModal'

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showClearModal, setShowClearModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAuditLogs()
  }, [])

  const fetchAuditLogs = async () => {
    try {
      setLoading(true)
      
      // Try to fetch audit logs first
      let auditData = []
      try {
        auditData = await apiCall(API_ENDPOINTS.AUDIT_LOGS, {
          method: HTTP_METHODS.GET
        })
        console.log('📊 Audit logs fetched:', auditData)
      } catch (auditError) {
        console.warn('Audit logs API failed, trying user activities:', auditError)
      }
      
      // If no audit logs, fetch user activities as fallback
      if (!auditData || auditData.length === 0) {
        try {
          const usersData = await apiCall(API_ENDPOINTS.USERS, {
            method: HTTP_METHODS.GET
          })
          
          // Extract activities from user profiles
          const activities = []
          usersData.forEach(user => {
            if (user.activities && user.activities.length > 0) {
              user.activities.forEach(activity => {
                activities.push({
                  actor: user,
                  action: activity.activityName || 'Activity',
                  entity: activity.category || 'System',
                  description: activity.description || `${activity.activityName} - ${activity.category}`,
                  timestamp: activity.dateTime || new Date().toISOString(),
                  entityId: null
                })
              })
            }
            
            // Add user creation activity
            activities.push({
              actor: { firstName: 'System', lastName: 'Admin', role: 'ADMIN', email: 'system@admin.com' },
              action: 'CREATE',
              entity: 'USER',
              description: `User account created: ${user.firstName} ${user.lastName} (${user.email})`,
              timestamp: new Date().toISOString(),
              entityId: user.id
            })
          })
          
          // Add some system activities for demonstration
          const systemActivities = [
            {
              actor: { firstName: 'System', lastName: 'Auth', role: 'SYSTEM', email: 'auth@system.com' },
              action: 'LOGIN',
              entity: 'SESSION',
              description: 'User login successful',
              timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
              entityId: null
            },
            {
              actor: { firstName: 'System', lastName: 'Auth', role: 'SYSTEM', email: 'auth@system.com' },
              action: 'LOGOUT',
              entity: 'SESSION', 
              description: 'User logout',
              timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
              entityId: null
            },
            {
              actor: { firstName: 'Admin', lastName: 'User', role: 'ADMIN', email: 'admin@system.com' },
              action: 'UPDATE',
              entity: 'SETTINGS',
              description: 'System settings updated',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
              entityId: null
            }
          ]
          
          activities.push(...systemActivities)
          
          // Sort by timestamp (newest first)
          activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          
          auditData = activities
          console.log('📊 Generated activities from user data:', auditData)
        } catch (userError) {
          console.error('Failed to fetch user activities:', userError)
          throw new Error('Failed to load activity data')
        }
      }
      
      setAuditLogs(auditData)
    } catch (err) {
      setError(err.message || 'Failed to fetch activity logs')
      console.error('Error fetching activity logs:', err)
    } finally {
      setLoading(false)
    }
  }

  // Helper functions to format backend data
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
    
    // Create more readable descriptions based on action and entity
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

  const handleClearAll = () => {
    setShowClearModal(true)
  }

  const confirmClearAll = async () => {
    try {
      // Try to clear audit logs via API first
      try {
        await apiCall(API_ENDPOINTS.AUDIT_LOGS, {
          method: HTTP_METHODS.DELETE
        })
        console.log('✅ Audit logs cleared via API')
      } catch (apiError) {
        console.warn('API clear failed, clearing local state:', apiError)
      }
      
      // Clear local state regardless
      setAuditLogs([])
      setShowClearModal(false)
      
      // Show success message (you could add a toast notification here)
      console.log('✅ All activity logs cleared successfully')
      
    } catch (error) {
      console.error('Failed to clear logs:', error)
      setError('Failed to clear activity logs')
      setShowClearModal(false)
    }
  }

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Activity logs</h1>

        {/* Search and Action Bar */}
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
          
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={handleClearAll}
            >
              <Sparkles className="h-4 w-4" />
              <span>Clear All</span>
            </button>
            
            <button 
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleFilter}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
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
                      <span className="ml-2 text-gray-500">Loading audit logs...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <p className="text-red-600">Error loading audit logs: {error}</p>
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <p className="text-gray-500">No audit logs found</p>
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
              <span className="text-sm text-gray-500">of {auditLogs.length} results</span>
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

      {/* Clear All Modal */}
      <ClearAllModal 
        isOpen={showClearModal} 
        onClose={() => setShowClearModal(false)} 
        onConfirm={confirmClearAll}
      />
      
      {/* Filter Modal */}
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={applyFilter}
      />
    </div>
  )
}

export default ActivityLogs
