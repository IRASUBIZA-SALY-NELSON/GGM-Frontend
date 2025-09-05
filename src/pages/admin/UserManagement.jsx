import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Filter, ChevronDown, MoreHorizontal, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import AddUserModal from '../../components/modals/AddUserModal'
import UserSuccessModal from '../../components/modals/UserSuccessModal'
import DeleteUserModal from '../../components/modals/DeleteUserModal'
import ViewUserModal from '../../components/modals/ViewUserModal'
import EditUserModal from '../../components/modals/EditUserModal'
import FilterModal from '../../components/modals/FilterModal'

const UserManagement = () => {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [showActionsDropdown, setShowActionsDropdown] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
    
    // Check if we should open Add User modal from navigation state
    if (location.state?.openAddModal) {
      setShowAddModal(true)
    }
  }, [location.state])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        throw new Error('No authentication token found')
      }
      
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
        console.log('📊 Users fetched for User Management:', userData)
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

  const getUserDisplayName = (user) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user.email || 'Unknown User'
  }

  const filteredUsers = users.filter(user => {
    const displayName = getUserDisplayName(user).toLowerCase()
    const email = (user.email || '').toLowerCase()
    const role = getRoleDisplayName(user.role).toLowerCase()
    const searchLower = searchTerm.toLowerCase()
    
    return displayName.includes(searchLower) || 
           email.includes(searchLower) || 
           role.includes(searchLower)
  })

  const handleActionsClick = (userId) => {
    setShowActionsDropdown(showActionsDropdown === userId ? null : userId)
  }

  const handleAddUser = () => {
    setShowAddModal(true)
  }

  const handleUserSuccess = () => {
    setShowAddModal(false)
    setShowSuccessModal(true)
    // Refresh users list after successful addition
    fetchUsers()
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowViewModal(true)
    setShowActionsDropdown(null)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
    setShowActionsDropdown(null)
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
    setShowActionsDropdown(null)
  }

  const confirmDeleteUser = () => {
    // Here you would typically call API to delete user
    console.log('Deleting user:', userToDelete)
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const handleSaveUser = (userData) => {
    // Here you would typically call API to save user
    console.log('Saving user:', userData)
    setShowEditModal(false)
    setSelectedUser(null)
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
            <p className="text-sm text-gray-500">Manage all system users</p>
          </div>
          
          {/* Actions Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowActionsDropdown(showActionsDropdown === 'header' ? null : 'header')}
            >
              <span className="text-sm">Actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {showActionsDropdown === 'header' && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button 
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => handleViewUser(users[0])}
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => handleEditUser(users[0])}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Details</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    onClick={() => handleDeleteUser(users[0])}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={handleAddUser}
            >
              <Plus className="h-4 w-4" />
              <span>Add New User</span>
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

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <span className="ml-2 text-gray-500">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <p className="text-red-600">Error loading users: {error}</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <p className="text-gray-500">No users found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {getUserInitials(user.firstName, user.lastName)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {getUserDisplayName(user)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getRoleDisplayName(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="relative">
                        <button 
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            user.userStatus === 'ACTIVE' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          onClick={() => handleActionsClick(user.id)}
                        >
                          {user.userStatus || 'Unknown'}
                        </button>
                        
                        {showActionsDropdown === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button 
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => handleViewUser(user)}
                              >
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                              </button>
                              <button 
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit Details</span>
                              </button>
                              <button 
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
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
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                Previous
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
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSuccess={handleUserSuccess}
      />
      
      <UserSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
      />
      
      <DeleteUserModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onConfirm={confirmDeleteUser}
        userName={userToDelete?.name}
      />
      
      <ViewUserModal 
        isOpen={showViewModal} 
        onClose={() => setShowViewModal(false)} 
        user={selectedUser}
        onEdit={() => {
          setShowViewModal(false)
          setShowEditModal(true)
        }}
      />
      
      <EditUserModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        user={selectedUser}
        onSave={handleSaveUser}
      />
      
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={applyFilter}
      />
    </div>
  )
}

export default UserManagement
