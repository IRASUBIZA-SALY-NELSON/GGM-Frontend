import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, BarChart3, LogOut } from 'lucide-react';

const WarehouseManagerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/warehouse-manager/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Process Orders',
      href: '/warehouse-manager/process-orders',
      icon: Package,
    },
    {
      name: 'Stock Management',
      href: '/warehouse-manager/stock-management',
      icon: BarChart3,
    },
    {
      name: 'Stock Transfers',
      href: '/warehouse-manager/stock-transfers',
      icon: Truck,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/auth/login')
  }

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FMS</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1">
        <div className="px-3">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default WarehouseManagerSidebar;
