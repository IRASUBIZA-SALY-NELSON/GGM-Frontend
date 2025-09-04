import React, { useState } from 'react';
import { Search, Bell, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardDistributor = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    address: '',
    country: '',
    postalCode: '',
    phoneCountry: '',
    email: '',
    phoneNumber: '',
    salesAssistant: '',
    createLogin: false,
    storeManagerEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.createLogin) {
      setShowInvitationModal(true);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleSaveDistributor = () => {
    setShowSuccessModal(false);
    navigate('/sales-manager/distributors');
  };

  const handleSendInvitation = () => {
    setShowInvitationModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex-1 p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <button 
              onClick={() => navigate('/sales-manager/distributors')}
              className="flex items-center space-x-1 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Onboard New Distributor</h1>
          <p className="text-sm text-gray-500">Enter the company details to create a new distributor account</p>
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

      {/* Company Type Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-end space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <span>Add Company Type</span>
          </button>
        </div>
        <div className="mt-4 flex space-x-4">
          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-600">LLC</div>
          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-600">Corporation</div>
          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-600">Sole Proprietorship</div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">New Distributor Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="AMACO CLOTHES LTD"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Company Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Company Type
                </label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">LLC</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="KK 120 KIMIHURURA"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">KIGALI</option>
                  <option value="rwanda">Rwanda</option>
                  <option value="uganda">Uganda</option>
                  <option value="kenya">Kenya</option>
                </select>
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Country
                </label>
                <select
                  name="phoneCountry"
                  value={formData.phoneCountry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">RWANDA</option>
                  <option value="rwanda">Rwanda</option>
                  <option value="uganda">Uganda</option>
                  <option value="kenya">Kenya</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Company@gmail.com"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+250 734 567 89"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Sales Assistant */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Sales Assistant
                </label>
                <select
                  name="salesAssistant"
                  value={formData.salesAssistant}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">John Liam</option>
                  <option value="john-liam">John Liam</option>
                  <option value="jane-doe">Jane Doe</option>
                  <option value="mike-smith">Mike Smith</option>
                </select>
              </div>
            </div>

            {/* Create Login Checkbox */}
            <div className="flex items-center space-x-3 pt-4">
              <input
                type="checkbox"
                id="createLogin"
                name="createLogin"
                checked={formData.createLogin}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="createLogin" className="text-sm font-medium text-gray-700">
                Create Login for Store Manager ?
              </label>
            </div>

            {/* Store Manager Email (conditional) */}
            {formData.createLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Manager Email
                </label>
                <input
                  type="email"
                  name="storeManagerEmail"
                  value={formData.storeManagerEmail}
                  onChange={handleInputChange}
                  placeholder="Company@gmail.com"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required={formData.createLogin}
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/sales-manager/distributors')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              {formData.createLogin ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send Invitation
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Save Distributor
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Store Manager Invitation Modal */}
      {showInvitationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <div className="text-4xl">🎉</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Store Manager will receive Invitation Via Email
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Store Manager invited successfully via email
            </p>
            <button
              onClick={handleSendInvitation}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Form
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <div className="text-4xl">✅</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Distributor Added Successfully
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              The new distributor has been added to your system
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDistributor}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Distributor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardDistributor;
