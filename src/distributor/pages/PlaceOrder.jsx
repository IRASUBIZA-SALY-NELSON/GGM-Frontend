import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api';

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await apiCall(API_ENDPOINTS.PRODUCTS);
      setProducts(productsData || []);
      console.log('✅ Products fetched for distributor:', productsData);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = item.unitCost || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Please add items to your cart before placing an order.');
      return;
    }

    try {
      setSubmitting(true);

      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Create the order with required fields
      const orderData = {
        number: `ORD-${Date.now()}`, // Generate unique order number
        level: 'L1', // Factory to Distributor level
        channel: 'WEB',
        currency: 'RWF',
        notes: 'Order placed by distributor through web portal'
      };

      const newOrder = await apiCall(API_ENDPOINTS.ORDERS, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(orderData)
      });

      // Create order lines for each cart item
      for (const item of cart) {
        const orderLineData = {
          product: {
            id: item.id
          },
          qty: item.quantity,
          unitPrice: item.unitCost || item.price || 0,
          discount: 0,
          tax: 0,
          notes: `${item.name} - Quantity: ${item.quantity}`
        };

        await apiCall(`${API_ENDPOINTS.ORDER_LINES}/${newOrder.id}`, {
          method: HTTP_METHODS.POST,
          body: JSON.stringify(orderLineData)
        });
      }

      setOrderSuccess(true);
      setCart([]);
      console.log('✅ Order placed successfully:', newOrder);
    } catch (error) {
      console.error('❌ Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setSubmitting(false);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Place Order</h1>
        <p className="text-gray-600">Select products and place your order</p>
      </div>

      {/* Success Message */}
      {orderSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Order placed successfully!</p>
              <p className="text-sm">Your order has been submitted and is pending approval.</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setOrderSuccess(false)}
                className="text-green-400 hover:text-green-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Available Products</h3>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No products found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || '/1.png'}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.category}</p>
                          <p className="text-sm font-semibold text-purple-600">
                            {(product.unitCost || product.price || 0).toLocaleString()} RWF
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 sticky top-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Order Cart</h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              </div>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg">
                        <img
                          src={item.image || '/1.png'}
                          alt={item.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="text-xs font-medium text-gray-900">{item.name}</h5>
                          <p className="text-xs text-gray-500">
                            {(item.unitCost || item.price || 0).toLocaleString()} RWF each
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-red-600 hover:text-red-800 ml-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-gray-900">Total Amount:</span>
                      <span className="text-lg font-bold text-purple-600">
                        {getTotalAmount().toLocaleString()} RWF
                      </span>
                    </div>
                    
                    <button
                      onClick={handlePlaceOrder}
                      disabled={submitting}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
