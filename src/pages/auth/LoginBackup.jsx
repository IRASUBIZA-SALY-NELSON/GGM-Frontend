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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Function to decode JWT token
  const decodeJWT = (token) => {
    try {
      console.log('🔍 Decoding JWT token...')
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      const decoded = JSON.parse(jsonPayload)
      console.log('✅ JWT decoded successfully:', decoded)
      return decoded
    } catch (error) {
      console.error('❌ Error decoding JWT:', error)
      return null
    }
  }

  // Function to extract user role from authorities
  const extractUserRole = (authorities) => {
    console.log('🔍 Extracting user role from authorities:', authorities)
    
    if (!authorities || !Array.isArray(authorities)) {
      console.log('⚠️ No authorities found or not an array')
      return 'USER'
    }

    // Look for ROLE_ prefix first
    const roleAuth = authorities.find(auth => auth.startsWith('ROLE_'))
    if (roleAuth) {
      const role = roleAuth.replace('ROLE_', '')
      console.log('✅ Found role with ROLE_ prefix:', role)
      return role
    }

    // Look for common role patterns
    const commonRoles = ['ADMIN', 'TENANT_ADMIN', 'USER', 'DISTRIBUTOR', 'SALES_MANAGER', 'STORE_MANAGER', 'WAREHOUSE_MANAGER', 'ACCOUNTANT', 'SALES_ASSISTANT']
    const foundRole = authorities.find(auth => commonRoles.includes(auth.toUpperCase()))
    
    if (foundRole) {
      console.log('✅ Found common role:', foundRole)
      return foundRole.toUpperCase()
    }

    console.log('⚠️ No recognizable role found, defaulting to ADMIN')
    return 'ADMIN'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🚀 LOGIN FORM SUBMITTED')
    console.log('📝 Form Data:', formData)
    setLoading(true)

    try {
      const requestBody = {
        email: formData.email,
        password: formData.password
      }
      console.log('📤 Request Body:', requestBody)

      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      console.log('📡 Response Status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Login Success - Full Response:', result)
        console.log('🔑 Access Token:', result.access_token)
        console.log('🔄 Refresh Token:', result.refresh_token)

        // Extract tokens
        const accessToken = result.access_token
        const refreshToken = result.refresh_token
        
        console.log('📊 TOKEN ANALYSIS:')
        console.log('  - Access Token Length:', accessToken?.length)
        console.log('  - Refresh Token Length:', refreshToken?.length)

        // Decode access token to get user information
        const decodedAccessToken = decodeJWT(accessToken)
        const decodedRefreshToken = decodeJWT(refreshToken)
        
        console.log('🔓 DECODED ACCESS TOKEN:', decodedAccessToken)
        console.log('🔓 DECODED REFRESH TOKEN:', decodedRefreshToken)

        // Extract user role from access token
        const userRole = extractUserRole(decodedAccessToken?.authorities)
        console.log('👤 EXTRACTED USER ROLE:', userRole)

        // Extract user information
        const userEmail = decodedAccessToken?.sub || formData.email
        const userId = decodedAccessToken?.userId || decodedAccessToken?.sub
        const tenantId = decodedAccessToken?.tenantId
        
        console.log('📋 USER INFORMATION EXTRACTED:')
        console.log('  - User ID:', userId)
        console.log('  - Email:', userEmail)
        console.log('  - Role:', userRole)
        console.log('  - Tenant ID:', tenantId)
        console.log('  - Authorities:', decodedAccessToken?.authorities)
        console.log('  - Token Issued At:', new Date(decodedAccessToken?.iat * 1000))
        console.log('  - Token Expires At:', new Date(decodedAccessToken?.exp * 1000))

        // Create user data object
        const userData = {
          id: userId,
          email: userEmail,
          name: userEmail, // Using email as name since no firstName/lastName in token
          role: userRole,
          tenantId: tenantId,
          authorities: decodedAccessToken?.authorities
        }

        console.log('💾 STORING USER DATA:', userData)

        // Store in localStorage
        localStorage.setItem('authToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('userRole', userRole)
        
        if (tenantId) {
          localStorage.setItem('tenantId', tenantId)
        }

        // Store tenant data if available in response
        if (result.tenant) {
          console.log('🏢 Storing tenant data from response:', result.tenant)
          localStorage.setItem('tenantData', JSON.stringify(result.tenant))
        }

        console.log('✅ ALL DATA STORED IN LOCALSTORAGE')
        console.log('🔍 LOCALSTORAGE CONTENTS:')
        console.log('  - authToken:', localStorage.getItem('authToken')?.substring(0, 50) + '...')
        console.log('  - refreshToken:', localStorage.getItem('refreshToken')?.substring(0, 50) + '...')
        console.log('  - user:', localStorage.getItem('user'))
        console.log('  - userRole:', localStorage.getItem('userRole'))
        console.log('  - tenantId:', localStorage.getItem('tenantId'))
        console.log('  - tenantData:', localStorage.getItem('tenantData'))

        toast.success(`Welcome back, ${userRole}!`)
        console.log('🧭 Navigating to /auth/system-user-register')
        
        // Use React Router navigation instead of forced redirect
        navigate('/auth/system-user-register')
      } else {
        const errorText = await response.text()
        let errorMessage = 'Invalid credentials'
        try {
          const error = JSON.parse(errorText)
          errorMessage = error.message || error.error || errorMessage
        } catch {
          errorMessage = errorText || errorMessage
        }
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error('💥 Network/Fetch Error:', error)
      toast.error('Network error. Please try again.')
    } finally {
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

          {/* Remember Me */}
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
      </div>
    </div>
  )
}

export default Login
