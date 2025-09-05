import React from 'react';
import SalesManagerSidebar from './SalesManagerSidebar';
import RoleHeader from '../../components/RoleHeader';

const SalesManagerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SalesManagerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleHeader title="Sales Manager Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SalesManagerLayout;
