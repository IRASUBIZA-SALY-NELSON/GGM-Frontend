import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Building2 } from 'lucide-react'
import toast from 'react-hot-toast'

const TenantRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    companyCode: '',
    companyDescription: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    gender: '',
    agreeToTerms: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    const required = ['companyName', 'companyCode', 'companyDescription', 'email', 'firstName', 'lastName', 'password', 'gender']
    return required.every(field => formData[field] && formData[field].trim() !== '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🚀 TENANT REGISTRATION STARTED')
    console.log('📝 Form Data:', formData)
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields')
      return
    }

    console.log('Password:', JSON.stringify(formData.password))
    console.log('Confirm:', JSON.stringify(formData.confirmPassword))

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setLoading(true)

    try {
      const apiData = {
        companyName: formData.companyName,
        companyCode: formData.companyCode,
        companyDescription: formData.companyDescription,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender
      }
      
      const response = await fetch('https://ggm-backend-h025.onrender.com/api/tenants/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      })

      if (response.ok) {
        const result = await response.json()
        toast.success('Tenant registration successful!')
        navigate('/auth/tenant-success', { 
          state: { 
            tenantId: result.id || 'Generated', 
            companyName: formData.companyName 
          } 
        })
      } else {
        const errorText = await response.text()
        console.log('❌ Error Response:', errorText)
        let errorMessage = 'Registration failed'
        try {
          const error = JSON.parse(errorText)
          console.log('📄 Parsed Error:', error)
          errorMessage = error.message || error.error || errorMessage
        } catch {
          errorMessage = errorText || errorMessage
        }
        console.log('🚨 Final Error:', errorMessage)
        toast.error(errorMessage)
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => (
    <div className="space-y-4">
      {/* Company Name */}
      <div>
        <input
          name="companyName"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Company Name *"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>

      {/* Company Code */}
      <div>
        <input
          name="companyCode"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Company Code *"
          value={formData.companyCode}
          onChange={handleInputChange}
        />
      </div>

      {/* Company Description */}
      <div>
        <textarea
          name="companyDescription"
          required
          rows={3}
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm resize-none"
          placeholder="Company Description *"
          value={formData.companyDescription}
          onChange={handleInputChange}
        />
      </div>

      {/* Admin User Info */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="First Name *"
          value={formData.firstName}
          onChange={handleInputChange}
        />

        <input
          name="lastName"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Last Name *"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          type="email"
          required
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      {/* Gender */}
      <div>
        <select
          name="gender"
          required
          className="appearance-none relative block w-full px-3 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender *</option>
          {genderOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Password */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          className="appearance-none relative block w-full px-3 py-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Password *"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          className="appearance-none relative block w-full px-3 py-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Confirm Password *"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
        </button>
      </div>

      {/* Terms */}
      <div className="flex items-center">
        <input
          id="agreeToTerms"
          name="agreeToTerms"
          type="checkbox"
          required
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
        />
        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
          I agree to the <Link to="/terms" className="text-purple-600">Terms</Link> and <Link to="/privacy" className="text-purple-600">Privacy Policy</Link> *
        </label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center flex items-center justify-center">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">GGM</span>
          </div>
          <h2 className="ml-3 text-3xl font-bold text-gray-900">GGM</h2>
        </div>

        {/* Title */}
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Tenant Registration</h2>
          <p className="mt-2 text-gray-600">Register your company and create admin account</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {renderForm()}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {loading ? 'Creating Tenant...' : 'Create Tenant Account'}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">Already have a tenant account? </span>
            <Link to="/auth/login" className="font-medium text-purple-600 hover:text-purple-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TenantRegister
