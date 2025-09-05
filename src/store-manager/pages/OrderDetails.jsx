import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'

const OrderDetails = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchOrderDetails = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`https://ggm-backend-h025.onrender.com/api/orders/${orderId}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const order = await response.json();
        setOrderData(order);
      } else {
        console.warn('Failed to fetch order details:', response.statusText);
        setOrderData(null);
      }
    } catch (error) {
      console.warn('Error fetching order details:', error);
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleBackToHistory = () => {
    navigate('/store-manager/product-history')
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToHistory}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
              <p className="text-sm text-gray-500">My Stock &gt; Product ID 1234510 &gt; History &gt; Order details</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        ) : !orderData ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Order not found</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">ORDER DETAILS</h2>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Order ID #{orderData.id}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Number:</h3>
                  <p className="text-gray-900">{orderData.orderNumber || orderData.id}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Date:</h3>
                  <p className="text-gray-900">
                    {orderData.orderDate ? new Date(orderData.orderDate).toLocaleDateString() : 
                     orderData.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">PLACED BY :</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Sales Assistant Name:</h4>
                      <p className="text-gray-900">{orderData.salesAssistant || orderData.createdBy || 'N/A'}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h4>
                      <p className="text-gray-900">{orderData.shippingAddress || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">BILL TO :</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Company Name:</h4>
                      <p className="text-gray-900">{orderData.companyName || orderData.customerName || 'N/A'}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number:</h4>
                      <p className="text-gray-900">{orderData.phoneNumber || orderData.contactNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Due Date:</h3>
                  <p className="text-gray-900">
                    {orderData.dueDate ? new Date(orderData.dueDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Order Status:</h3>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(orderData.status)}`}>
                    {orderData.status || 'Pending'}
                  </span>
                </div>

                <div className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Distributor Name:</h4>
                      <p className="text-gray-900">{orderData.distributorName || orderData.customerName || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Address:</h4>
                      <p className="text-gray-900">{orderData.billingAddress || orderData.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Table */}
            <div className="border-t border-gray-200 pt-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderData.items && orderData.items.length > 0 ? (
                      orderData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.productName || item.name || 'Product'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity || 0} units
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.unitPrice || item.price || 0} rwf
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {((item.unitPrice || item.price || 0) * (item.quantity || 0)).toLocaleString()} rwf
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No items found in this order
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
