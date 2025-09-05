import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Eye, FileText, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersToValidate, setOrdersToValidate] = useState([]);
  const [overdueInvoices, setOverdueInvoices] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    cashFlow: 0,
    pendingOrders: 0,
    overdueInvoices: 0,
    outstandingReceivables: 0
  });
  const [chartData, setChartData] = useState([]);

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
      case 'approved':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'partially paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [ordersResponse, invoicesResponse, paymentsResponse] = await Promise.all([
        fetch('http://localhost:8080/api/orders', { headers: getAuthHeaders() }),
        fetch('http://localhost:8080/api/invoices', { headers: getAuthHeaders() }),
        fetch('http://localhost:8080/api/payments', { headers: getAuthHeaders() })
      ]);

      if (ordersResponse.ok && invoicesResponse.ok) {
        const orders = await ordersResponse.json();
        const invoices = await invoicesResponse.json();
        const payments = paymentsResponse.ok ? await paymentsResponse.json() : [];

        // Process orders to validate (pending orders)
        const pendingOrders = orders.filter(order => order.status === 'PENDING' || order.status === 'Pending');
        const processedOrders = pendingOrders.slice(0, 3).map(order => ({
          id: order.id,
          distributorName: order.customerName || order.distributorName || 'Unknown Distributor',
          distributorAvatar: '/distributor.png',
          salesAssistantName: order.salesAssistant || order.createdBy || 'Unknown Sales Assistant',
          salesAssistantAvatar: '/distributor.png',
          orderValue: `${(order.totalAmount || order.amount || 0).toLocaleString()}rwf`,
          status: order.status || 'Pending',
          statusColor: getStatusColor(order.status)
        }));
        setOrdersToValidate(processedOrders);

        // Process overdue invoices
        const currentDate = new Date();
        const overdue = invoices.filter(invoice => {
          const dueDate = new Date(invoice.dueDate || invoice.paymentDue);
          return dueDate < currentDate && (invoice.status === 'PENDING' || invoice.status === 'Pending');
        });
        const processedOverdueInvoices = overdue.slice(0, 3).map(invoice => ({
          id: invoice.id,
          invoiceId: invoice.invoiceNumber || invoice.id,
          distributorName: invoice.customerName || invoice.distributorName || 'Unknown Distributor',
          distributorAvatar: '/distributor.png',
          invoiceAmount: `${(invoice.totalAmount || invoice.amount || 0).toLocaleString()}rwf`,
          status: invoice.status || 'Pending',
          statusColor: getStatusColor('overdue'),
          dueDate: new Date(invoice.dueDate || invoice.paymentDue).toLocaleDateString(),
          overdueDate: new Date().toLocaleDateString()
        }));
        setOverdueInvoices(processedOverdueInvoices);

        // Calculate dashboard stats
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
        const cashFlow = totalRevenue - totalPayments;
        const pendingOrdersCount = pendingOrders.length;
        const overdueInvoicesCount = overdue.length;
        const outstandingReceivables = invoices
          .filter(inv => inv.status === 'PENDING' || inv.status === 'Pending')
          .reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0);

        setDashboardStats({
          cashFlow: Math.round(cashFlow / 1000000), // Convert to millions
          pendingOrders: pendingOrdersCount,
          overdueInvoices: overdueInvoicesCount,
          outstandingReceivables: Math.round(outstandingReceivables / 1000000) // Convert to millions
        });

        // Generate chart data for outstanding invoices by age
        const ageRanges = [
          { label: '0-15 Days', min: 0, max: 15 },
          { label: '16-30 Days', min: 16, max: 30 },
          { label: '31-60 Days', min: 31, max: 60 },
          { label: '61-90 Days', min: 61, max: 90 },
          { label: '90+ Days', min: 91, max: Infinity }
        ];

        const chartDataProcessed = ageRanges.map(range => {
          const invoicesInRange = invoices.filter(invoice => {
            const daysDiff = Math.floor((currentDate - new Date(invoice.dueDate || invoice.paymentDue)) / (1000 * 60 * 60 * 24));
            return daysDiff >= range.min && daysDiff <= range.max;
          });
          const percentage = invoices.length > 0 ? (invoicesInRange.length / invoices.length) * 100 : 0;
          return { percentage: Math.round(percentage), label: range.label };
        });
        setChartData(chartDataProcessed);
      } else {
        setOrdersToValidate([]);
        setOverdueInvoices([]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setOrdersToValidate([]);
      setOverdueInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle order approval
  const handleApproveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  // Filter orders based on search term
  const filteredOrders = ordersToValidate.filter(order =>
    order.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.salesAssistantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter invoices based on search term
  const filteredInvoices = overdueInvoices.filter(invoice =>
    invoice.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceId.toString().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Hello Robert 👋</h1>
            <p className="text-sm text-gray-500">Good Morning</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Cash Flow */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Cash Flow (YTD)</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : dashboardStats.cashFlow}M</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Pending Validation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Orders Pending Validation</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : dashboardStats.pendingOrders}</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>

          {/* Overdue Invoices */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Overdue Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : dashboardStats.overdueInvoices}</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">-4%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>

          {/* Outstanding Receivables */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Sent Outstanding Receivables</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : dashboardStats.outstandingReceivables}M</p>
                <p className="text-xs text-gray-400 mt-1">Updated: July 14, 2025</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">-4%</span>
                <select className="ml-2 text-xs border border-gray-300 rounded px-2 py-1">
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="flex space-x-3">
            <button 
              onClick={() => navigate('/accountant/invoices')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
            >
              View Aging Report
            </button>
            <button 
              onClick={() => navigate('/accountant/payments/record')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
            >
              Record a Payment
            </button>
          </div>
        </div>

        {/* Outstanding Invoices by Age Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Outstanding Invoices by Age</h2>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>April</option>
              <option>May</option>
              <option>June</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="flex items-end justify-between h-80 space-x-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '280px' }}>
                    <div 
                      className="w-16 bg-purple-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                      style={{ height: `${(item.percentage / 100) * 280}px` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 text-center">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>31-60 Days</span>
              <span>31-60 Days</span>
              <span>16-30 Days</span>
              <span>1-15 Days</span>
              <span>0</span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Percentage of the overdue invoices
          </div>
        </div>

        {/* Orders to Validate */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Orders to Validate</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Distributor Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sales Assistant Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Order Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        Loading orders...
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No orders to validate
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={order.distributorAvatar} 
                            alt={order.distributorName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={order.salesAssistantAvatar} 
                            alt={order.salesAssistantName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{order.salesAssistantName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{order.orderValue}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleApproveOrder(order.id)}
                            className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Approve
                          </button>
                          <button className="inline-flex items-center px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                            Exp to CSV
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
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
          </div>
        </div>

        {/* Overdue Invoices */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Overdue Invoices</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Distributor Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Overdue Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        Loading invoices...
                      </td>
                    </tr>
                  ) : filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        No overdue invoices
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{invoice.invoiceId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={invoice.distributorAvatar} 
                            alt={invoice.distributorName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{invoice.distributorName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{invoice.invoiceAmount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.statusColor}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{invoice.dueDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-700">{invoice.overdueDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700">
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
