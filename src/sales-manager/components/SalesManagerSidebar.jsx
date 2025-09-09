import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Truck, 
  Tag, 
  BarChart3,
  LogOut 
} from 'lucide-react';

const SalesManagerSidebar = () => {
  const navigate = useNavigate()
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/sales-manager/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'My Team',
      href: '/sales-manager/my-team',
      icon: Users,
    },
    {
      name: 'Orders',
      href: '/sales-manager/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Distributors',
      href: '/sales-manager/distributors',
      icon: Truck,
    },
    {
      name: 'Pricing & Catalog',
      href: '/sales-manager/pricing-catalog',
      icon: Tag,
    },
    {
      name: 'Price Management',
      href: '/sales-manager/price-management',
      icon: Tag,
    },
    {
      name: 'Sales Analytics',
      href: '/sales-manager/sales-analytics',
      icon: BarChart3,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth/login')
  }

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">GGM</h1>
        <p className="text-sm text-gray-600">Sales Manager</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SalesManagerSidebar;
