import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Sample order data
  const orderData = {
    orderNumber: '1223445579150',
    dueDate: '10/12/2025',
    orderDate: '10/12/2025',
    orderStatus: 'Approved',
    salesAssistantName: 'Liam John',
    distributorName: 'John Doe',
    shippingAddress: 'KK 120 KDHIJURURA',
    companyName: 'AMACO CLOTHES LTD',
    address: '10/12/2025',
    phoneNumber: '10/12/2025',
    products: [
      {
        name: 'Jeans',
        quantity: '120 units',
        unitPrice: '6000rwf',
        totalAmount: '72,000rwf'
      }
    ]
  };

  const handleApprove = () => {
    // Handle approve logic
    navigate('/accountant/orders');
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    // Handle cancel logic
    setShowCancelModal(false);
    navigate('/accountant/orders');
  };

  const handleReject = () => {
    // Handle reject logic
    navigate('/accountant/orders');
  };

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
              <p className="text-sm text-gray-500">All Orders {'>'} Order ID {orderData.orderNumber}</p>
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Approve
          </button>
          <button 
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Cancel
          </button>
          <button 
            onClick={handleReject}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
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
              <p className="text-sm text-gray-900">{orderData.orderNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date:</label>
              <p className="text-sm text-gray-900">{orderData.dueDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Date:</label>
              <p className="text-sm text-gray-900">{orderData.orderDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Status:</label>
              <p className="text-sm text-gray-900">{orderData.orderStatus}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-semibold text-gray-900 mb-4">PLACED BY :</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sales Assistant Name:</label>
                <p className="text-sm text-gray-900">{orderData.salesAssistantName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distributor Name:</label>
                <p className="text-sm text-gray-900">{orderData.distributorName}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <p className="text-sm text-gray-900">{orderData.shippingAddress}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-semibold text-gray-900 mb-4">BILL TO :</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name:</label>
                <p className="text-sm text-gray-900">{orderData.companyName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                <p className="text-sm text-gray-900">{orderData.address}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                <p className="text-sm text-gray-900">{orderData.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div>
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
                {orderData.products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.quantity}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.unitPrice}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{product.totalAmount}</td>
                  </tr>
                ))}
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
