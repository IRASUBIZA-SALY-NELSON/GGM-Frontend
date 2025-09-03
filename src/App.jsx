import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import ActivityLogs from './pages/ActivityLogs'
import Reports from './pages/Reports'
import Distributors from './pages/Distributors'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOTP from './pages/auth/VerifyOTP'
import ResetPassword from './pages/auth/ResetPassword'
import Success from './pages/auth/Success'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/success" element={<Success />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route 
          path="/admin/user-management" 
          element={
            <ProtectedRoute>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/activity-logs" 
          element={
            <ProtectedRoute>
              <Layout>
                <ActivityLogs />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/distributors" 
          element={
            <ProtectedRoute>
              <Layout>
                <Distributors />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } 
        />
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
