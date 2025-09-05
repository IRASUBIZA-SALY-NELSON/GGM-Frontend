import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StockManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchInventory = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('https://ggm-backend-h025.onrender.com/api/inventories', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const inventory = await response.json();
        
        // Process inventory data for display
        const processedProducts = inventory.map(item => ({
          id: item.id,
          name: item.productName || item.name || 'Unknown Product',
          category: item.category || 'Uncategorized',
          currentStock: item.currentStock || 0,
          unitPrice: item.unitPrice || 0,
          status: item.currentStock > (item.minStockLevel || 10) ? 'Active' : 'Low Stock',
          image: item.imageUrl || '/1.png',
          minStockLevel: item.minStockLevel || 10
        }));
        
        setProductsData(processedProducts);
      } else {
        console.warn('Failed to fetch inventory:', response.statusText);
        setProductsData([]);
      }
    } catch (error) {
      console.warn('Error fetching inventory:', error);
      setProductsData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId, newStock) => {
    try {
      const response = await fetch(`https://ggm-backend-h025.onrender.com/api/inventories/${productId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentStock: newStock })
      });
      
      if (response.ok) {
        // Refresh inventory after stock update
        fetchInventory();
      } else {
        console.warn('Failed to update stock:', response.statusText);
      }
    } catch (error) {
      console.warn('Error updating stock:', error);
    }
  };

  const handleManageClick = (productId) => {
    // For now, just log the action - could open a modal or navigate to detail page
    console.log('Managing product:', productId);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">01 Stock management</div>
            <h1 className="text-2xl font-semibold text-gray-900">Stock Management</h1>
            <p className="text-sm text-gray-500">Control the inventory</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              Loading inventory...
            </div>
          ) : productsData.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No products found in inventory
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsData.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Status Badge */}
                <div className="flex justify-end mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>

                {/* Product Image */}
                <div className="flex justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  
                  <div>
                    <span className="text-sm text-gray-500">Category:</span>
                    <div className="mt-1">
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded border">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">Current Stock:</span>
                    <div className="text-sm font-medium text-gray-900">{product.currentStock} units</div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">Unit Price:</span>
                    <div className="text-sm font-medium text-gray-900">{product.unitPrice} rwf</div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleManageClick(product.id)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Manage →
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing 1 to 6 of 24 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">4</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Actions Menu (Top Right) */}
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 hidden" id="actions-menu">
          <div className="text-xs text-gray-500 mb-2">Actions to be...</div>
          <div className="space-y-1">
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>👁️</span>
              <span>View Details</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>📊</span>
              <span>View History</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>📦</span>
              <span>Adjust Stock</span>
            </button>
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              <span>📄</span>
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
