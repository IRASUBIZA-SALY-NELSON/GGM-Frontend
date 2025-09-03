import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    tenant: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const roles = ['System Admin', 'Store Manager', 'Sales Manager', 'Warehouse Manager', 'Accountant']

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success('Registration successful! Please check your email for verification.')
      navigate('/auth/login')
      setLoading(false)
    }, 1500)
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome 👋</h2>
          <p className="mt-2 text-gray-600">Please register here</p>
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
              placeholder="Password"
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
              placeholder="Confirm Password"
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

          {/* Phone Number */}
          <div>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              autoComplete="tel"
              className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

            {/* Tenant */}
            <div>
            <input
              id="tenant"
              name="tenant"
              type="text"
              required
              autoComplete="off"
              className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter Registration Code"
              value={formData.tenant}
              onChange={handleInputChange}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember Me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/auth/forgot-password"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/auth/login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
