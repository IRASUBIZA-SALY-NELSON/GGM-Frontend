import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Printer, Download } from 'lucide-react'

const PaymentReceipt = () => {
  const navigate = useNavigate()
  const { receiptId } = useParams()

  const handleGoBack = () => {
    navigate('/store-manager/billing/payment-history')
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
              <p className="text-sm text-gray-500">All Payments &gt; Payment ID: {receiptId} &gt; Receipt</p>
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

      {/* Receipt Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
        {/* Receipt Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">PAYMENT RECEIPT</h2>
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

        {/* Receipt Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Distributor's Company Name:</h3>
            <p className="text-gray-900 font-medium">AMACO CLOTHES LTD</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Distributor's Company Address:</h3>
            <p className="text-gray-900">KK 120 KIMIHURURA</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Receipt Number:</h3>
            <p className="text-gray-900">{receiptId || '1222554567891ED'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Date:</h3>
            <p className="text-gray-900">10/12/2025</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method Details:</h3>
            <p className="text-gray-900">Credit Card - ****4000</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Amount Paid:</h3>
            <p className="text-gray-900 text-xl font-semibold">100,000 rwf</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Remaining Balance:</h3>
            <p className="text-gray-900 font-medium">0 rwf</p>
          </div>
        </div>

        {/* Receipt Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Thank you for your payment. This receipt serves as proof of payment.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentReceipt
