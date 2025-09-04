import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Skinny Jeans',
      category: 'Jeans',
      categoryColor: 'bg-blue-100 text-blue-800',
      currentStock: '150 units',
      unitPrice: '5,000 rwf',
      status: 'In Stock',
      statusColor: 'bg-green-100 text-green-800',
      image: '/1.png'
    },
    {
      id: 2,
      name: 'Skinny Jeans',
      category: 'Jeans',
      categoryColor: 'bg-blue-100 text-blue-800',
      currentStock: '150 units',
      unitPrice: '5,000 rwf',
      status: 'Low Stock',
      statusColor: 'bg-yellow-100 text-yellow-800',
      image: '/2.png'
    },
    {
      id: 3,
      name: 'Skinny Jeans',
      category: 'Jeans',
      categoryColor: 'bg-blue-100 text-blue-800',
      currentStock: '150 units',
      unitPrice: '5,000 rwf',
      status: 'Out Stock',
      statusColor: 'bg-red-100 text-red-800',
      image: '/1.png'
    },
    {
      id: 4,
      name: 'Skinny Jeans',
      category: 'Jeans',
      categoryColor: 'bg-blue-100 text-blue-800',
      currentStock: '150 units',
      unitPrice: '5,000 rwf',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      image: '/2.png'
    },
    {
      id: 5,
      name: 'Skinny Jeans',
      category: 'Jeans',
      categoryColor: 'bg-blue-100 text-blue-800',
      currentStock: '150 units',
      unitPrice: '5,000 rwf',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      image: '/1.png'
    },
    {
      id: 6,
      name: 'Skinny Jeans',
      category: 'Jeans',
      categoryColor: 'bg-blue-100 text-blue-800',
      currentStock: '150 units',
      unitPrice: '5,000 rwf',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      image: '/2.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Products Management</h1>
            <p className="text-sm text-gray-500">Keep Track of Products Catalog to offer to distributors</p>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <img 
                src="/distributor.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
            />
          </div>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.statusColor}`}>
                    {product.status}
                  </span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.categoryColor}`}>
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Stock:</span>
                    <span className="text-sm text-gray-900">{product.currentStock}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Unit Price:</span>
                    <span className="text-sm text-gray-900">{product.unitPrice}</span>
                  </div>
                </div>
                
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
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
      </div>
    </div>
  );
};

export default Products;
