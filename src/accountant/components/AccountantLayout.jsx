import React from 'react';
import AccountantSidebar from './AccountantSidebar';

const AccountantLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <AccountantSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AccountantLayout;
