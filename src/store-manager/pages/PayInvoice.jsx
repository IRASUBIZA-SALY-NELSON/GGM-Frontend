import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CreditCard, Check } from 'lucide-react'

const PayInvoice = () => {
  const navigate = useNavigate()
  const { invoiceId } = useParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa')
  const [formData, setFormData] = useState({
    name: 'Robert Allen',
    expiration: '10/12/2025',
    cardNumber: '1234 5678 9039',
    cvv: ''
  })

  const handleGoBack = () => {
    navigate('/store-manager/billing')
  }

  const handleStepOne = () => {
    setCurrentStep(2)
  }

  const handleStepTwo = () => {
    setCurrentStep(3)
  }

  const handleContinue = () => {
    navigate('/store-manager/billing')
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
          </div>
          <div className={`w-16 h-0.5 ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        </div>
        
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
          </div>
          <div className={`w-16 h-0.5 ${currentStep > 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        </div>
        
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'
        }`}>
          3
        </div>
      </div>
    </div>
  )

  const renderStepOne = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Payment Method</h2>
      
      <div className="space-y-4 mb-8">
        {/* VISA */}
        <div 
          onClick={() => setSelectedPaymentMethod('visa')}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedPaymentMethod === 'visa' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">**** **** **** 7895</p>
                <p className="text-sm text-gray-500">Expires 10/27 • Default</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedPaymentMethod === 'visa' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
            }`}>
              {selectedPaymentMethod === 'visa' && (
                <div className="w-full h-full rounded-full bg-purple-500"></div>
              )}
            </div>
          </div>
        </div>

        {/* PayPal */}
        <div 
          onClick={() => setSelectedPaymentMethod('paypal')}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedPaymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">PayPal</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">**** **** **** 7895</p>
                <p className="text-sm text-gray-500">Expires 10/27 • Default</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedPaymentMethod === 'paypal' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
            }`}>
              {selectedPaymentMethod === 'paypal' && (
                <div className="w-full h-full rounded-full bg-purple-500"></div>
              )}
            </div>
          </div>
        </div>

        {/* Mastercard */}
        <div 
          onClick={() => setSelectedPaymentMethod('mastercard')}
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedPaymentMethod === 'mastercard' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">MC</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">**** **** **** 7895</p>
                <p className="text-sm text-gray-500">Expires 10/27 • Default</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedPaymentMethod === 'mastercard' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
            }`}>
              {selectedPaymentMethod === 'mastercard' && (
                <div className="w-full h-full rounded-full bg-purple-500"></div>
              )}
            </div>
          </div>
        </div>

        {/* Add Payment Method */}
        <div className="p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <span className="text-purple-600 font-medium">Add Payment Method</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleStepOne}
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
      >
        Submit
      </button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-12 bg-blue-600 rounded mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-bold text-lg">VISA</span>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiration</label>
            <input
              type="text"
              value={formData.expiration}
              onChange={(e) => setFormData({...formData, expiration: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => setFormData({...formData, cvv: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setCurrentStep(1)}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button 
          onClick={handleStepTwo}
          className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  )

  const renderStepThree = () => (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-white" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment Successful!</h2>
      
      <button 
        onClick={handleContinue}
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
      >
        Continue
      </button>
    </div>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
              <p className="text-sm text-gray-500">All Invoices &gt; Invoice ID: {invoiceId} &gt; Pay Invoice</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <img 
                src="/1.png" 
                alt="Robert Allen" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Robert Allen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
        {/* Payment Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay Invoice</h2>
          <div className="flex justify-between items-center max-w-md mx-auto">
            <div>
              <p className="text-sm text-gray-500">Invoice Number:</p>
              <p className="font-medium text-gray-900">{invoiceId || '1222554567891ED'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Due:</p>
              <p className="font-medium text-gray-900">100,000 rwf</p>
            </div>
          </div>
        </div>

        {/* Steps Header */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">STEPS</h3>
          {renderStepIndicator()}
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStepOne()}
        {currentStep === 2 && renderStepTwo()}
        {currentStep === 3 && renderStepThree()}
      </div>
    </div>
  )
}

export default PayInvoice
