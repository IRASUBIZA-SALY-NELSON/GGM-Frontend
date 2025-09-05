import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  // Helper function to get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch orders data
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const [ordersResponse, invoicesResponse] = await Promise.all([
        fetch('http://localhost:8080/api/orders', { headers: getAuthHeaders() }),
        fetch('http://localhost:8080/api/invoices', { headers: getAuthHeaders() })
      ]);
      
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        const invoicesData = invoicesResponse.ok ? await invoicesResponse.json() : [];
        
        const processedOrders = ordersData.map(order => {
          // Find related invoices for this order
          const relatedInvoices = invoicesData.filter(invoice => 
            invoice.orderId === order.id || invoice.orderNumber === order.orderNumber
          );
          
          // Calculate overdue invoices
          const currentDate = new Date();
          const overdueInvoices = relatedInvoices.filter(invoice => {
            const dueDate = new Date(invoice.dueDate || invoice.paymentDue);
            return dueDate < currentDate && (invoice.status === 'PENDING' || invoice.status === 'Pending');
          });
          
          const statusOfReceipt = overdueInvoices.length > 0 
            ? `${overdueInvoices.length} invoice${overdueInvoices.length > 1 ? 's' : ''} overdue`
            : relatedInvoices.length > 0 ? 'All invoices current' : 'No invoices';
          
          return {
            id: order.id,
            order: order.orderNumber || order.id,
            distributorName: order.customerName || order.distributorName || 'Unknown Distributor',
            distributorAvatar: '/distributor.png',
            salesAssistant: order.salesAssistant || order.createdBy || 'Unknown Sales Assistant',
            salesAssistantAvatar: '/distributor.png',
            orderValue: `${(order.totalAmount || order.amount || 0).toLocaleString()}rwf`,
            statusOfReceipt,
            date: new Date(order.orderDate || order.createdAt).toLocaleDateString()
          };
        });
        
        setOrders(processedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.salesAssistant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.order.toString().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    navigate(`/accountant/orders/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Orders for Financial Approval</h1>
            <p className="text-sm text-gray-500">All orders that require your financial approval</p>
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
        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Order</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Distributor Name</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Sales Assistant</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Order Value</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Status of Receipt Invoices</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-900">{order.order}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={order.distributorAvatar} 
                          alt={order.distributorName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{order.distributorName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={order.salesAssistantAvatar} 
                          alt={order.salesAssistant}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">{order.salesAssistant}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{order.orderValue}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{order.statusOfReceipt}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{order.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => handleOrderClick(order.id)}
                        className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
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
  );
};

export default Orders;
