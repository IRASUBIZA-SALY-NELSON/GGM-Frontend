import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const WarehouseManagerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [statsData, setStatsData] = useState({
    todayShipments: 0,
    ordersToProcess: 0,
    pendingReconcile: 0,
    lowStockAlerts: 0
  });
  const [ordersData, setOrdersData] = useState([]);
  const [chartData, setChartData] = useState([
    { label: "To be Picked", percentage: 0, count: "0 orders", color: "bg-purple-600" },
    { label: "Picking", percentage: 0, count: "0 orders", color: "bg-purple-400" },
    { label: "To be Packed", percentage: 0, count: "0 orders", color: "bg-purple-300" },
    { label: "Packed", percentage: 0, count: "0 orders", color: "bg-purple-200" }
  ]);

  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      // Fetch orders for processing queue and stats
      const ordersResponse = await fetch('http://localhost:8080/api/orders', {
        headers: getAuthHeaders()
      });
      
      if (ordersResponse.ok) {
        const orders = await ordersResponse.json();
        
        // Process orders data for stats
        const today = new Date().toDateString();
        const todayOrders = orders.filter(order => 
          new Date(order.createdAt || order.orderDate).toDateString() === today
        );
        
        const pendingOrders = orders.filter(order => 
          ['PENDING', 'PROCESSING', 'TO_BE_PICKED', 'PICKING'].includes(order.status)
        );
        
        const packedOrders = orders.filter(order => 
          order.status === 'PACKED' || order.status === 'SHIPPED'
        );
        
        // Fetch inventory for low stock alerts
        let lowStockCount = 0;
        try {
          const inventoryResponse = await fetch('http://localhost:8080/api/inventories', {
            headers: getAuthHeaders()
          });
          
          if (inventoryResponse.ok) {
            const inventory = await inventoryResponse.json();
            lowStockCount = inventory.filter(item => 
              item.currentStock <= (item.minStockLevel || 10)
            ).length;
          }
        } catch (invError) {
          console.warn('Could not fetch inventory data:', invError);
        }
        
        // Update stats
        setStatsData({
          todayShipments: packedOrders.length,
          ordersToProcess: pendingOrders.length,
          pendingReconcile: orders.filter(order => order.status === 'PENDING_RECONCILE').length,
          lowStockAlerts: lowStockCount
        });
        
        // Process orders for fulfillment queue
        const processedOrders = pendingOrders.slice(0, 10).map(order => ({
          id: order.id,
          distributorName: order.distributorName || order.customerName || 'Unknown Distributor',
          salesAssistant: order.salesAssistantName || 'Unassigned',
          orderValue: `${order.totalAmount || 0} rwf`,
          status: getDisplayStatus(order.status),
          statusColor: getStatusColor(order.status),
          createdAt: order.createdAt || order.orderDate
        }));
        
        setOrdersData(processedOrders);
        
        // Calculate chart data based on order statuses
        const statusCounts = {
          'To be Picked': orders.filter(o => o.status === 'TO_BE_PICKED').length,
          'Picking': orders.filter(o => o.status === 'PICKING').length,
          'To be Packed': orders.filter(o => o.status === 'TO_BE_PACKED').length,
          'Packed': orders.filter(o => o.status === 'PACKED').length
        };
        
        const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0) || 1;
        
        setChartData([
          { 
            label: "To be Picked", 
            percentage: Math.round((statusCounts['To be Picked'] / total) * 100), 
            count: `${statusCounts['To be Picked']} orders`, 
            color: "bg-purple-600" 
          },
          { 
            label: "Picking", 
            percentage: Math.round((statusCounts['Picking'] / total) * 100), 
            count: `${statusCounts['Picking']} orders`, 
            color: "bg-purple-400" 
          },
          { 
            label: "To be Packed", 
            percentage: Math.round((statusCounts['To be Packed'] / total) * 100), 
            count: `${statusCounts['To be Packed']} orders`, 
            color: "bg-purple-300" 
          },
          { 
            label: "Packed", 
            percentage: Math.round((statusCounts['Packed'] / total) * 100), 
            count: `${statusCounts['Packed']} orders`, 
            color: "bg-purple-200" 
          }
        ]);
      }
      
    } catch (err) {
      console.warn('API call failed, showing default values:', err);
      // Keep default 0 values - no error display
    } finally {
      setLoading(false);
    }
  };
  
  const getDisplayStatus = (status) => {
    const statusMap = {
      'TO_BE_PICKED': 'To be Picked',
      'PICKING': 'Picking',
      'TO_BE_PACKED': 'To be Packed',
      'PACKED': 'Packed',
      'SHIPPED': 'Shipped',
      'PROCESSING': 'Processing',
      'PENDING': 'Pending'
    };
    return statusMap[status] || status;
  };
  
  const getStatusColor = (status) => {
    const colorMap = {
      'TO_BE_PICKED': 'bg-blue-100 text-blue-800',
      'PICKING': 'bg-yellow-100 text-yellow-800',
      'TO_BE_PACKED': 'bg-orange-100 text-orange-800',
      'PACKED': 'bg-green-100 text-green-800',
      'SHIPPED': 'bg-purple-100 text-purple-800',
      'PROCESSING': 'bg-blue-100 text-blue-800',
      'PENDING': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Hello {getUserDisplayName()}</h2>
        <p className="text-sm text-gray-500">Good Morning</p>
      </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Today's Shipments</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{loading ? '...' : statsData.todayShipments}</div>
            <p className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Orders to Process Today</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{loading ? '...' : statsData.ordersToProcess}</div>
            <p className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending Reconcile</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{loading ? '...' : statsData.pendingReconcile}</div>
            <p className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Low Stock Alerts</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{loading ? '...' : statsData.lowStockAlerts}</div>
            <p className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/warehouse-manager/process-orders')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Process Orders
            </button>
            <button 
              onClick={() => navigate('/warehouse-manager/stock-management')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Receive New Stock
            </button>
            <button 
              onClick={() => navigate('/warehouse-manager/stock-transfers')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Create Transfer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Fulfillment Analytics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Fulfillment Analytics Overview</h3>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
              </select>
            </div>
            
            {/* Donut Chart */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="10" 
                    strokeDasharray="87.96" strokeDashoffset="21.99" className="transition-all duration-300"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#a78bfa" strokeWidth="10" 
                    strokeDasharray="50.27" strokeDashoffset="71.26" className="transition-all duration-300"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#c4b5fd" strokeWidth="10" 
                    strokeDasharray="50.27" strokeDashoffset="121.53" className="transition-all duration-300"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd6fe" strokeWidth="10" 
                    strokeDasharray="87.96" strokeDashoffset="171.8" className="transition-all duration-300"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{loading ? '...' : ordersData.length}</div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.percentage}%</div>
                    <div className="text-xs text-gray-500">{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Fulfillment Queue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Fulfillment Queue</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Distributor Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Sales Assistant Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Order Value</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ordersData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        {loading ? 'Loading orders...' : 'No orders to process at the moment'}
                      </td>
                    </tr>
                  ) : (
                    ordersData.map((order) => (
                      <tr key={order.id}>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src="/distributor.png" 
                              alt={order.distributorName} 
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src="/distributor.png" 
                              alt={order.salesAssistant} 
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm text-gray-700">{order.salesAssistant}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-900">{order.orderValue}</td>
                        <td className="py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => navigate(`/warehouse-manager/process-orders?orderId=${order.id}`)}
                              className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700"
                            >
                              View Order
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing 1 to 5 of 5 results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default WarehouseManagerDashboard;
