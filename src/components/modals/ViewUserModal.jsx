import React, { useState } from 'react'
import { X, Edit } from 'lucide-react'

const ViewUserModal = ({ isOpen, onClose, user, onEdit }) => {
  const [activeTab, setActiveTab] = useState('personal')

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">All Users &gt; {user.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* User Profile Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('personal')}
                className={`py-3 px-1 border-b-2 font-medium text-sm mr-8 ${
                  activeTab === 'personal'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👤 Personal Information
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'professional'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                💼 Professional Information
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  First Name
                </label>
                <p className="text-gray-900 font-medium">
                  {user.name.split(' ')[0] || 'Brooklyn'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Last Name
                </label>
                <p className="text-gray-900 font-medium">
                  {user.name.split(' ').slice(1).join(' ') || 'Simmons'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Mobile Number
                </label>
                <p className="text-gray-900 font-medium">
                  {user.phone || '(702) 555-0122'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900 font-medium">
                  {user.email || 'brooklyn.s@example.com'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Gender
                </label>
                <p className="text-gray-900 font-medium">Female</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nationality
                </label>
                <p className="text-gray-900 font-medium">America</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Date of Birth
                </label>
                <p className="text-gray-900 font-medium">July 14, 1995</p>
              </div>
            </div>
          )}

          {activeTab === 'professional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Role
                </label>
                <p className="text-gray-900 font-medium">{user.role || 'Administrator'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Department
                </label>
                <p className="text-gray-900 font-medium">Administration</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Employee ID
                </label>
                <p className="text-gray-900 font-medium">EMP001</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Date Joined
                </label>
                <p className="text-gray-900 font-medium">January 15, 2023</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Status
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Access Level
                </label>
                <p className="text-gray-900 font-medium">Full Access</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewUserModal
