import React, { useState } from 'react'
import { Search, Filter, ChevronDown, MoreHorizontal, Plus } from 'lucide-react'
import AddUserModal from '../../components/modals/AddUserModal'
import UserSuccessModal from '../../components/modals/UserSuccessModal'
import DeleteUserModal from '../../components/modals/DeleteUserModal'
import ViewUserModal from '../../components/modals/ViewUserModal'
import EditUserModal from '../../components/modals/EditUserModal'
import FilterModal from '../../components/modals/FilterModal'

const UserManagement = () => {
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

  const users = [
    { id: 1, name: 'Darlene Robertson', phone: '345321251', role: 'Accountant', email: 'user@gmail.com', avatar: 'DR' },
    { id: 2, name: 'Floyd Miles', phone: '987654345', role: 'Accountant', email: 'user@gmail.com', avatar: 'FM' },
    { id: 3, name: 'Cody Fisher', phone: '435567122', role: 'Store Manager', email: 'user@gmail.com', avatar: 'CF' },
    { id: 4, name: 'Darlene Robertson', phone: '345321251', role: 'Accountant', email: 'user@gmail.com', avatar: 'DR' },
    { id: 5, name: 'Floyd Miles', phone: '987654345', role: 'Accountant', email: 'user@gmail.com', avatar: 'FM' },
    { id: 6, name: 'Cody Fisher', phone: '435567122', role: 'Store Manager', email: 'user@gmail.com', avatar: 'CF' },
    { id: 7, name: 'Dianne Russell', phone: '345321251', role: 'Store Manager', email: 'user@gmail.com', avatar: 'DR' },
    { id: 8, name: 'Darlene Robertson', phone: '345321251', role: 'Accountant', email: 'user@gmail.com', avatar: 'DR' },
    { id: 9, name: 'Floyd Miles', phone: '987654345', role: 'Accountant', email: 'user@gmail.com', avatar: 'FM' },
    { id: 10, name: 'Cody Fisher', phone: '435567122', role: 'Store Manager', email: 'user@gmail.com', avatar: 'CF' },
    { id: 11, name: 'Dianne Russell', phone: '345321251', role: 'Store Manager', email: 'user@gmail.com', avatar: 'DR' },
    { id: 12, name: 'Dianne Russell', phone: '345321251', role: 'Store Manager', email: 'user@gmail.com', avatar: 'DR' },
  ]

  const handleActionsClick = (userId) => {
    setShowActionsDropdown(showActionsDropdown === userId ? null : userId)
  }

  const handleAddUser = () => {
    setShowAddModal(true)
  }

  const handleUserSuccess = () => {
    setShowAddModal(false)
    setShowSuccessModal(true)
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{user.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="relative">
                      <button 
                        className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full hover:bg-purple-700 transition-colors"
                        onClick={() => handleActionsClick(user.id)}
                      >
                        Active
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 10 of 100 results
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
