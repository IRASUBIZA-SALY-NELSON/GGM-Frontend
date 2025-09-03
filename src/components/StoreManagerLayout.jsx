import React from 'react'
import StoreManagerSidebar from './StoreManagerSidebar'

const StoreManagerLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <StoreManagerSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default StoreManagerLayout
