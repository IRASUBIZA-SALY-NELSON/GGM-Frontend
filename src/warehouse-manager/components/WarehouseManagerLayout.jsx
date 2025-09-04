import React from 'react';
import WarehouseManagerSidebar from './WarehouseManagerSidebar';

const WarehouseManagerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <WarehouseManagerSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default WarehouseManagerLayout;
