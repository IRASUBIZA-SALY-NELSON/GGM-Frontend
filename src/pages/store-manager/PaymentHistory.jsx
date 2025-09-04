import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Filter, MoreVertical, Eye, Download, FileText } from 'lucide-react'

const PaymentHistory = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showRowActions, setShowRowActions] = useState(null)

  const payments = [
    { id: 1, invoice: 'INV001', order: 'ORD001', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Bank Transfer', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 2, invoice: 'INV002', order: 'ORD002', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Bank Transfer', status: 'Failed', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 3, invoice: 'INV003', order: 'ORD003', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Bank Transfer', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 4, invoice: 'INV004', order: 'ORD004', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Bank Transfer', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 5, invoice: 'INV005', order: 'ORD005', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Bank Transfer', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 6, invoice: 'INV006', order: 'ORD006', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Credit Card', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 7, invoice: 'INV007', order: 'ORD007', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Credit Card', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 8, invoice: 'INV008', order: 'ORD008', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Credit Card', status: 'Complete', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 9, invoice: 'INV009', order: 'ORD009', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Credit Card', status: 'Failed', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 10, invoice: 'INV010', order: 'ORD010', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Check', status: 'Failed', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
    { id: 11, invoice: 'INV011', order: 'ORD011', distributorName: 'Ronald Richards', amountPaid: '2,000,000 rwf', paymentMethod: 'Check', status: 'Failed', issueDate: '2/2/2025', dueDate: '2/2/2025', receiptId: '1222554567891ED' },
  ]

  const handleGoBack = () => {
    navigate('/store-manager/billing')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewReceipt = (payment) => {
    navigate(`/store-manager/billing/receipt/${payment.receiptId}`)
    setShowRowActions(null)
  }

  const handleViewOrder = (payment) => {
    navigate(`/store-manager/billing/order/${payment.receiptId}`)
    setShowRowActions(null)
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
              <h1 className="text-2xl font-bold text-gray-900">Payment History & Receipts</h1>
              <p className="text-sm text-gray-500">All Payments &gt; Payment History & Receipts</p>
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

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <span>Billing Overview</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewReceipt(payment)}
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-white" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewOrder(payment)}
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-white" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full mr-3" src="/distributor.png" alt="" />
                    <span className="text-sm font-medium text-gray-900">{payment.distributorName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amountPaid}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.issueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative">
                    <button 
                      onClick={() => setShowRowActions(showRowActions === payment.id ? null : payment.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {showRowActions === payment.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-2">
                          <button 
                            onClick={() => handleViewReceipt(payment)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Receipt</span>
                          </button>
                          <button 
                            onClick={() => handleViewOrder(payment)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Order</span>
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
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
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
