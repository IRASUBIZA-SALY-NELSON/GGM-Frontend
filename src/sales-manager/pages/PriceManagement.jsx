import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api';

const PriceManagement = () => {
  const [priceLists, setPriceLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPriceList, setNewPriceList] = useState({
    name: '',
    description: '',
    effectiveDate: '',
    expiryDate: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [priceListsData, productsData] = await Promise.all([
        apiCall(API_ENDPOINTS.PRICE_LISTS),
        apiCall(API_ENDPOINTS.PRODUCTS)
      ]);
      
      setPriceLists(priceListsData || []);
      setProducts(productsData || []);
      console.log('✅ Price lists and products fetched successfully');
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePriceList = async (e) => {
    e.preventDefault();
    try {
      const newList = await apiCall(API_ENDPOINTS.PRICE_LISTS, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(newPriceList)
      });
      
      setPriceLists(prev => [...prev, newList]);
      setShowAddModal(false);
      setNewPriceList({ name: '', description: '', effectiveDate: '', expiryDate: '' });
      console.log('✅ Price list created successfully');
    } catch (error) {
      console.error('❌ Error creating price list:', error);
      alert('Failed to create price list: ' + error.message);
    }
  };

  const handleUpdatePrice = async (priceListId, productId, newPrice) => {
    try {
      const priceListItem = {
        priceListId,
        productId,
        price: parseFloat(newPrice)
      };

      await apiCall(API_ENDPOINTS.PRICE_LIST_ITEMS, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(priceListItem)
      });

      setEditingPrice(null);
      fetchData(); // Refresh data
      console.log('✅ Price updated successfully');
    } catch (error) {
      console.error('❌ Error updating price:', error);
      alert('Failed to update price: ' + error.message);
    }
  };

  const handleDeletePriceList = async (priceListId) => {
    if (!confirm('Are you sure you want to delete this price list?')) return;
    
    try {
      await apiCall(API_ENDPOINTS.PRICE_LIST_BY_ID(priceListId), {
        method: HTTP_METHODS.DELETE
      });
      
      setPriceLists(prev => prev.filter(list => list.id !== priceListId));
      console.log('✅ Price list deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting price list:', error);
      alert('Failed to delete price list: ' + error.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Price Management</h1>
        <p className="text-gray-600">Manage product prices and price lists</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>New Price List</span>
          </button>
        </div>
      </div>

      {/* Price Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {priceLists.map((priceList) => (
          <div key={priceList.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{priceList.name}</h3>
                <p className="text-sm text-gray-600">{priceList.description}</p>
              </div>
              <button
                onClick={() => handleDeletePriceList(priceList.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="text-xs text-gray-500">
              <p>Effective: {priceList.effectiveDate ? new Date(priceList.effectiveDate).toLocaleDateString() : 'N/A'}</p>
              <p>Expires: {priceList.expiryDate ? new Date(priceList.expiryDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Products Price Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Product Prices</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.image || '/1.png'}
                          alt={product.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4">
                      {editingPrice === product.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            defaultValue={product.unitCost || product.price || 0}
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdatePrice(priceLists[0]?.id, product.id, e.target.value);
                              }
                            }}
                            id={`price-${product.id}`}
                          />
                          <button
                            onClick={() => {
                              const newPrice = document.getElementById(`price-${product.id}`).value;
                              handleUpdatePrice(priceLists[0]?.id, product.id, newPrice);
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingPrice(null)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          {(product.unitCost || product.price || 0).toLocaleString()} RWF
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingPrice !== product.id && (
                        <button
                          onClick={() => setEditingPrice(product.id)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Price List Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Price List</h3>
            
            <form onSubmit={handleCreatePriceList}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newPriceList.name}
                    onChange={(e) => setNewPriceList(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newPriceList.description}
                    onChange={(e) => setNewPriceList(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                  <input
                    type="date"
                    value={newPriceList.effectiveDate}
                    onChange={(e) => setNewPriceList(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newPriceList.expiryDate}
                    onChange={(e) => setNewPriceList(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Price List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceManagement;
