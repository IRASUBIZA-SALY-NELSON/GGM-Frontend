import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'

const OrderDetails = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()

  const handleBackToHistory = () => {
    navigate('/store-manager/product-history')
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToHistory}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
              <p className="text-sm text-gray-500">My Stock > Product ID 1234510 > History > Order details</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">ORDER DETAILS</h2>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
            Order ID #
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Order Number:</h3>
              <p className="text-gray-900">1223456789350</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Order Date:</h3>
              <p className="text-gray-900">10/12/2025</p>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PLACED BY :</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Sales Assistant Name:</h4>
                  <p className="text-gray-900">Liam John</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h4>
                  <p className="text-gray-900">KK 100 KIMIHURURA</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">BILL TO :</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Company Name:</h4>
                  <p className="text-gray-900">AMACO CLOTHES LTD</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number:</h4>
                  <p className="text-gray-900">10/12/2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date:</h3>
              <p className="text-gray-900">10/12/2025</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Order Status:</h3>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                Approved
              </span>
            </div>

            <div className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Distributor Name:</h4>
                  <p className="text-gray-900">John Doe</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Address:</h4>
                  <p className="text-gray-900">10/12/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Table */}
        <div className="border-t border-gray-200 pt-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jeans</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">120 units</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6000 rwf</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">72,000 rwf</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
