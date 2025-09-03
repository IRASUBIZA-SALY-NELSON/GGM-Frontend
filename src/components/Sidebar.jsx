import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Users, 
  Database, 
  BarChart3, 
  Settings, 
  FileText,
  Package,
  Activity
} from 'lucide-react'

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'User Management', href: '/user-management', icon: Users },
    { name: 'Activity Logs', href: '/activity-logs', icon: Activity },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Distributors', href: '/distributors', icon: Package },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="bg-white w-64 shadow-lg border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FMS</span>
          </div>
          <span className="font-semibold text-gray-900">FMS</span>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
