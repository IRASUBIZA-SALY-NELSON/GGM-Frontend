import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, ArrowLeft, Trash2, Edit3, Filter } from 'lucide-react'
import RemoveProductModal from '../../components/modals/RemoveProductModal'
import UpdateQuantityModal from '../../components/modals/UpdateQuantityModal'
import SubmitOrderModal from '../../components/modals/SubmitOrderModal'

const ReorderCart = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // Get cart items from navigation state or use default
    if (location.state?.cartItems && location.state.cartItems.length > 0) {
      console.log('Using cart items from navigation:', location.state.cartItems)
      setCartItems(location.state.cartItems)
    } else {
      // Default cart items if no state passed
      console.log('Using default cart items')
      const defaultItems = [
        { id: 1, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 120, unitPrice: 4500, quantity: 2, status: 'Active', image: '1.png' },
        { id: 2, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 135, unitPrice: 5200, quantity: 1, status: 'Active', image: '2.png' },
        { id: 3, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 89, unitPrice: 4800, quantity: 3, status: 'Active', image: '1.png' },
        { id: 4, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 156, unitPrice: 5500, quantity: 1, status: 'Active', image: '2.png' },
        { id: 5, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 142, unitPrice: 4900, quantity: 2, status: 'Active', image: '1.png' },
        { id: 6, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 98, unitPrice: 5100, quantity: 4, status: 'Active', image: '2.png' },
      ]
      setCartItems(defaultItems)
      console.log('Set default items:', defaultItems)
    }
  }, [location.state])

  const handleBackToMyStock = () => {
    navigate('/store-manager/my-stock')
  }

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product)
    setShowRemoveModal(true)
  }

  const handleUpdateQuantity = (product) => {
    setSelectedProduct(product)
    setShowUpdateModal(true)
  }

  const handleSubmitOrder = () => {
    setShowSubmitModal(true)
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
    setShowRemoveModal(false)
  }

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ))
    setShowUpdateModal(false)
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToMyStock}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
              <p className="text-sm text-gray-500">My Stock > Reorder Cart</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
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
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {console.log('Rendering cartItems:', cartItems)}
        {cartItems.length === 0 && (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">No items in cart</p>
          </div>
        )}
        {cartItems.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={`/${product.image || '1.png'}`} 
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
                <div className="flex justify-between font-medium">
                  <span>Order Qty:</span>
                  <span className="text-purple-600">{product.quantity} units</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => handleUpdateQuantity(product)}
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleRemoveProduct(product)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Showing</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-500">Showing 1 to {cartItems.length} out of {cartItems.length} records</span>
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

      {/* Submit Order Button */}
      <div className="flex justify-center">
        <div className="flex space-x-4">
          <button 
            onClick={handleBackToMyStock}
            className="px-8 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmitOrder}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Submit Order
          </button>
        </div>
      </div>

      {/* Modals */}
      <RemoveProductModal 
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        product={selectedProduct}
      />

      <SubmitOrderModal 
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
      />

      <UpdateQuantityModal 
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        product={selectedProduct}
      />
    </div>
  )
}

export default ReorderCart
