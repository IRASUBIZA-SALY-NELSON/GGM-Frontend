import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, TrendingUp, DollarSign, Users, Award, BarChart3, CheckCircle, DollarSign as PriceIcon, Activity } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    revenueVsTarget: 0,
    bestDistributor: 'Loading...',
    pendingApprovals: [],
    chartData: [],
    loading: true,
    error: null
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchDashboardData = async () => {
    setDashboardData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Fetch orders for stats
      const ordersResponse = await fetch('http://localhost:8080/api/orders', {
        headers: getAuthHeaders()
      });
      
      let orders = [];
      if (ordersResponse.ok) {
        orders = await ordersResponse.json();
      }

      // Fetch pending orders for approval
      const pendingResponse = await fetch('http://localhost:8080/api/orders?status=PENDING', {
        headers: getAuthHeaders()
      });
      
      let pendingOrders = [];
      if (pendingResponse.ok) {
        pendingOrders = await pendingResponse.json();
      }

      // Calculate metrics
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => {
        const amount = parseFloat(order.totalAmount || order.amount || 0);
        return sum + amount;
      }, 0);

      // Process pending approvals
      const processedPendingApprovals = pendingOrders.slice(0, 6).map(order => ({
        id: order.id,
        distributorName: order.customerName || order.distributorName || 'Unknown Distributor',
        salesAssistantName: order.salesAssistant || order.createdBy || 'Unknown Sales Assistant',
        orderValue: `${(order.totalAmount || order.amount || 0).toLocaleString()} rwf`,
        timePending: calculateTimePending(order.createdAt || order.orderDate),
        distributorAvatar: '/distributor.png',
        salesAvatar: '/distributor.png'
      }));

      // Generate chart data based on orders
      const chartData = generateChartData(orders);

      setDashboardData({
        totalOrders,
        totalRevenue,
        revenueVsTarget: totalRevenue * 0.8, // Assuming target is 20% higher
        bestDistributor: findBestDistributor(orders),
        pendingApprovals: processedPendingApprovals,
        chartData,
        loading: false,
        error: null
      });
    } catch (error) {
      console.warn('Error fetching dashboard data:', error);
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  const calculateTimePending = (dateString) => {
    if (!dateString) return 'N/A';
    const orderDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now - orderDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffInDays > 0) {
      return `${diffInDays}day${diffInDays > 1 ? 's' : ''} ${diffInHours}hrs`;
    }
    return `${diffInHours}hrs`;
  };

  const findBestDistributor = (orders) => {
    if (orders.length === 0) return 'No data';
    // Group by distributor and calculate total revenue
    const distributorRevenue = {};
    orders.forEach(order => {
      const distributor = order.customerName || order.distributorName || 'Unknown';
      const amount = parseFloat(order.totalAmount || order.amount || 0);
      distributorRevenue[distributor] = (distributorRevenue[distributor] || 0) + amount;
    });
    
    const bestDistributor = Object.keys(distributorRevenue).reduce((a, b) => 
      distributorRevenue[a] > distributorRevenue[b] ? a : b, 'No data'
    );
    
    return bestDistributor;
  };

  const generateChartData = (orders) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    const monthlyData = months.map((month, index) => {
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt || order.orderDate);
        return orderDate.getFullYear() === currentYear && orderDate.getMonth() === index;
      });
      
      const monthRevenue = monthOrders.reduce((sum, order) => {
        return sum + parseFloat(order.totalAmount || order.amount || 0);
      }, 0);
      
      return {
        month,
        value: monthRevenue,
        percentage: Math.min((monthRevenue / 10000) * 100, 100) // Normalize to percentage
      };
    });
    
    return monthlyData;
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello Robert 👋</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/distributor.png" alt="Profile" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Stats Cards */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Orders Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Total Orders</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">April</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.loading ? 'Loading...' : dashboardData.totalOrders}</div>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">↗ 8.5%</span>
              </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">April</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.loading ? 'Loading...' : `${dashboardData.totalRevenue.toLocaleString()} rwf`}</div>
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">↗ 4.3%</span>
              </div>
            </div>

            {/* Revenue vs Target Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Revenue vs Target</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">April</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.loading ? 'Loading...' : `${dashboardData.revenueVsTarget.toLocaleString()}rwf`}</div>
              <div className="flex items-center text-sm">
                <span className="text-red-600 font-medium">↘ 4.3%</span>
              </div>
            </div>

            {/* Best Distributor Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Best Distributor</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">April</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.loading ? 'Loading...' : dashboardData.bestDistributor}</div>
              <div className="text-sm text-gray-500">Distributor of the month</div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900">My Sales This Year</h3>
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded border">
          <span className="text-sm text-gray-700">2025</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <div className="relative">
        {/* Chart area */}
        <div className="ml-4 relative">
          {/* Bars */}
          <div className="flex items-end justify-between h-80 space-x-2 relative">
            {(dashboardData.chartData.length > 0 ? dashboardData.chartData : [
              { month: 'Jan', percentage: 20 },
              { month: 'Feb', percentage: 55 },
              { month: 'Mar', percentage: 35 },
              { month: 'Apr', percentage: 82 },
              { month: 'May', percentage: 46 },
              { month: 'Jun', percentage: 65 },
              { month: 'Jul', percentage: 38 },
              { month: 'Aug', percentage: 100 },
              { month: 'Sep', percentage: 45 },
              { month: 'Oct', percentage: 72 },
              { month: 'Nov', percentage: 100 },
              { month: 'Dec', percentage: 62 }
            ]).map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group relative">
                {/* Tooltip for Feb */}
                {index === 1 && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg p-2 shadow-lg z-10">
                    <div className="text-xs text-gray-600">Sales</div>
                    <div className="text-sm font-semibold">20.1k</div>
                    <div className="text-xs text-gray-600">200,000 rwf</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col items-center h-80 justify-end">
                  <div 
                    className="bg-purple-600 rounded-t-sm transition-all duration-300 hover:bg-purple-700"
                    style={{ 
                      height: `${Math.min((data.percentage / 100) * 320, 320)}px`,
                      width: '20px'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
              <span key={index} className="text-xs text-gray-600 flex-1 text-center">{month}</span>
            ))}
          </div>
          
          {/* X-axis label */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Months of the year</span>
          </div>
        </div>
      </div>
    </div>
          {/* Pending Approval List */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Approval List (Highest Priority)</h3>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Distributor Name</th>
                    <th className="pb-3 font-medium">Sales Assistant Name</th>
                    <th className="pb-3 font-medium">Order Value</th>
                    <th className="pb-3 font-medium">Time Pending</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dashboardData.loading ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        Loading pending approvals...
                      </td>
                    </tr>
                  ) : dashboardData.pendingApprovals.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No pending approvals
                      </td>
                    </tr>
                  ) : (
                    dashboardData.pendingApprovals.map((approval) => (
                    <tr key={approval.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={approval.distributorAvatar} 
                            alt={approval.distributorName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{approval.distributorName}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={approval.salesAvatar} 
                            alt={approval.salesAssistantName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{approval.salesAssistantName}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-gray-900">{approval.orderValue}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-gray-600">{approval.timePending}</span>
                      </td>
                      <td className="py-4">
                        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                          Review
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>Showing</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>Showing 1 to 10 out of 50 records</span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="px-2 py-1 text-gray-400 hover:text-gray-600">&lt;</button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-900">2</button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-900">3</button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-900">4</button>
                <button className="px-2 py-1 text-gray-400 hover:text-gray-600">&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          
          <button 
            onClick={() => navigate('/sales-manager/orders')}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Approve Orders</span>
          </button>
          
          <button 
            onClick={() => navigate('/sales-manager/pricing-catalog')}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PriceIcon className="w-5 h-5" />
            <span>Set Pricing</span>
          </button>
          
          <button 
            onClick={() => navigate('/sales-manager/sales-analytics')}
            className="w-full flex items-center justify-center space-x-2 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Activity className="w-5 h-5" />
            <span>Track Performance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
