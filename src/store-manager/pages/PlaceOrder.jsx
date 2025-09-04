import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import SubmitOrderModal from '../modals/SubmitOrderModal'
import SpecifyQuantityModal from '../modals/SpecifyQuantityModal'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showQuantityModal, setShowQuantityModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderCart, setOrderCart] = useState([])

  const products = [
    { id: 1, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 120, unitPrice: 6000, image: '1.png', status: 'Active' },
    { id: 2, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 135, unitPrice: 6000, image: '2.png', status: 'Active' },
    { id: 3, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 89, unitPrice: 6000, image: '1.png', status: 'Active' },
    { id: 4, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 156, unitPrice: 6000, image: '2.png', status: 'Active' },
    { id: 5, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 142, unitPrice: 6000, image: '1.png', status: 'Active' },
    { id: 6, name: 'Skinny Jeans', category: 'Casual Wear', currentStock: 98, unitPrice: 6000, image: '2.png', status: 'Active' },
  ]

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
              
              <button 
                onClick={() => handleAddToOrder(product)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add to Order
              </button>
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
