import React from 'react';
import SalesAssistantSidebar from './SalesAssistantSidebar';

const SalesAssistantLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <SalesAssistantSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default SalesAssistantLayout;
