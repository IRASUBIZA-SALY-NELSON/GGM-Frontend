import React from 'react';
import WarehouseManagerSidebar from './WarehouseManagerSidebar';
import RoleHeader from '../../components/RoleHeader';

const WarehouseManagerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <WarehouseManagerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleHeader title="Warehouse Manager Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WarehouseManagerLayout;
