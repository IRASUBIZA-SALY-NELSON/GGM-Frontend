import React, { useState } from 'react'
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react'
import FilterModal from '../../components/modals/FilterModal'

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)

  const statsCards = [
    {
      title: 'Today Distributors',
      value: '470',
      change: '+8%',
      changeType: 'increase',
      updateTime: 'Update: July 14, 2023',
      icon: '📦',
      color: 'purple'
    },
    {
      title: 'Total Users',
      value: '560',
      change: '+12%',
      changeType: 'increase',
      updateTime: 'Update: July 16, 2023',
      icon: '👤',
      color: 'purple'
    },
    {
      title: 'Total Users',
      value: '560',
      change: '+19%',
      changeType: 'increase',
      updateTime: 'Update: July 19, 2023',
      icon: '👥',
      color: 'purple'
    }
  ]

  const reportData = [
    { id: 1, date: '10/12/2025', user: 'Darlene Robertson', role: 'Administrator', activity: 'Delete User Damson Idriss', avatar: 'DR' },
    { id: 2, date: '10/12/2025', user: 'Floyd Miles', role: 'Store Manager', activity: 'Approve Order from Distributor Allen', avatar: 'FM' },
    { id: 3, date: '10/12/2025', user: 'Cody Fisher', role: 'Sales Assistant', activity: 'Delete Order from Distributor john', avatar: 'CF' },
    { id: 4, date: '10/12/2025', user: 'Dianne Russell', role: 'Sales Manager', activity: 'Update Reports from Accountant Doe', avatar: 'DR' },
    { id: 5, date: '10/12/2025', user: 'Savannah Nguyen', role: 'Sales Manager', activity: 'Delete User John Doe', avatar: 'SN' },
    { id: 6, date: '10/12/2025', user: 'Jacob Jones', role: 'Administrator', activity: 'Approve Order from Distributor Eugene', avatar: 'JJ' },
    { id: 7, date: '10/12/2025', user: 'Marvin McKinney', role: 'Store Manager', activity: 'Delete Order from Distributor Doe', avatar: 'MM' },
    { id: 8, date: '10/12/2025', user: 'Kathryn Murphy', role: 'Store Manager', activity: 'Delete Order from Distributor Sam', avatar: 'KM' },
  ]

  const handleFilter = () => {
    setShowFilterModal(true)
  }

  const applyFilter = (filterData) => {
    console.log('Applying filter:', filterData)
    setShowFilterModal(false)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500">Track Reports for the overall system</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
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
          
          <button 
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
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
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{report.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{report.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.activity}
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
              <span className="text-sm text-gray-500">Showing 1 to 10 out of 50 records</span>
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
    </div>
  )
}

export default Reports
