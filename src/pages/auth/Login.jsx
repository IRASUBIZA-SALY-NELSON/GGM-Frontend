import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Static data for demo
  const DEMO_USER = {
    email: 'admin@ggm.com',
    password: 'admin123'
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.email === DEMO_USER.email && formData.password === DEMO_USER.password) {
        localStorage.setItem('authToken', 'demo-token-123')
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: 'Admin User'
        }))
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        toast.error('Invalid email or password')
      }
      setLoading(false)
    }, 1000)
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
          <p className="mt-2 text-gray-600">Please login here</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="appearance-none relative block w-full px-3 py-3 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
                autoComplete="current-password"
                className="appearance-none relative block w-full px-3 py-3 pr-10 border border-purple-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to="/auth/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Register
            </Link>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800 font-medium">Demo Credentials:</p>
          <p className="text-sm text-purple-700">Email: admin@ggm.com</p>
          <p className="text-sm text-purple-700">Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
