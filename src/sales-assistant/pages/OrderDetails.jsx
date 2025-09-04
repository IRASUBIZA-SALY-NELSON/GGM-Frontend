import React from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/sales-assistant/orders')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-500">All Orders {'>'}  Order ID 1234567890ED</p>
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
        <div className="flex justify-end items-center space-x-3 mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Approve</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Reject</span>
          </button>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">ORDER DETAILS</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Number:</label>
                  <p className="text-sm text-gray-900">1223345567890ED</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Date:</label>
                  <p className="text-sm text-gray-900">10/12/2025</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PLACED BY :</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sales Assistant Name:</label>
                  <p className="text-sm text-gray-900">Liam John</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                  <p className="text-sm text-gray-900">KK 120 KEMU-URURA</p>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date:</label>
                  <p className="text-sm text-gray-900">10/12/2025</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Status:</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Approved
                  </span>
                </div>
                
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distributor Name:</label>
                  <p className="text-sm text-gray-900">John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">BILL TO :</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name:</label>
                <p className="text-sm text-gray-900">APMACO CLOTHES LTD</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                <p className="text-sm text-gray-900">10/12/2025</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                <p className="text-sm text-gray-900">10/12/2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Product Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Unit Price</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-900">Jeans</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700">120 units</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700">6000rwf</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700">72,000rwf</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
