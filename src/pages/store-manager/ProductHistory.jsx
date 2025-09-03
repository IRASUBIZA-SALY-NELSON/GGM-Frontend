import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowLeft, Filter, Plus } from 'lucide-react'

const ProductHistory = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const historyData = [
    { id: 1, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 2, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 3, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 4, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 5, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 6, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 7, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 8, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 9, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 10, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 11, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
    { id: 12, unitPrice: '6,000 rwf', quantity: '200 units', quantityOrdered: 'Pending', orderDate: '2/2/2025', unitSum: '1,200,000 rwf', status: 'Active' },
  ]

  const handleBackToMyStock = () => {
    navigate('/store-manager/my-stock')
  }

  const handleOrderDetails = (orderId) => {
    navigate(`/store-manager/order-details/${orderId}`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToMyStock}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
              <p className="text-sm text-gray-500">My Stock > Product ID 1234510 > History</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Record New Payment</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Ordered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Sum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm font-medium">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.unitPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {item.quantityOrdered}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.unitSum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleOrderDetails(item.id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
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
            {'<'}
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
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductHistory
