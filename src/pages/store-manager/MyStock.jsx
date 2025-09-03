import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ShoppingCart, MoreVertical, Package, Eye } from 'lucide-react'
import SpecifyQuantityModal from '../../components/modals/SpecifyQuantityModal'
import RemoveProductModal from '../../components/modals/RemoveProductModal'
import UpdateQuantityModal from '../../components/modals/UpdateQuantityModal'

const MyStock = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showActionsDropdown, setShowActionsDropdown] = useState(null)
  const [showProductActions, setShowProductActions] = useState(null)
  const [cart, setCart] = useState([])

  const products = [
    { id: 1, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 120, unitPrice: 4500, image: '1.png', status: 'Active' },
    { id: 2, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 135, unitPrice: 5200, image: '2.png', status: 'Active' },
    { id: 3, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 89, unitPrice: 4800, image: '1.png', status: 'Active' },
    { id: 4, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 156, unitPrice: 5500, image: '2.png', status: 'Active' },
    { id: 5, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 142, unitPrice: 4900, image: '1.png', status: 'Active' },
    { id: 6, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 98, unitPrice: 5100, image: '2.png', status: 'Active' },
  ]

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

  const toggleActionsDropdown = (productId) => {
    setShowActionsDropdown(showActionsDropdown === productId ? null : productId)
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
            <p className="text-sm text-gray-500">Control the inventory</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
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
            
            {/* Actions Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleActionsDropdown('header')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <span>Actions</span>
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showActionsDropdown === 'header' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Reorder</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>View History</span>
                    </button>
                  </div>
                </div>
              )}
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
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={`/${product.image}`} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
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
              
              <div className="relative">
                <button 
                  onClick={() => toggleProductActions(product.id)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Actions</span>
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
        ))}
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
      />
    </div>
  )
}

export default MyStock
