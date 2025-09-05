import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const order = await apiCall(API_ENDPOINTS.ORDER_BY_ID(orderId));
        setOrderData(order);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Fallback to sample data if API fails
        setOrderData({
          id: orderId,
          number: '1223445579150',
          status: 'SUBMITTED',
          createdAt: new Date().toISOString(),
          totals: { grandTotal: 72000 },
          createdBy: { name: 'Liam John' },
          distributor: { name: 'John Doe' },
          deliveryAddress: 'KK 120 KDHIJURURA',
          notes: 'Order placed by distributor',
          orderLines: [
            {
              product: { name: 'Jeans' },
              qty: 120,
              unitPrice: 6000,
              lineTotal: 72000
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleApprove = async () => {
    try {
      setProcessing(true);
      await apiCall(API_ENDPOINTS.ORDER_APPROVE(orderId), {
        method: HTTP_METHODS.PUT
      });
      console.log('✅ Order approved successfully');
      navigate('/accountant/orders');
    } catch (error) {
      console.error('❌ Error approving order:', error);
      alert('Failed to approve order: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    try {
      setProcessing(true);
      // Cancel order by updating status
      await apiCall(API_ENDPOINTS.ORDER_BY_ID(orderId), {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify({
          ...orderData,
          status: 'CANCELLED',
          cancellationReason: 'Cancelled by accountant'
        })
      });
      console.log('✅ Order cancelled successfully');
      setShowCancelModal(false);
      navigate('/accountant/orders');
    } catch (error) {
      console.error('❌ Error cancelling order:', error);
      alert('Failed to cancel order: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    try {
      setProcessing(true);
      await apiCall(API_ENDPOINTS.ORDER_REJECT(orderId), {
        method: HTTP_METHODS.PUT
      });
      console.log('✅ Order rejected successfully');
      navigate('/accountant/orders');
    } catch (error) {
      console.error('❌ Error rejecting order:', error);
      alert('Failed to reject order: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <button 
            onClick={() => navigate('/accountant/orders')}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/accountant/orders')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Orders for Financial Approval</h1>
              <p className="text-sm text-gray-500">All Orders {'>'} Order ID {orderData.number || orderData.id}</p>
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
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mb-6">
          <button 
            onClick={handleApprove}
            disabled={processing}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Processing...' : 'Approve'}
          </button>
          <button 
            onClick={handleCancel}
            disabled={processing}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleReject}
            disabled={processing}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reject Order
          </button>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">ORDER DETAILS</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Number:</label>
              <p className="text-sm text-gray-900">{orderData.number || orderData.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date:</label>
              <p className="text-sm text-gray-900">{orderData.deliveryDate ? new Date(orderData.deliveryDate).toLocaleDateString() : 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Date:</label>
              <p className="text-sm text-gray-900">{new Date(orderData.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Status:</label>
              <p className="text-sm text-gray-900">{orderData.status}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-semibold text-gray-900 mb-4">PLACED BY :</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sales Assistant Name:</label>
                <p className="text-sm text-gray-900">{orderData.createdBy?.name || orderData.createdBy?.username || 'Unknown'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distributor Name:</label>
                <p className="text-sm text-gray-900">{orderData.distributor?.name || orderData.distributor?.companyName || 'Unknown Distributor'}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <p className="text-sm text-gray-900">{orderData.deliveryAddress || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-semibold text-gray-900 mb-4">ORDER SUMMARY :</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount:</label>
                <p className="text-sm text-gray-900">{orderData.totals?.grandTotal?.toLocaleString() || '0'} RWF</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency:</label>
                <p className="text-sm text-gray-900">{orderData.currency || 'RWF'}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes:</label>
                <p className="text-sm text-gray-900">{orderData.notes || 'No notes provided'}</p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">ORDER ITEMS:</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Unit Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderData.orderLines?.map((orderLine, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{orderLine.product?.name || 'Unknown Product'}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{orderLine.qty} units</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{orderLine.unitPrice?.toLocaleString() || '0'} RWF</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{orderLine.lineTotal?.toLocaleString() || '0'} RWF</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are you sure you want to cancel this order?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                This action will be permanent and irreversible
              </p>
              <div className="flex space-x-3 w-full">
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
