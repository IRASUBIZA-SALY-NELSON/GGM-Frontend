import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);

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
      case 'completed':
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fetch payments data
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/payments', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const paymentsData = await response.json();
        const processedPayments = paymentsData.map(payment => ({
          id: payment.id,
          distributorName: payment.customerName || payment.distributorName || payment.payerName || 'Unknown Distributor',
          distributorAvatar: '/distributor.png',
          accountPaid: `${(payment.amount || payment.totalAmount || 0).toLocaleString()}rwf`,
          status: payment.status || 'Pending',
          statusColor: getStatusColor(payment.status),
          paymentDate: new Date(payment.paymentDate || payment.createdAt).toLocaleDateString(),
          receivedBy: payment.receivedBy || payment.processedBy || 'System',
          receivedByAvatar: '/distributor.png'
        }));
        setPayments(processedPayments);
      } else {
        setPayments([]);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter payments based on search term
  const filteredPayments = payments.filter(payment =>
    payment.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.receivedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Payment Management</h1>
            <p className="text-sm text-gray-500">Keep Track of Payments</p>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
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
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
              <Plus className="w-4 h-4" />
              <span>Record New Payment</span>
            </button>
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Select</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Account Paid</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Payment Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Received By</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      Loading payments...
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={payment.distributorAvatar} 
                          alt={payment.distributorName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{payment.distributorName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{payment.accountPaid}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.statusColor}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{payment.paymentDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={payment.receivedByAvatar} 
                          alt={payment.receivedBy}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-700">{payment.receivedBy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                        View Details
                      </button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
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

export default Payments;
