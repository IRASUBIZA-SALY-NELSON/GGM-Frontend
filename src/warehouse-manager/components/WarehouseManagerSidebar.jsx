import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, BarChart3 } from 'lucide-react';

const WarehouseManagerSidebar = () => {
  const location = useLocation();

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

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FMS</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
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
    </div>
  );
};

export default WarehouseManagerSidebar;
