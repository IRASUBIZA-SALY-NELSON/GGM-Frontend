import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SalesAnalytics = () => {
  const navigate = useNavigate();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    grossProfit: 0,
    totalCOGS: 0,
    totalRevenue: 0,
    loading: true
  });
  const [chartData, setChartData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [ordersToValidate, setOrdersToValidate] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleApprove = (order) => {
    setSelectedOrder(order);
    setShowApproveModal(true);
  };

  const handleReject = (order) => {
    setSelectedOrder(order);
    setShowRejectModal(true);
  };

  const fetchAnalyticsData = async () => {
    try {
      // Fetch orders for analytics calculations
      const ordersResponse = await fetch('http://localhost:8081/api/orders', {
        headers: getAuthHeaders()
      });
      
      // Fetch invoices for invoice analytics
      const invoicesResponse = await fetch('http://localhost:8081/api/invoices', {
        headers: getAuthHeaders()
      });
      
      // Fetch products for category analytics
      const productsResponse = await fetch('http://localhost:8081/api/products', {
        headers: getAuthHeaders()
      });
      
      if (ordersResponse.ok && invoicesResponse.ok && productsResponse.ok) {
        const orders = await ordersResponse.json();
        const invoices = await invoicesResponse.json();
        const products = await productsResponse.json();
        
        // Calculate analytics
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const totalCOGS = products.reduce((sum, product) => sum + ((product.cost || 0) * (product.stock || 0)), 0);
        const grossProfit = totalRevenue - totalCOGS;
        
        setAnalyticsData({
          grossProfit,
          totalCOGS,
          totalRevenue,
          loading: false
        });
        
        // Process category data for chart
        const categoryMap = {};
        products.forEach(product => {
          const category = product.category || 'Uncategorized';
          if (!categoryMap[category]) {
            categoryMap[category] = { revenue: 0, cost: 0 };
          }
          categoryMap[category].revenue += (product.price || 0) * (product.stock || 0);
          categoryMap[category].cost += (product.cost || 0) * (product.stock || 0);
        });
        
        const processedChartData = Object.entries(categoryMap).map(([category, data]) => ({
          category,
          percentage: Math.min(100, Math.max(0, (data.revenue / (totalRevenue || 1)) * 100)),
          color: 'bg-purple-600'
        }));
        
        setChartData(processedChartData.slice(0, 6)); // Limit to 6 categories
        
        // Process invoice data
        const invoiceStatusMap = {};
        invoices.forEach(invoice => {
          const status = invoice.status || 'Draft';
          invoiceStatusMap[status] = (invoiceStatusMap[status] || 0) + 1;
        });
        
        const totalInvoices = invoices.length || 1;
        const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'];
        let colorIndex = 0;
        
        const processedInvoiceData = Object.entries(invoiceStatusMap).map(([status, count]) => ({
          status,
          count,
          percentage: Math.round((count / totalInvoices) * 100),
          color: colors[colorIndex++ % colors.length]
        }));
        
        setInvoiceData(processedInvoiceData);
        
        // Get pending orders for validation
        const pendingOrders = orders
          .filter(order => order.status?.toLowerCase() === 'pending')
          .slice(0, 10)
          .map(order => ({
            id: order.id,
            distributorName: order.customerName || order.distributorName || 'Unknown Distributor',
            distributorAvatar: '/distributor.png',
            salesAssistantName: order.salesAssistant || order.createdBy || 'Unknown Sales Assistant',
            salesAssistantAvatar: '/distributor.png',
            orderValue: `${(order.totalAmount || 0).toLocaleString()}rwf`,
            status: order.status || 'Pending',
            statusColor: getStatusColor(order.status)
          }));
        
        setOrdersToValidate(pendingOrders);
      } else {
        console.warn('Failed to fetch analytics data');
        setAnalyticsData(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setAnalyticsData(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const confirmApprove = async () => {
    if (!selectedOrder) return;
    
    try {
      const response = await fetch(`http://localhost:8081/api/orders/${selectedOrder.id}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        // Refresh analytics data
        fetchAnalyticsData();
      } else {
        alert('Failed to approve order. Please try again.');
      }
    } catch (error) {
      console.error('Error approving order:', error);
      alert('Error approving order. Please try again.');
    }
    
    setShowApproveModal(false);
    setSelectedOrder(null);
  };

  const confirmReject = async () => {
    if (!selectedOrder) return;
    
    try {
      const response = await fetch(`http://localhost:8081/api/orders/${selectedOrder.id}/reject`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        // Refresh analytics data
        fetchAnalyticsData();
      } else {
        alert('Failed to reject order. Please try again.');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Error rejecting order. Please try again.');
    }
    
    setShowRejectModal(false);
    setSelectedOrder(null);
  };

  // Calculate donut chart segments
  const total = invoiceData.reduce((sum, item) => sum + item.percentage, 0);
  let currentAngle = 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Sales Analytics</h1>
            <p className="text-sm text-gray-500">Track and analyze your sales performance</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gross Profit</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.loading ? 'Loading...' : `${analyticsData.grossProfit.toLocaleString()}rwf`}
                </p>
                <p className="text-xs text-gray-500 mt-1">Update Sep 14, 2024</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
              <select className="ml-auto text-xs border border-gray-300 rounded px-2 py-1">
                <option>April</option>
                <option>May</option>
                <option>June</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost of Goods Sold</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.loading ? 'Loading...' : `${analyticsData.totalCOGS.toLocaleString()}rwf`}
                </p>
                <p className="text-xs text-gray-500 mt-1">Update July 14, 2024</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
              <select className="ml-auto text-xs border border-gray-300 rounded px-2 py-1">
                <option>April</option>
                <option>May</option>
                <option>June</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recognized Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.loading ? 'Loading...' : `${analyticsData.totalRevenue.toLocaleString()}rwf`}
                </p>
                <p className="text-xs text-gray-500 mt-1">Update May 14, 2024</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
              <select className="ml-auto text-xs border border-gray-300 rounded px-2 py-1">
                <option>April</option>
                <option>May</option>
                <option>June</option>
              </select>
            </div>
          </div>
        </div>

        {/* Revenue vs. COGS Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue vs. COGS by Product Category (QTD)</h2>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>April</option>
              <option>May</option>
              <option>June</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="flex items-end justify-between h-80 space-x-2">
              {chartData.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                  {analyticsData.loading ? 'Loading chart data...' : 'No category data available'}
                </div>
              ) : (
                chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="relative w-full flex items-end justify-center" style={{ height: '280px' }}>
                      <div 
                        className={`w-12 ${item.color} rounded-t-lg transition-all duration-300 hover:opacity-80`}
                        style={{ height: `${(item.percentage / 100) * 280}px` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 text-center transform -rotate-45 origin-center w-16">
                      {item.category}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
              <span>20%</span>
              <span>0</span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Product Categories
          </div>
        </div>

        {/* Invoice Analytics Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Invoice Analytics Overview</h2>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>April</option>
              <option>May</option>
              <option>June</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Donut Chart */}
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                {invoiceData.map((item, index) => {
                  const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                  const strokeDashoffset = -currentAngle;
                  currentAngle += item.percentage;
                  
                  return (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="12"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>
              
              {/* Center labels */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500">Paid</span>
                <span className="text-xs text-gray-500">Unpaid</span>
                <span className="text-xs text-gray-500">Partial</span>
                <span className="text-xs text-gray-500">Draft</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {invoiceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                    <div className="text-xs text-gray-500">{item.count} invoices</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders to Validate */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Orders to Validate</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
          </div>

          {/* Search and Filter */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Orders Table */}
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Assistant Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersToValidate.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    {analyticsData.loading ? 'Loading orders...' : 'No pending orders to validate'}
                  </td>
                </tr>
              ) : (
                ordersToValidate
                  .filter(order => 
                    order.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.salesAssistantName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full" src={order.distributorAvatar} alt="" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{order.distributorName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full" src={order.salesAssistantAvatar} alt="" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{order.salesAssistantName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderValue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleApprove(order)}
                      className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Review
                    </button>
                    <button
                      onClick={() => handleReject(order)}
                      className="inline-flex items-center px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Exp to CSV
                    </button>
                  </td>
                </tr>
                  ))
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center p-6">
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

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to Approve this Order?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The order will be approved successfully.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Approve Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to reject this order?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The order will be rejected successfully.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesAnalytics;
