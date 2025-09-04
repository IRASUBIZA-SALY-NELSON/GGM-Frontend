import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Printer, Download } from 'lucide-react'

const ViewInvoice = () => {
  const navigate = useNavigate()
  const { invoiceId } = useParams()

  const handleGoBack = () => {
    navigate('/store-manager/billing')
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
              <p className="text-sm text-gray-500">All Invoices &gt; Invoice ID: {invoiceId}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <img 
                src="/1.png" 
                alt="Robert Allen" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
        {/* Invoice Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Invoice Number:</h3>
              <p className="text-gray-900">{invoiceId || '1222554567891ED'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Invoice Date:</h3>
              <p className="text-gray-900">10/12/2025</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Purchase Order (PO) Number:</h3>
              <p className="text-gray-900">1212543LUD</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date:</h3>
              <p className="text-gray-900">10/12/2025</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Invoice Status:</h3>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>
        </div>

        {/* FROM Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">FROM :</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Company Name:</h4>
              <p className="text-gray-900">AMACO CLOTHES LTD</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Address:</h4>
              <p className="text-gray-900">10/12/2025</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Phone Number:</h4>
            <p className="text-gray-900">10/12/2025</p>
          </div>
        </div>

        {/* BILL TO Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">BILL TO :</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Company Name:</h4>
              <p className="text-gray-900">AMACO CLOTHES LTD</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Address:</h4>
              <p className="text-gray-900">10/12/2025</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Phone Number:</h4>
            <p className="text-gray-900">10/12/2025</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Unit Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-900">Jeans</td>
                <td className="px-6 py-4 text-sm text-gray-900">120 units</td>
                <td className="px-6 py-4 text-sm text-gray-900">6500 rwf</td>
                <td className="px-6 py-4 text-sm text-gray-900">78,000 rwf</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewInvoice
