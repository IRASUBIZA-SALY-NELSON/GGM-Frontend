import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Package, 
  ShoppingCart, 
  FileText
} from 'lucide-react'

const StoreManagerSidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/store-manager/dashboard', icon: Home },
    { name: 'My Stock', href: '/store-manager/my-stock', icon: Package },
    { name: 'Place Order', href: '/store-manager/place-order', icon: ShoppingCart },
    { name: 'Billing', href: '/store-manager/billing', icon: FileText },
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

export default StoreManagerSidebar
