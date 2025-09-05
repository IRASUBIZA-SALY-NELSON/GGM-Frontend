import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import SubmitOrderModal from '../modals/SubmitOrderModal'
import SpecifyQuantityModal from '../modals/SpecifyQuantityModal'
import StoreManagerFilterModal from '../modals/StoreManagerFilterModal'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderCart, setOrderCart] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('https://ggm-backend-h025.onrender.com/api/products', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const productsData = await response.json();
        
        // Process products data for display
        const processedProducts = productsData.map(item => ({
          id: item.id,
          name: item.name || item.productName || 'Unknown Product',
          category: item.category || 'Uncategorized',
          currentStock: item.unit || 0,
          unitPrice: item.price || item.unitPrice || 0,
          image: item.imageUrl || item.image || '1.png',
          status: (item.unit || 0) > 0 ? 'Active' : 'Out of Stock',
          description: item.description || ''
        }));
        
        setProducts(processedProducts);
      } else {
        console.warn('Failed to fetch products:', response.statusText);
        setProducts([]);
      }
    } catch (error) {
      console.warn('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToOrder = (product) => {
    setSelectedProduct(product)
    setShowQuantityModal(true)
  }

  const handleAddToCart = (product, quantity) => {
    const existingItem = orderCart.find(item => item.id === product.id)
    if (existingItem) {
      setOrderCart(orderCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setOrderCart([...orderCart, { ...product, quantity }])
    }
    setShowQuantityModal(false)
  }

  const handleGoToOrderCart = () => {
    navigate('/store-manager/order-cart', { state: { orderItems: orderCart } })
  }

  const handleFilterApply = (filters) => {
    console.log('Applied filters:', filters)
    // Implement filter logic here
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Place Order</h1>
            <p className="text-sm text-gray-500">Browse and order products</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleGoToOrderCart}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Order Cart ({orderCart.length})</span>
            </button>
            
            <button 
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
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
            No products available for ordering
          </div>
        ) : (
          products.map((product, index) => (
          <div key={product.sku || product.id || index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={`/${product.image}`} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                product.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
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
              
              <button 
                onClick={() => handleAddToOrder(product)}
                disabled={product.status === 'Out of Stock'}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  product.status === 'Out of Stock' 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {product.status === 'Out of Stock' ? 'Out of Stock' : 'Add to Order'}
              </button>
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
            {'>'}
          </button>
        </div>
      </div>

      {/* Modals */}
      <StoreManagerFilterModal 
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilterApply}
      />

      <SpecifyQuantityModal 
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default PlaceOrder
