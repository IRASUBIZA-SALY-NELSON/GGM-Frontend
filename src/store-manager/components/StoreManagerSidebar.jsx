import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Package, 
  ShoppingCart, 
  FileText,
  Settings,
  LogOut
} from 'lucide-react'

const StoreManagerSidebar = () => {
  const navigate = useNavigate()
  
  const navigation = [
    { name: 'Dashboard', href: '/store-manager/dashboard', icon: Home },
    { name: 'My Stock', href: '/store-manager/my-stock', icon: Package },
    { name: 'Place Order', href: '/store-manager/place-order', icon: ShoppingCart },
    { name: 'Billing', href: '/store-manager/billing', icon: FileText },
    { name: 'Settings', href: '/store-manager/settings', icon: Settings },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth/login')
  }

  return (
    <div className="bg-white w-64 shadow-lg border-r border-gray-200 relative h-full">
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

      {/* Logout Button */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default StoreManagerSidebar
