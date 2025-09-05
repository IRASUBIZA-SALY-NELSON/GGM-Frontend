import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  CreditCard
} from 'lucide-react'
import { API_ENDPOINTS, apiCall } from '../../config/api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    revenue: 0,
    totalProducts: 0,
    customers: 0,
    recentOrders: [],
    loading: true,
    error: null
  })

  const statsCards = [
    {
      title: 'Total Orders',
      value: dashboardData.totalOrders.toString(),
      change: '+0%',
      trend: 'up',
      icon: '📦'
    },
    {
      title: 'Revenue',
      value: `$${dashboardData.revenue.toLocaleString()}`,
      change: '+0%',
      trend: 'up',
      icon: '💰'
    },
    {
      title: 'Products',
      value: dashboardData.totalProducts.toString(),
      change: '+0%',
      trend: 'up',
      icon: '📋'
    },
    {
      title: 'Customers',
      value: dashboardData.customers.toString(),
      change: '+0%',
      trend: 'up',
      icon: '👥'
    }
  ]

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData(prev => ({ ...prev, loading: true, error: null }))
        
        // Fetch orders
        const ordersResponse = await apiCall(API_ENDPOINTS.ORDERS)
        const orders = ordersResponse || []
        
        // Fetch products
        let products = []
        try {
          const productsResponse = await apiCall(API_ENDPOINTS.PRODUCTS)
          products = productsResponse || []
        } catch (error) {
          console.log('Products API not available:', error.message)
        }
        
        // Calculate metrics
        const totalOrders = orders.length
        const revenue = orders.reduce((sum, order) => {
          const amount = parseFloat(order.totalAmount || order.amount || 0)
          return sum + amount
        }, 0)
        const totalProducts = products.length
        
        // Get recent orders (last 5)
        const recentOrders = orders
          .sort((a, b) => new Date(b.createdAt || b.orderDate) - new Date(a.createdAt || a.orderDate))
          .slice(0, 5)
          .map(order => ({
            id: order.id || order.orderNumber || 'N/A',
            customer: order.customerName || order.customer || 'Unknown Customer',
            amount: `$${(order.totalAmount || order.amount || 0).toLocaleString()}`,
            status: order.status || 'Pending',
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 
                  order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'
          }))
        
        setDashboardData({
          totalOrders,
          revenue,
          totalProducts,
          customers: 0, // Will be 0 until we have customer API
          recentOrders,
          loading: false,
          error: null
        })
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
      }
    }
    
    fetchDashboardData()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-800'
      case 'Approved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">👋 Hello Store Manager</h1>
           <p className="text-sm text-gray-500">Good Morning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Content - Stats and Chart */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-xl font-bold text-gray-900 mb-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* My Sales This Week Chart */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Sales This Week</h3>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                <path
                  d="M 50 150 Q 100 120 150 130 T 250 80 T 350 60 T 450 90 T 550 70"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M 50 150 Q 100 120 150 130 T 250 80 T 350 60 T 450 90 T 550 70 L 550 180 L 50 180 Z"
                  fill="url(#gradient)"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#E0E7FF" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Chart Labels */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-between px-12 text-xs text-gray-600">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-4 text-xs text-gray-600">
                <span>100%</span>
                <span>80%</span>
                <span>60%</span>
                <span>40%</span>
                <span>20%</span>
                <span>0</span>
              </div>
              
              {/* Peak indicator */}
              <div className="absolute top-12 right-20 bg-white rounded-lg px-3 py-2 shadow-lg border">
                <div className="text-xs text-gray-600">Sales</div>
                <div className="text-sm font-semibold text-gray-900">300,000 rwf</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">Days of the Week</span>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.loading ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        Loading orders...
                      </td>
                    </tr>
                  ) : dashboardData.error ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-red-500">
                        Error loading orders: {dashboardData.error}
                      </td>
                    </tr>
                  ) : dashboardData.recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    dashboardData.recentOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{order.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            getStatusColor(order.status)
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                        <td className="px-4 py-3">
                          <button className="text-purple-600 hover:text-purple-800">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Showing</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                    &lt;
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
          </div>
        </div>

        {/* Right Sidebar - Quick Links */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/store-manager/place-order')}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Place New Order</span>
              </button>
              
              <button 
                onClick={() => navigate('/store-manager/my-stock')}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="font-medium">View My Stock</span>
              </button>
              
              <button 
                onClick={() => navigate('/store-manager/billing')}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">Pay Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
