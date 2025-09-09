import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MoreVertical, Eye, CreditCard, Download, FileText } from 'lucide-react'

const Billing = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showActionsDropdown, setShowActionsDropdown] = useState(false)
  const [showRowActions, setShowRowActions] = useState(null)
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchInvoices = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/invoices', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const invoicesData = await response.json();
        
        // Process invoices data for display
        const processedInvoices = invoicesData.map(invoice => ({
          id: invoice.id,
          invoice: invoice.invoiceNumber || `INV${String(invoice.id).padStart(3, '0')}`,
          order: invoice.orderNumber || invoice.orderId || `ORD${String(invoice.id).padStart(3, '0')}`,
          distributorName: invoice.customerName || invoice.distributorName || 'Unknown Customer',
          amountDue: `${invoice.amountDue || invoice.totalAmount || 0} rwf`,
          invoiceAmount: `${invoice.totalAmount || invoice.amount || 0} rwf`,
          status: invoice.status || 'Pending',
          issueDate: invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : 
                    invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : 'N/A',
          dueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A',
          invoiceNumber: invoice.invoiceNumber || `INV${String(invoice.id).padStart(10, '0')}`
        }));
        
        setInvoices(processedInvoices);
      } else {
        console.warn('Failed to fetch invoices:', response.statusText);
        setInvoices([]);
      }
    } catch (error) {
      console.warn('Error fetching invoices:', error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewDetails = (invoice) => {
    navigate(`/store-manager/billing/invoice/${invoice.invoiceNumber}`)
    setShowRowActions(null)
  }

  const handlePayNow = (invoice) => {
    navigate(`/store-manager/billing/pay-invoice/${invoice.invoiceNumber}`)
    setShowRowActions(null)
  }

  const handlePaymentHistory = () => {
    navigate('/store-manager/billing/payment-history')
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <img 
                src="1.png" 
                alt="Robert Allen" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            </div>

            {/* Actions Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <span>Actions</span>
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showActionsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Now</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              )}
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
            <button 
              onClick={handlePaymentHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment History</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  Loading invoices...
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewDetails(invoice)}
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-white" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleViewDetails(invoice)}
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-white" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full mr-3" src="/distributor.png" alt="" />
                    <span className="text-sm font-medium text-gray-900">{invoice.distributorName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.amountDue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.invoiceAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.issueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative">
                    <button 
                      onClick={() => setShowRowActions(showRowActions === invoice.id ? null : invoice.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {showRowActions === invoice.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-2">
                          <button 
                            onClick={() => handleViewDetails(invoice)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <button 
                            onClick={() => handlePayNow(invoice)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>Pay Now</span>
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
              ))
            )}
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

export default Billing
