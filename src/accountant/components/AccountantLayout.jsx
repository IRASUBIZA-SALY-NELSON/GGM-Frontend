import React from 'react';
import AccountantSidebar from './AccountantSidebar';
import RoleHeader from '../../components/RoleHeader';

const AccountantLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AccountantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleHeader title="Accountant Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AccountantLayout;
