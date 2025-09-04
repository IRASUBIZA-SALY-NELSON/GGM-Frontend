import React, { useState } from 'react';
import { Search, Bell, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Sample order details data
  const orderDetails = {
    orderNumber: '122345678910',
    dueDate: '10/12/2025',
    orderDate: '10/12/2025',
    orderStatus: 'Approved',
    salesAssistantName: 'Liam john',
    distributorStoreName: 'John Doe',
    shippingAddress: 'KK 120 KIMIHURURA',
    companyName: 'AMACO CLOTHES LTD',
    companyAddress: '10/12/2025',
    phoneNumber: '10/12/2025',
    items: [
      {
        productName: 'Jeans',
        quantity: '150 units',
        unitPrice: '1000rwf',
        totalPrice: '72,000rwf'
      }
    ]
  };

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    // Handle approve logic here
    setShowApproveModal(false);
    navigate('/sales-manager/orders');
  };

  const confirmReject = () => {
    // Handle reject logic here
    setShowRejectModal(false);
    navigate('/sales-manager/orders');
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <button 
              onClick={() => navigate('/sales-manager/orders')}
              className="flex items-center space-x-1 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Orders</span>
            </button>
            <span>/</span>
            <span>Order ID: {orderId}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500">All Orders &gt; Order ID: {orderId}</p>
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

      {/* Order Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header with Action Buttons */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">ORDER DETAILS</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reject
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Export PDF
            </button>
          </div>
        </div>

        {/* Order Information Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number:</label>
                <p className="text-sm text-gray-900">{orderDetails.orderNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Date:</label>
                <p className="text-sm text-gray-900">{orderDetails.orderDate}</p>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">PLACED BY :</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sales Assistant Name:</label>
                    <p className="text-sm text-gray-900">{orderDetails.salesAssistantName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                    <p className="text-sm text-gray-900">{orderDetails.shippingAddress}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">BILL TO :</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name:</label>
                    <p className="text-sm text-gray-900">{orderDetails.companyName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                    <p className="text-sm text-gray-900">{orderDetails.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date:</label>
                <p className="text-sm text-gray-900">{orderDetails.dueDate}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status:</label>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-green-600 bg-green-100">
                  {orderDetails.orderStatus}
                </span>
              </div>

              <div className="pt-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distributor Store Manager Name:</label>
                  <p className="text-sm text-gray-900">{orderDetails.distributorStoreName}</p>
                </div>
              </div>

              <div className="pt-16">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                  <p className="text-sm text-gray-900">{orderDetails.companyAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mt-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Product Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Unit Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.productName}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.unitPrice}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <div className="text-purple-600 text-2xl">✓</div>
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
              <div className="text-red-600 text-2xl">⚠</div>
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

export default OrderDetails;
