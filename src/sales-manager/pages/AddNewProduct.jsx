import React, { useState } from 'react';
import { Search, Bell, ChevronDown, ArrowLeft, Upload, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, apiCall, HTTP_METHODS } from '../../config/api';

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newUnit, setNewUnit] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productCategory: '',
    unitOfMeasure: '',
    beginningQuantity: '',
    minimumQuantity: '',
    unitCost: '',
    productStatus: 'ACTIVE'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get current user's tenant from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const productData = {
        sku: `SKU-${Date.now()}`, // Generate unique SKU
        name: formData.productName,
        description: formData.productDescription,
        category: formData.productCategory || 'CASUAL_PANTS', // Default to valid enum value
        unit: parseInt(formData.beginningQuantity) || 0, // Use beginning quantity from form
        price: parseFloat(formData.unitCost) || 0,
        isActive: formData.productStatus === 'ACTIVE'
        // Omit tenant since it's now nullable
      };

      const newProduct = await apiCall(API_ENDPOINTS.PRODUCTS, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(productData)
      });

      console.log('✅ Product created successfully:', newProduct);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('❌ Error creating product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = () => {
    setShowSuccessModal(false);
    navigate('/sales-manager/pricing-catalog');
  };

  const handleAddUnit = () => {
    // Handle add unit logic here
    setShowAddUnitModal(false);
    setNewUnit('');
  };

  const handleAddCategory = () => {
    // Handle add category logic here
    setShowAddCategoryModal(false);
    setNewCategory('');
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <button 
              onClick={() => navigate('/sales-manager/pricing-catalog')}
              className="flex items-center space-x-1 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500">Simply fill in the form below to add a new product to the catalog</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
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

      {/* Dropdown Menus */}
      <div className="flex justify-end items-center space-x-4 mb-6">
        <div className="relative">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Product Status Drop...</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Product Unit of...</span>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Packet</option>
            <option>Box</option>
            <option>Kilogram</option>
            <option>Meter</option>
          </select>
          <button
            onClick={() => setShowAddUnitModal(true)}
            className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Unit</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Product Categories...</span>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Casual Wear</option>
            <option>Formal Wear</option>
            <option>Sportswear</option>
          </select>
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">New Product Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Product Image Here
              </label>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <p className="text-sm text-gray-600">Upload Product Image Here</p>
                <input type="file" className="hidden" accept="image/*" />
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Choose File
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Jeans AWG"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Product Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="A soft 100% cotton T-shirt designed for all-day comfort. Available in multiple colors: lightweight, and breathable - perfect for casual outings or everyday wear."
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Product Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Product Category
                </label>
                <select
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="ACTIVEWEAR_PANTS">Activewear Pants</option>
                  <option value="CASUAL_PANTS">Casual Pants</option>
                </select>
              </div>

              {/* Unit of Measure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Unit of Measure
                </label>
                <select
                  name="unitOfMeasure"
                  value={formData.unitOfMeasure}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Packet</option>
                  <option value="packet">Packet</option>
                  <option value="box">Box</option>
                  <option value="kilogram">Kilogram</option>
                  <option value="meter">Meter</option>
                </select>
              </div>

              {/* Beginning Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beginning Quantity
                </label>
                <input
                  type="number"
                  name="beginningQuantity"
                  value={formData.beginningQuantity}
                  onChange={handleInputChange}
                  placeholder="120 units"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Minimum Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Quantity
                </label>
                <input
                  type="number"
                  name="minimumQuantity"
                  value={formData.minimumQuantity}
                  onChange={handleInputChange}
                  placeholder="12 units"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Unit Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Cost
                </label>
                <input
                  type="text"
                  name="unitCost"
                  value={formData.unitCost}
                  onChange={handleInputChange}
                  placeholder="12,000 rwf"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Product Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Product Status
                </label>
                <select
                  name="productStatus"
                  value={formData.productStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Active</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/sales-manager/pricing-catalog')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <div className="text-4xl">✅</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Product Added Successfully
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The new product has been added to your catalog
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Product
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

export default AddNewProduct;
