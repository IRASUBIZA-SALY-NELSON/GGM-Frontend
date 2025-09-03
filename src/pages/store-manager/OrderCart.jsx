import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, ArrowLeft, Filter, MoreVertical } from 'lucide-react'
import UpdateOrderModal from '../../components/modals/UpdateOrderModal'
import RemoveProductModal from '../../components/modals/RemoveProductModal'

const OrderCart = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderItems, setOrderItems] = useState([])
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showActionsDropdown, setShowActionsDropdown] = useState(null)

  useEffect(() => {
    if (location.state?.orderItems && location.state.orderItems.length > 0) {
      setOrderItems(location.state.orderItems)
    } else {
      // Default order items if no state passed
      setOrderItems([
        { id: 1, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 120, unitPrice: 6000, quantity: 2, status: 'Active', image: '1.png' },
        { id: 2, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 135, unitPrice: 6000, quantity: 1, status: 'Active', image: '2.png' },
        { id: 3, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 89, unitPrice: 6000, quantity: 3, status: 'Active', image: '1.png' },
        { id: 4, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 156, unitPrice: 6000, quantity: 1, status: 'Active', image: '2.png' },
        { id: 5, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 142, unitPrice: 6000, quantity: 2, status: 'Active', image: '1.png' },
        { id: 6, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 98, unitPrice: 6000, quantity: 4, status: 'Active', image: '2.png' },
      ])
    }
  }, [location.state])

  const handleBackToPlaceOrder = () => {
    navigate('/store-manager/place-order')
  }

  const handleUpdateOrder = (product) => {
    setSelectedProduct(product)
    setShowUpdateModal(true)
    setShowActionsDropdown(null)
  }

  const handleRemoveProduct = (product) => {
    setSelectedProduct(product)
    setShowRemoveModal(true)
    setShowActionsDropdown(null)
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    setOrderItems(orderItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ))
    setShowUpdateModal(false)
  }

  const handleRemoveFromCart = (productId) => {
    setOrderItems(orderItems.filter(item => item.id !== productId))
    setShowRemoveModal(false)
  }

  const handleSubmitOrder = () => {
    console.log('Submitting order:', orderItems)
    // Add order submission logic here
  }

  const toggleActionsDropdown = (productId) => {
    setShowActionsDropdown(showActionsDropdown === productId ? null : productId)
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToPlaceOrder}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Place Order</h1>
              <p className="text-sm text-gray-500">Place order > Order Cart</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
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
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Update Order
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Remove
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
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {orderItems.map((product) => (
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
                <div className="flex justify-between font-medium">
                  <span>Order Qty:</span>
                  <span className="text-purple-600">{product.quantity} units</span>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => toggleActionsDropdown(product.id)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Actions</span>
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {showActionsDropdown === product.id && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      <button 
                        onClick={() => handleUpdateOrder(product)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Update Order
                      </button>
                      <button 
                        onClick={() => handleRemoveProduct(product)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Remove
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Showing</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-500">Showing 1 to {orderItems.length} out of {orderItems.length} records</span>
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
            onClick={handleBackToPlaceOrder}
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
      <UpdateOrderModal 
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        product={selectedProduct}
        onUpdate={handleUpdateQuantity}
      />

      <RemoveProductModal 
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        product={selectedProduct}
        onRemove={handleRemoveFromCart}
      />
    </div>
  )
}

export default OrderCart
