import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Copy, Building2, Users, Key } from 'lucide-react'
import toast from 'react-hot-toast'

const TenantSuccess = () => {
  const location = useLocation()
  const { tenantId, companyName } = location.state || {}

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Tenant ID copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">GGM</span>
            </div>
            <h2 className="ml-3 text-3xl font-bold text-gray-900">GGM</h2>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Registration Successful!</h2>
          <p className="mt-2 text-gray-600">
            Welcome to GGM, {companyName}! Your tenant account has been created successfully.
          </p>
        </div>

        {/* Tenant ID Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Your Tenant ID</h3>
            <Building2 className="h-5 w-5 text-purple-600" />
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono text-purple-800">{tenantId}</code>
              <button
                onClick={() => copyToClipboard(tenantId)}
                className="ml-2 p-1 text-purple-600 hover:text-purple-700"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <p className="mt-2 text-sm text-gray-600">
            <strong>Important:</strong> Save this Tenant ID securely. You'll need it to create user accounts for your organization.
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Next Steps</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-600">1</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Login as Admin</p>
                <p className="text-sm text-gray-600">Use your admin credentials to access the system</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-600">2</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Create User Accounts</p>
                <p className="text-sm text-gray-600">Add users with different roles for your organization</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-600">3</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Configure Settings</p>
                <p className="text-sm text-gray-600">Customize your organization's preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Roles */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Available User Roles</h3>
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>System Admin</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Store Manager</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Sales Manager</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span>Sales Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Accountant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <span>Warehouse Manager</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/auth/register"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Key className="h-4 w-4 mr-2" />
            Login to Admin Dashboard
          </Link>
          
          <Link
            to="/auth/system-user-register"
            className="w-full flex justify-center items-center py-3 px-4 border border-purple-300 text-sm font-medium rounded-lg text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Users className="h-4 w-4 mr-2" />
            Create User Account
          </Link>
        </div>

        {/* Support */}
        <div className="text-center text-sm text-gray-600">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@ggm.com" className="text-purple-600 hover:text-purple-500">
            support@ggm.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default TenantSuccess
