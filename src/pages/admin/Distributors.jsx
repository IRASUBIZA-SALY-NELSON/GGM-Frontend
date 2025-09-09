import React, { useState } from 'react'
import { Search, Filter, Plus, Eye, Trash2, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'
import FilterModal from '../../components/modals/FilterModal'
import AddDistributorModal from '../../components/modals/AddDistributorModal'
import DeleteDistributorModal from '../../components/modals/DeleteDistributorModal'

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDistributor, setSelectedDistributor] = useState(null)

  const statsCards = [
    {
      title: 'Total Distributors',
      value: '470',
      change: '+8%',
      changeType: 'increase',
      updateTime: 'Update: July 14, 2023',
      icon: '📦',
      color: 'purple'
    },
    {
      title: 'Total Distributor Contribution',
      value: '5,000,000rwf',
      change: '+12%',
      changeType: 'increase',
      updateTime: 'Update: July 16, 2023',
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Average Revenue Per Account',
      value: '560,000rwf',
      change: '+12%',
      changeType: 'increase',
      updateTime: 'Update: July 16, 2023',
      icon: '📊',
      color: 'purple'
    }
  ]

  const distributors = [
    { id: 1, companyName: 'AMACO CLOTHES LTD', manager: 'Leasie Watson', managerAvatar: 'LW', lastOrder: '10/12/2025', revenue: '100,000rwf' },
    { id: 2, companyName: 'FASHION WORLD LTD', manager: 'John Smith', managerAvatar: 'JS', lastOrder: '08/11/2025', revenue: '85,000rwf' },
    { id: 3, companyName: 'STYLE BOUTIQUE', manager: 'Sarah Johnson', managerAvatar: 'SJ', lastOrder: '15/12/2025', revenue: '120,000rwf' },
    { id: 4, companyName: 'TRENDY WEAR LTD', manager: 'Mike Wilson', managerAvatar: 'MW', lastOrder: '05/12/2025', revenue: '95,000rwf' },
    { id: 5, companyName: 'ELITE FASHION', manager: 'Emily Davis', managerAvatar: 'ED', lastOrder: '12/12/2025', revenue: '110,000rwf' },
    { id: 6, companyName: 'MODERN STYLES', manager: 'David Brown', managerAvatar: 'DB', lastOrder: '18/11/2025', revenue: '75,000rwf' },
    { id: 7, companyName: 'LUXURY BRANDS', manager: 'Lisa Anderson', managerAvatar: 'LA', lastOrder: '20/12/2025', revenue: '150,000rwf' },
  ]

  const handleFilter = () => {
    setShowFilterModal(true)
  }

  const applyFilter = (filterData) => {
    console.log('Applying filter:', filterData)
    setShowFilterModal(false)
  }

  const handleAddDistributor = () => {
    setShowAddModal(true)
  }

  const handleDeleteDistributor = (distributor) => {
    setSelectedDistributor(distributor)
    setShowDeleteModal(true)
  }

  const confirmDeleteDistributor = () => {
    console.log('Deleting distributor:', selectedDistributor)
    setShowDeleteModal(false)
    setSelectedDistributor(null)
  }

  const handleViewDashboard = (distributor) => {
    console.log('Viewing dashboard for:', distributor)
    // Navigate to distributor dashboard
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Distributor Management</h1>
            <p className="text-sm text-gray-500">Keep Track of All Distributors</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.updateTime}</p>
            </div>
          ))}
        </div>

        {/* Search and Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={handleAddDistributor}
            >
              <Plus className="h-4 w-4" />
              <span>Add New Distributor</span>
            </button>
            
            <button 
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={handleFilter}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Distributors Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total YTD Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {distributors.map((distributor) => (
                <tr key={distributor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {distributor.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{distributor.managerAvatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{distributor.manager}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {distributor.lastOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {distributor.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                        onClick={() => handleViewDashboard(distributor)}
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Dashboard</span>
                      </button>
                      <button 
                        className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        onClick={() => handleDeleteDistributor(distributor)}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Showing</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                &lt;
              </button>
              <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                2
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                3
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                4
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={applyFilter}
      />

      {/* Add Distributor Modal */}
      <AddDistributorModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />

      {/* Delete Distributor Modal */}
      <DeleteDistributorModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        distributor={selectedDistributor}
      />
    </div>
  )
}

export default Distributors
