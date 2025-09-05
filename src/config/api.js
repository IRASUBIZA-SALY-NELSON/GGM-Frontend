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
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh-token`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  USER_BY_ID: (id) => `${API_BASE_URL}/api/users/${id}`,
  USER_ME: `${API_BASE_URL}/api/users/me`,
  
  // Tenant endpoints
  TENANTS: `${API_BASE_URL}/api/tenants`,
  TENANT_ADMIN: `${API_BASE_URL}/api/tenants/admin`,
  TENANT_BY_ID: (id) => `${API_BASE_URL}/api/tenants/${id}`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  
  // Price List endpoints
  PRICE_LISTS: `${API_BASE_URL}/api/pricelists`,
  PRICE_LIST_BY_ID: (id) => `${API_BASE_URL}/api/pricelists/${id}`,
  PRICE_LIST_ITEMS: `${API_BASE_URL}/api/pricelistitems`,
  PRICE_LIST_ITEM_BY_ID: (id) => `${API_BASE_URL}/api/pricelistitems/${id}`,
  
  // Order endpoints
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDER_BY_ID: (id) => `${API_BASE_URL}/api/orders/${id}`,
  ORDER_APPROVE: (id) => `${API_BASE_URL}/api/orders/approve/${id}`,
  ORDER_REJECT: (id) => `${API_BASE_URL}/api/orders/reject/${id}`,
  ORDER_LINES: `${API_BASE_URL}/api/orderlines`,
  ORDER_LINE_BY_ID: (id) => `${API_BASE_URL}/api/orderlines/${id}`,
  
  // Inventory endpoints
  INVENTORIES: `${API_BASE_URL}/api/inventories`,
  INVENTORY_BY_ID: (id) => `${API_BASE_URL}/api/inventories/${id}`,
  INVENTORY_BY_PRODUCT: (id) => `${API_BASE_URL}/api/inventories/product/${id}`,
  
  // Invoice endpoints
  INVOICES: `${API_BASE_URL}/api/invoices`,
  INVOICE_BY_ID: (id) => `${API_BASE_URL}/api/invoices/${id}`,
  
  // Payment endpoints
  PAYMENTS: `${API_BASE_URL}/api/payments`,
  PAYMENT_BY_ID: (id) => `${API_BASE_URL}/api/payments/${id}`,
  
  // Store endpoints
  STORES: `${API_BASE_URL}/api/stores`,
  STORE_BY_ID: (id) => `${API_BASE_URL}/api/stores/${id}`,
  
  // Warehouse endpoints
  WAREHOUSES: `${API_BASE_URL}/api/warehouses`,
  WAREHOUSE_BY_ID: (id) => `${API_BASE_URL}/api/warehouses/${id}`,
  
  // Distributor endpoints
  DISTRIBUTORS: `${API_BASE_URL}/distributors`,
  DISTRIBUTOR_BY_ID: (id) => `${API_BASE_URL}/distributors/${id}`,
  DISTRIBUTOR_WAREHOUSE: (id) => `${API_BASE_URL}/distributors/warehouse/${id}`,
  DISTRIBUTOR_STORE: (id) => `${API_BASE_URL}/distributors/store/${id}`,
  
  // Notification endpoints
  NOTIFICATIONS: `${API_BASE_URL}/api/notifications`,
  NOTIFICATION_BY_ID: (id) => `${API_BASE_URL}/api/notifications/${id}`,
  
  // Activity endpoints
  ACTIVITIES: `${API_BASE_URL}/activities`,
  ACTIVITY_BY_ID: (id) => `${API_BASE_URL}/activities/${id}`,
  
  // Audit logs
  AUDIT_LOGS: `${API_BASE_URL}/auditlogs`,
  AUDIT_LOG_BY_ID: (id) => `${API_BASE_URL}/auditlogs/${id}`,
  
  // Transfer endpoints
  TRANSFERS: `${API_BASE_URL}/transfers`,
  TRANSFER_BY_ID: (id) => `${API_BASE_URL}/transfers/${id}`,
  
  // Stock Transaction endpoints
  STOCK_TRANSACTIONS: `${API_BASE_URL}/stocktransactions`,
  STOCK_TRANSACTION_BY_ID: (id) => `${API_BASE_URL}/stocktransactions/${id}`,
  
  // Adjustment endpoints
  ADJUSTMENTS: `${API_BASE_URL}/adjustments`,
  ADJUSTMENT_BY_ID: (id) => `${API_BASE_URL}/adjustments/${id}`,
  
  // Daily Close endpoints
  DAILY_CLOSES: `${API_BASE_URL}/dailycloses`,
  DAILY_CLOSE_BY_ID: (id) => `${API_BASE_URL}/dailycloses/${id}`
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
