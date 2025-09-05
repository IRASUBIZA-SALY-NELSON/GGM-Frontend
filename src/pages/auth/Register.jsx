import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Users, Building2, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    gender: '',
    tenant: {}
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tenantInfo, setTenantInfo] = useState(null)

  const roles = [
    { value: 'ADMIN', label: 'System Admin', description: 'Full system access and user management' },
    { value: 'STORE_MANAGER', label: 'Store Manager', description: 'Store operations and inventory management' },
    { value: 'SALES_MANAGER', label: 'Sales Manager', description: 'Sales team and customer management' },
    { value: 'MANAGER', label: 'Warehouse Manager', description: 'Inventory and warehouse operations' },
    { value: 'ACCOUNTANT', label: 'Accountant', description: 'Financial management and reporting' },
    { value: 'DISTRIBUTOR', label: 'Distributor', description: 'Product distribution and supply chain' },
    { value: 'USER', label: 'Regular User', description: 'Basic system access' }
  ]

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🚀 Form submission started')
    console.log('📝 Form Data:', formData)
    
    // Basic field validation
    if (!formData.firstName.trim()) {
      toast.error('First name is required')
      return
    }
    
    if (!formData.lastName.trim()) {
      toast.error('Last name is required')
      return
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }
    
    if (!formData.password) {
      toast.error('Password is required')
      return
    }
    
    if (!formData.gender) {
      toast.error('Please select a gender')
      return
    }
    
    if (!formData.role) {
      toast.error('Please select a role')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      console.log('Password:', formData.password)
      console.log('Confirm:', formData.confirmPassword)
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    console.log('✅ All validations passed, making API call')
    setLoading(true)

    try {
      // Prepare data for API call
      const apiData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        gender: formData.gender
      }
      
      // Only include tenant if it has valid data
      if (formData.tenant && Object.keys(formData.tenant).length > 0 && formData.tenant.id) {
        apiData.tenant = formData.tenant
      }

      console.log('📤 Sending API request:', apiData)
      
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })
      
      console.log('📥 API Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Registration successful:', result)
        toast.success('User created successfully!')
        
        // Navigate to dashboard based on role
        const dashboardRoutes = {
          'ADMIN': '/admin/dashboard',
          'STORE_MANAGER': '/store-manager/dashboard', 
          'SALES_MANAGER': '/sales-manager/dashboard',
          'MANAGER': '/warehouse-manager/dashboard',
          'ACCOUNTANT': '/accountant/dashboard',
          'DISTRIBUTOR': '/distributor/dashboard',
          'USER': '/dashboard'
        }
        
        const dashboardRoute = dashboardRoutes[formData.role] || '/dashboard'
        console.log('🏠 Navigating to:', dashboardRoute)
        
        // Store user info in localStorage for persistence
        localStorage.setItem('userInfo', JSON.stringify({
          userId: result.id || result.userId,
          userName: `${formData.firstName} ${formData.lastName}`,
          role: formData.role,
          email: formData.email
        }))
        
        navigate(dashboardRoute, { 
          state: { 
            userId: result.id || result.userId, 
            userName: `${formData.firstName} ${formData.lastName}`,
            role: formData.role,
            userInfo: result
          },
          replace: true
        })
      } else {
        const error = await response.json()
        console.error('❌ Registration failed:', error)
        toast.error(error.message || 'Registration failed')
      }
    } catch (error) {
      console.error('💥 Registration error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      console.log('🏁 Form submission completed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">GGM</span>
            </div>
            <h2 className="ml-3 text-3xl font-bold text-gray-900">GGM</h2>
          </div>
        </div>

        {/* Welcome */}
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900 mt-2">Create User's Account</h2>
          <p className="mt-2 text-gray-600">Add a new user to your organization</p>
        </div>


        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              className="appearance-none relative block w-full px-3 py-3 pr-10 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Password *"
              value={formData.password}
              onChange={handleInputChange}
              />

              <button
                type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              className="appearance-none relative block w-full px-3 py-3 pr-10 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Role Selection */}
          <div>
            <select
              id="role"
              name="role"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role *</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          {/* Role Description */}
          {formData.role && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>{roles.find(r => r.value === formData.role)?.label}:</strong>{' '}
                {roles.find(r => r.value === formData.role)?.description}
              </p>
            </div>
          )}

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


          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating User...' : 'Create User Account'}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 text-center text-sm">
            <Link
              to="/auth/login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Back to Login
            </Link>
            <Link
              to="/auth/tenant-register"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              Register as New Tenant
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
