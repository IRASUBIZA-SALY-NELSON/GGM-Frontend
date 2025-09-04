import React from 'react';
import SalesManagerSidebar from './SalesManagerSidebar';

const SalesManagerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <SalesManagerSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default SalesManagerLayout;
