import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const UpdateQuantityModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [quantity, setQuantity] = useState(product?.currentStock || 0)

  // Update quantity when product changes
  useEffect(() => {
    if (product) {
      setQuantity(product.currentStock || 0)
    }
  }, [product])

  const handleUpdate = () => {
    console.log('Updating quantity for:', product?.name, 'to:', quantity)
    if (onUpdate && product) {
      onUpdate(product.id, quantity)
    } else {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Update Quantity For {product?.name || 'Product'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value={0}>0 units</option>
              <option value={5}>5 units</option>
              <option value={10}>10 units</option>
              <option value={15}>15 units</option>
              <option value={20}>20 units</option>
              <option value={25}>25 units</option>
              <option value={30}>30 units</option>
              <option value={50}>50 units</option>
              <option value={100}>100 units</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateQuantityModal
