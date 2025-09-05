import React from 'react'
import StoreManagerSidebar from './StoreManagerSidebar'
import RoleHeader from '../../components/RoleHeader'

const StoreManagerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <StoreManagerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleHeader title="Store Manager Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default StoreManagerLayout
