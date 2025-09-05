import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Filter, Plus, MoreVertical, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api';

const PricingCatalog = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newUnit, setNewUnit] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showActionsDropdown, setShowActionsDropdown] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'in stock': case 'active': return 'text-green-600 bg-green-100';
      case 'on sale': return 'text-orange-600 bg-orange-100';
      case 'out of stock': case 'out stock': return 'text-red-600 bg-red-100';
      case 'low stock': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const products = await apiCall(API_ENDPOINTS.PRODUCTS);
      
      const processedProducts = products.map(product => {
        const stock = product.unit || 0;
        let status = 'Active';
        if (stock === 0) status = 'Out of Stock';
          else if (stock < 10) status = 'Low Stock';
          else if (product.onSale) status = 'On Sale';
          else if (stock > 0) status = 'In Stock';
          
          return {
            id: product.id,
            name: product.name || product.productName || 'Unknown Product',
            category: product.category || product.categoryName || 'Uncategorized',
            currentStock: `${stock} units`,
            unitPrice: `${(product.price || product.unitPrice || 0).toLocaleString()}rwf`,
            status: status,
            statusColor: getStatusColor(status),
            image: product.image || product.imageUrl || '/1.png'
          };
        });
        
        setProductsData(processedProducts);
        console.log('✅ Products fetched successfully:', processedProducts);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setProductsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/sales-manager/pricing-catalog/add-new');
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
    setShowActionsDropdown(null);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    
    try {
      await apiCall(API_ENDPOINTS.PRODUCT_BY_ID(selectedProduct.id), {
        method: HTTP_METHODS.DELETE
      });
      
      // Refresh products list
      fetchProducts();
      console.log('✅ Product deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      alert('Error deleting product: ' + error.message);
    }
    
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const handleAddUnit = async () => {
    if (!newUnit.trim()) return;
    
    try {
      const response = await fetch('https://ggm-backend-h025.onrender.com/api/units', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newUnit.trim() })
      });
      
      if (response.ok) {
        alert('Unit added successfully!');
      } else {
        alert('Failed to add unit. Please try again.');
      }
    } catch (error) {
      console.error('Error adding unit:', error);
      alert('Error adding unit. Please try again.');
    }
    
    setShowAddUnitModal(false);
    setNewUnit('');
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const response = await fetch('https://ggm-backend-h025.onrender.com/api/categories', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newCategory.trim() })
      });
      
      if (response.ok) {
        alert('Category added successfully!');
        // Refresh products to show updated categories
        fetchProducts();
      } else {
        alert('Failed to add category. Please try again.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category. Please try again.');
    }
    
    setShowAddCategoryModal(false);
    setNewCategory('');
  };

  const toggleActionsDropdown = (productId) => {
    setShowActionsDropdown(showActionsDropdown === productId ? null : productId);
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pricing & Catalog Management</h1>
          <p className="text-sm text-gray-500">Keep Track of Product's Catalog & their prices</p>
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

      {/* Action Buttons */}
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
            onClick={handleAddProduct}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Dropdown Menus */}
      <div className="flex justify-end items-center space-x-4 mb-6">
        <div className="relative">
          <button
            onClick={() => setShowActionsDropdown('actions')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span>Actions</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {showActionsDropdown === 'actions' && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  setShowActionsDropdown(null);
                  // Handle update product action
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Update Product</span>
              </button>
              <button
                onClick={() => {
                  setShowActionsDropdown(null);
                  // Handle remove action
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading products...
          </div>
        ) : productsData.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found
          </div>
        ) : (
          productsData
            .filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product, index) => (
          <div key={product.sku || product.id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${product.statusColor}`}>
                {product.status}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-purple-600 bg-purple-100 px-2 py-1 rounded text-xs">
                    {product.category}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Stock:</span>
                  <span className="text-gray-900">{product.currentStock}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Unit Price:</span>
                  <span className="text-gray-900">{product.unitPrice}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                  Details
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => toggleActionsDropdown(product.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {showActionsDropdown === product.id && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
            ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
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

      {/* Delete Product Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <div className="text-red-600 text-2xl">⚠</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to delete this Product?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The Product will be deleted successfully.
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
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Unit Modal */}
      {showAddUnitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Unit Of Measure
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="Meter"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddUnitModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUnit}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Unit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Product Category
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Sportswear"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCatalog;
