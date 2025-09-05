import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Filter, Plus, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Distributors = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [distributorsData, setDistributorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalDistributors: 0,
    totalContribution: 0,
    averageRevenue: 0,
    loading: true
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const handleViewDistributor = (distributorId) => {
    navigate(`/sales-manager/distributors/${distributorId}`);
  };

  const handleAddDistributor = () => {
    navigate('/sales-manager/distributors/add-new');
  };

  const handleDeleteDistributor = (distributor) => {
    setSelectedDistributor(distributor);
    setShowDeleteModal(true);
  };

  const fetchDistributors = async () => {
    setLoading(true);
    
    try {
      // Fetch distributors
      const distributorsResponse = await fetch('http://localhost:8081/api/distributors', {
        headers: getAuthHeaders()
      });
      
      // Fetch orders to calculate last order and contribution
      const ordersResponse = await fetch('http://localhost:8081/api/orders', {
        headers: getAuthHeaders()
      });
      
      if (distributorsResponse.ok && ordersResponse.ok) {
        const distributors = await distributorsResponse.json();
        const orders = await ordersResponse.json();
        
        // Process distributors with order data
        const processedDistributors = distributors.map(distributor => {
          const distributorOrders = orders.filter(order => 
            order.distributorId === distributor.id || 
            order.customerName === distributor.companyName
          );
          
          const lastOrder = distributorOrders.length > 0 
            ? new Date(Math.max(...distributorOrders.map(o => new Date(o.orderDate || o.createdAt)))).toLocaleDateString()
            : 'No orders';
          
          const totalValue = distributorOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
          
          return {
            id: distributor.id,
            companyName: distributor.companyName || distributor.name || 'Unknown Company',
            managerName: distributor.managerName || distributor.contactPerson || 'Unknown Manager',
            managerAvatar: distributor.avatar || '/distributor.png',
            lastOrder,
            orderValue: `${totalValue.toLocaleString()}rwf`
          };
        });
        
        setDistributorsData(processedDistributors);
        
        // Calculate stats
        const totalContribution = processedDistributors.reduce((sum, dist) => {
          const value = parseInt(dist.orderValue.replace(/[^0-9]/g, '')) || 0;
          return sum + value;
        }, 0);
        
        setStats({
          totalDistributors: distributors.length,
          totalContribution,
          averageRevenue: distributors.length > 0 ? Math.round(totalContribution / distributors.length) : 0,
          loading: false
        });
      } else {
        console.warn('Failed to fetch distributors or orders');
        setDistributorsData([]);
        setStats(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching distributors:', error);
      setDistributorsData([]);
      setStats(prev => ({ ...prev, loading: false }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  const confirmDelete = async () => {
    if (!selectedDistributor) return;
    
    try {
      const response = await fetch(`http://localhost:8081/api/distributors/${selectedDistributor.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        // Refresh distributors list
        fetchDistributors();
      } else {
        console.error('Failed to delete distributor');
        alert('Failed to delete distributor. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting distributor:', error);
      alert('Error deleting distributor. Please try again.');
    }
    
    setShowDeleteModal(false);
    setSelectedDistributor(null);
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Distributor Management</h1>
          <p className="text-sm text-gray-500">Keep Track Of All Distributors</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today Distributors</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stats.loading ? 'Loading...' : stats.totalDistributors}
              </p>
              <p className="text-xs text-gray-500 mt-1">Update Sep 14, 2024</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Distributor Contribution</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stats.loading ? 'Loading...' : `${stats.totalContribution.toLocaleString()}rwf`}
              </p>
              <p className="text-xs text-gray-500 mt-1">Update July 14, 2024</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Revenue Per Account</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stats.loading ? 'Loading...' : `${stats.averageRevenue.toLocaleString()}rwf`}
              </p>
              <p className="text-xs text-gray-500 mt-1">Update May 14, 2024</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">+8.2%</span>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex justify-between items-center mb-6">
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
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddDistributor}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>ADD DISTRIBUTOR</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Distributors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  Loading distributors...
                </td>
              </tr>
            ) : distributorsData.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No distributors found
                </td>
              </tr>
            ) : (
              distributorsData
                .filter(distributor => 
                  distributor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  distributor.managerName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((distributor) => (
              <tr key={distributor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {distributor.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={distributor.managerAvatar} alt="" />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{distributor.managerName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {distributor.lastOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {distributor.orderValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleViewDistributor(distributor.id)}
                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeleteDistributor(distributor)}
                    className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Showing</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Distributor
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete {selectedDistributor?.companyName}? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributors;
