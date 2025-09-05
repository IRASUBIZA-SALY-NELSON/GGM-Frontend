// API Configuration
const API_BASE_URL = 'http://localhost:8081'

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
  RESEND_OTP: `${API_BASE_URL}/api/auth/resend-otp`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  USER_PROFILE: `${API_BASE_URL}/api/users/profile`,
  USER_UPDATE: `${API_BASE_URL}/api/users/update`,
  
  // Tenant endpoints
  TENANTS: `${API_BASE_URL}/api/tenants`,
  TENANT_ADMIN: `${API_BASE_URL}/api/tenants/admin`,
  TENANT_GET: (id) => `${API_BASE_URL}/api/tenants/${id}`,
  
  // Audit logs
  AUDIT_LOGS: `${API_BASE_URL}/auditlogs`,
  
  // Store Manager endpoints
  ORDERS: `${API_BASE_URL}/api/orders`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  INVENTORIES: `${API_BASE_URL}/api/inventories`,
  PAYMENTS: `${API_BASE_URL}/api/payments`,
  STORES: `${API_BASE_URL}/api/stores`
}

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

// API Helper function
export const apiCall = async (endpoint, options = {}) => {
  const config = {
    method: options.method || HTTP_METHODS.GET,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers
    },
    ...options
  }

  // Add auth token if available
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(endpoint, config)
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage
      }
      throw new Error(errorMessage)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export default API_ENDPOINTS
