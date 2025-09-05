import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const decodeUserFromToken = (token) => {
    try {
      console.log('🔍 Decoding user info from token')
      // JWT tokens have 3 parts separated by dots
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      
      const payload = JSON.parse(jsonPayload)
      console.log('👤 Token payload:', payload)
      return payload
    } catch (error) {
      console.error('💥 Error decoding token:', error)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🚀 Login started')
    console.log('📝 Login credentials:', { email: formData.email, password: '***' })
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      console.log('📥 Login response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Login successful:', result)
        
        // Store tokens
        const accessToken = result.access_token
        const refreshToken = result.refresh_token
        
        if (!accessToken) {
          console.error('❌ No access token received')
          toast.error('Authentication failed - no token received')
          return
        }
        
        console.log('💾 Storing tokens and user info')
        
        // Decode user info from JWT token
        const tokenPayload = decodeUserFromToken(accessToken)
        
        if (tokenPayload) {
          // Extract user info from token payload
          const extractUserRole = (payload) => {
            // Check if there's a direct role field
            if (payload.role) return payload.role.toUpperCase()
            
            // Extract from authorities array - look for ROLE_ prefix first
            if (payload.authorities && payload.authorities.length > 0) {
              // Find the authority that starts with ROLE_
              const roleAuthority = payload.authorities.find(auth => auth.startsWith('ROLE_'))
              if (roleAuthority) {
                return roleAuthority.replace('ROLE_', '').toUpperCase()
              }
              
              // Fallback: if no ROLE_ found, use the first authority
              const authority = payload.authorities[0]
              if (authority.includes(':')) {
                return authority.split(':')[0].toUpperCase() // admin:read -> ADMIN
              }
              return authority.toUpperCase()
            }
            
            return 'USER'
          }
          
          const userInfo = {
            email: tokenPayload.sub, // JWT standard: subject is usually the email/username
            role: extractUserRole(tokenPayload),
            name: tokenPayload.name || formData.email.split('@')[0]
          }
          
          console.log('👤 User info extracted:', userInfo)
          
          // Use AuthContext login method to properly set state
          login(userInfo, accessToken, refreshToken)
          
          toast.success(`Welcome back, ${userInfo.name}!`)
          
          // Navigate based on role
          const role = userInfo.role
          console.log('🎭 User role:', role)
          
          const roleRoutes = {
            'ADMIN': '/admin/dashboard',
            'MANAGER': '/warehouse-manager/dashboard',
            'SALES_MANAGER': '/sales-manager/dashboard',
            'SALES_ASSISTANT': '/sales-assistant/dashboard',
            'ACCOUNTANT': '/accountant/dashboard',
            'STORE_MANAGER': '/store-manager/dashboard',
            'DISTRIBUTOR': '/distributor/dashboard',
            'USER': '/dashboard'
          }
          
          const redirectTo = roleRoutes[role] || '/dashboard'
          console.log('🏠 Redirecting to:', redirectTo)
          
          navigate(redirectTo, { replace: true })
        } else {
          console.error('❌ Failed to decode user info from token')
          toast.error('Failed to load user information')
        }
      } else {
        const error = await response.json()
        console.error('❌ Login failed:', error)
        toast.error(error.message || 'Invalid credentials')
      }
    } catch (error) {
      console.error('💥 Login error:', error)
      toast.error('Network error. Please try again.')
    } finally {
      console.log('🏁 Login process completed')
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
              Ask your Tenant.
            </Link>
          </div>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800 font-medium mb-2">Login with your registered credentials</p>
          <p className="text-xs text-purple-700">Use the email and password from your registration</p>
        </div>
      </div>
    </div>
  )
}

export default Login
