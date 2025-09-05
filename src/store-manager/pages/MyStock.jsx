import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ShoppingCart, MoreVertical, Package, Eye } from 'lucide-react'
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api'
import SpecifyQuantityModal from '../modals/SpecifyQuantityModal'
import RemoveProductModal from '../modals/RemoveProductModal'
import UpdateQuantityModal from '../modals/UpdateQuantityModal'

const MyStock = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showProductActions, setShowProductActions] = useState(null)
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const products = await apiCall(API_ENDPOINTS.PRODUCTS);
      
      // Process products data for display
      const processedProducts = products.map(item => {
        const currentStock = item.unit || 0;
        const minStockLevel = 5; // Default minimum stock level
        
        let status;
        if (currentStock === 0) {
          status = 'Out of Stock';
        } else if (currentStock <= minStockLevel) {
          status = 'Low Stock';
        } else {
          status = 'Active';
        }
        
        return {
          id: item.id, // Use actual database ID
          sku: item.sku,
          name: item.name || 'Unknown Product',
          description: item.description || '',
          category: item.category || 'Uncategorized',
          currentStock: currentStock,
          unitPrice: item.price || 0,
          image: '1.png', // Default static image
          status: status,
          minStockLevel: minStockLevel,
          isActive: item.isActive || false,
          barcode: item.barcode,
          weight: item.weight,
          size: item.size,
          code: item.code,
          attributes: item.attributes || {},
          deleted: item.deleted || false
        };
      });
        
        setProducts(processedProducts);
        console.log('✅ Products fetched successfully:', processedProducts);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReorderClick = (product) => {
    setSelectedProduct(product)
    setShowQuantityModal(true)
  }

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product)
    setShowRemoveModal(true)
  }

  const handleUpdateQuantity = (product) => {
    setSelectedProduct(product)
    setShowUpdateModal(true)
  }

  const handleQuantityUpdate = async (productId, newQuantity, reason = 'Manual adjustment') => {
    try {
      // Update product quantity directly in products table using ID
      const updateData = {
        unit: newQuantity  // Update the unit field which represents quantity
      };

      await apiCall(API_ENDPOINTS.PRODUCT_BY_ID(productId), {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify(updateData)
      });

      // Refresh products data
      fetchProducts();
      setShowUpdateModal(false);
      console.log('✅ Product quantity updated successfully');
    } catch (error) {
      console.error('❌ Error updating product quantity:', error);
      alert('Failed to update quantity: ' + error.message);
    }
  }

  const handleAddToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity }])
    }
    setShowQuantityModal(false)
  }

  const handleGoToReorderCart = () => {
    // Pass cart data through navigation state
    navigate('/store-manager/reorder-cart', { state: { cartItems: cart } })
  }


  const toggleProductActions = (productId) => {
    setShowProductActions(showProductActions === productId ? null : productId)
  }

  const handleViewHistory = (product) => {
    setShowProductActions(null)
    navigate('/store-manager/product-history')
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
            <p className="text-sm text-gray-500">Control the inventory</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleGoToReorderCart}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Reorder Cart ({cart.length})</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            No products found in inventory
          </div>
        ) : (
          products.map((product, index) => (
          <div key={product.id || `product-${index}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={`/${product.image}`} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                product.status === 'Active' ? 'bg-green-500' : 
                product.status === 'Low Stock' ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {product.status}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-purple-600">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Stock:</span>
                  <span>{product.currentStock} units</span>
                </div>
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span>{product.unitPrice} rwf</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {/* Primary Record Quantity Button */}
                <button 
                  onClick={() => handleUpdateQuantity(product)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Record Quantity</span>
                </button>
                
                {/* Secondary Actions Button */}
                <div className="relative">
                  <button 
                    onClick={() => toggleProductActions(product.id)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>More Actions</span>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                
                  {showProductActions === product.id && (
                    <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-2">
                        <button 
                          onClick={() => {
                            handleReorderClick(product)
                            setShowProductActions(null)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Package className="w-4 h-4" />
                          <span>Reorder</span>
                        </button>
                        <button 
                          onClick={() => handleViewHistory(product)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View History</span>
                        </button>
                      </div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Showing</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-500">Showing 1 to 10 out of 50 records</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            {'<'}
          </button>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            3
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            4
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            &gt;
          </button>
        </div>
      </div>

      {/* Modals */}
      <SpecifyQuantityModal 
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />

      <RemoveProductModal 
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        product={selectedProduct}
      />

      <UpdateQuantityModal 
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        product={selectedProduct}
        onUpdate={handleQuantityUpdate}
      />
    </div>
  )
}

export default MyStock
