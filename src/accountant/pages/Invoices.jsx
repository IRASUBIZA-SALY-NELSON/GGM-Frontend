import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Eye, CreditCard, Send, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invoices = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState([]);

  // Helper function to get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partially paid':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fetch invoices data
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/invoices', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const invoicesData = await response.json();
        const processedInvoices = invoicesData.map(invoice => ({
          id: invoice.id,
          invoice: invoice.invoiceNumber || invoice.id,
          order: invoice.orderId || invoice.orderNumber || 'N/A',
          distributorName: invoice.customerName || invoice.distributorName || 'Unknown Distributor',
          distributorAvatar: '/distributor.png',
          amountDue: `${(invoice.amountDue || invoice.totalAmount || 0).toLocaleString()}rwf`,
          invoiceAmount: `${(invoice.totalAmount || invoice.amount || 0).toLocaleString()}rwf`,
          status: invoice.status || 'Pending',
          statusColor: getStatusColor(invoice.status),
          issueDate: new Date(invoice.issueDate || invoice.createdAt).toLocaleDateString(),
          dueDate: new Date(invoice.dueDate || invoice.paymentDue).toLocaleDateString()
        }));
        setInvoices(processedInvoices);
      } else {
        setInvoices([]);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // Send reminder for invoice
  const handleSendReminder = async (invoiceId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/invoices/${invoiceId}/reminder`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        alert('Reminder sent successfully!');
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Failed to send reminder');
    }
  };

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice =>
    invoice.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoice.toString().includes(searchTerm.toLowerCase()) ||
    invoice.order.toString().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleActionClick = (action, invoiceId) => {
    setActiveDropdown(null);
    
    switch(action) {
      case 'view':
        // Navigate to invoice view
        break;
      case 'record-payment':
        navigate('/accountant/payments/record');
        break;
      case 'send-reminder':
        // Handle send reminder
        break;
      case 'download-pdf':
        // Handle download PDF
        break;
      case 'finalize-send':
        // Handle finalize & send
        break;
      case 'delete':
        // Handle delete
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Invoices Management</h1>
            <p className="text-sm text-gray-500">Manage and track all invoices</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/accountant/payments/record')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <CreditCard className="w-4 h-4" />
              <span>Record New Payment</span>
            </button>
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Invoice</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Order</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Amount Due</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Invoice Amount</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Issue Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Due Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-gray-500">
                      Loading invoices...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-900">{invoice.invoice}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-900">{invoice.order}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={invoice.distributorAvatar} 
                          alt={invoice.distributorName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{invoice.distributorName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{invoice.amountDue}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{invoice.invoiceAmount}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.statusColor}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{invoice.issueDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{invoice.dueDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === invoice.id ? null : invoice.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        {activeDropdown === invoice.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <div className="py-1">
                              <button 
                                onClick={() => handleActionClick('view', invoice.id)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                              </button>
                              <button 
                                onClick={() => handleActionClick('record-payment', invoice.id)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <CreditCard className="w-4 h-4" />
                                <span>Record Payment</span>
                              </button>
                              <button 
                                onClick={() => handleSendReminder(invoice.id)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Send className="w-4 h-4" />
                                <span>Send Reminder</span>
                              </button>
                              <button 
                                onClick={() => handleActionClick('download-pdf', invoice.id)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download PDF</span>
                              </button>
                              <button 
                                onClick={() => handleActionClick('finalize-send', invoice.id)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <FileText className="w-4 h-4" />
                                <span>Finalize & Send</span>
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
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Showing</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-700">Showing 1 to 10 out of 46 records</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">4</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
