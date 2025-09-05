import React from 'react';
import SalesAssistantSidebar from './SalesAssistantSidebar';
import RoleHeader from '../../components/RoleHeader';

const SalesAssistantLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SalesAssistantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleHeader title="Sales Assistant Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SalesAssistantLayout;
