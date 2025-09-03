import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
