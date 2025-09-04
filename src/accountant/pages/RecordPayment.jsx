import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecordPayment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDistributor, setSelectedDistributor] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    date: '',
    amount: '',
    method: 'Bank Transfer'
  });

  // Sample distributors
  const distributors = [
    { id: 1, name: 'AMACO CLOTHES LTD' },
    { id: 2, name: 'FASHION HOUSE LTD' },
    { id: 3, name: 'TEXTILE CORP LTD' }
  ];

  // Sample unpaid invoices for selected distributor
  const unpaidInvoices = [
    {
      id: 1,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 2,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 3,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '7,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 4,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 5,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 6,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 7,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 8,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 9,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    },
    {
      id: 10,
      invoiceId: '2',
      distributorName: 'Ronald Richards',
      distributorAvatar: '/distributor.png',
      invoiceAmount: '2,000,000rwf',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      issueDate: '2/2/2025',
      dueDate: '4/4/2025'
    }
  ];

  const handleInvoiceSelect = (invoiceId) => {
    setSelectedInvoices(prev => {
      if (prev.includes(invoiceId)) {
        return prev.filter(id => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/accountant/payments');
    }
  };

  const handleSubmit = () => {
    // Handle payment submission
    navigate('/accountant/payments');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Record a Payment</h1>
              <p className="text-sm text-gray-500">
                {currentStep === 1 && 'Select a distributor to record a new payment'}
                {currentStep === 2 && 'Apply a received payment to one or more invoices'}
                {currentStep === 3 && 'Apply a received payment to one or more invoices'}
              </p>
            </div>
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
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Distributor Selection */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Distributor Selection</h2>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select a distributor to record payment
                </label>
                <div className="relative">
                  <select 
                    value={selectedDistributor}
                    onChange={(e) => setSelectedDistributor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                  >
                    <option value="">AMACO CLOTHES LTD</option>
                    {distributors.map((distributor) => (
                      <option key={distributor.id} value={distributor.name}>
                        {distributor.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button 
                  onClick={handleNext}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Invoice Selection */}
        {currentStep === 2 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Unpaid Invoices For AMACO CLOTHES LTD</h2>
                  <p className="text-sm text-purple-600 mt-1">NB : Choose one invoice</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <span className="text-sm">Filter</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Select</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Invoice</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor Name</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Available Amount</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Issue Date</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Due Date</th>
                      <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unpaidInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={() => handleInvoiceSelect(invoice.id)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-900">{invoice.invoiceId}</span>
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
                          <button className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                            Add Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
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

              <div className="flex justify-between mt-8">
                <button 
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNext}
                  disabled={selectedInvoices.length === 0}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Details Form</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={paymentDetails.date}
                    onChange={(e) => setPaymentDetails({...paymentDetails, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10/12/2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.amount}
                    onChange={(e) => setPaymentDetails({...paymentDetails, amount: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="500,000 rwf"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="relative">
                    <select 
                      value={paymentDetails.method}
                      onChange={(e) => setPaymentDetails({...paymentDetails, method: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Check">Check</option>
                      <option value="Mobile Money">Mobile Money</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button 
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordPayment;
