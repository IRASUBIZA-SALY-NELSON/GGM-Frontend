import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './pages/admin/Dashboard'
import UserManagement from './pages/admin/UserManagement'
import ActivityLogs from './pages/admin/ActivityLogs'
import Reports from './pages/admin/Reports'
import AdminDistributors from './pages/admin/Distributors'
import Settings from './pages/admin/Settings'
import StoreManagerDashboard from './store-manager/pages/Dashboard'
import MyStock from './store-manager/pages/MyStock'
import ReorderCart from './store-manager/pages/ReorderCart'
import ProductHistory from './store-manager/pages/ProductHistory'
import StoreOrderDetails from './store-manager/pages/OrderDetails'
import PlaceOrder from './store-manager/pages/PlaceOrder'
import OrderCart from './store-manager/pages/OrderCart'
import Billing from './store-manager/pages/Billing'
import ViewInvoice from './store-manager/pages/ViewInvoice'
import PayInvoice from './store-manager/pages/PayInvoice'
import PaymentHistory from './store-manager/pages/PaymentHistory'
import BillingOrderDetails from './store-manager/pages/BillingOrderDetails'
import PaymentReceipt from './store-manager/pages/PaymentReceipt'
import StoreManagerSettings from './store-manager/pages/Settings'
import StoreManagerLayout from './store-manager/components/StoreManagerLayout'
import WarehouseManagerDashboard from './warehouse-manager/pages/Dashboard'
import ProcessOrders from './warehouse-manager/pages/ProcessOrders'
import StockManagement from './warehouse-manager/pages/StockManagement'
import StockTransfers from './warehouse-manager/pages/StockTransfers'
import WarehouseManagerLayout from './warehouse-manager/components/WarehouseManagerLayout'
import SalesManagerDashboard from './sales-manager/pages/Dashboard'
import MyTeam from './sales-manager/pages/MyTeam';
import TeamMemberProfile from './sales-manager/pages/TeamMemberProfile';
import AddNewSalesAssistant from './sales-manager/pages/AddNewSalesAssistant';
import Orders from './sales-manager/pages/Orders';
import OrderDetails from './sales-manager/pages/OrderDetails';
import Distributors from './sales-manager/pages/Distributors';
import DistributorDetails from './sales-manager/pages/DistributorDetails';
import OnboardDistributor from './sales-manager/pages/OnboardDistributor';
import PricingCatalog from './sales-manager/pages/PricingCatalog';
import AddNewProduct from './sales-manager/pages/AddNewProduct';
import PriceManagement from './sales-manager/pages/PriceManagement';
import SalesAnalytics from './sales-manager/pages/SalesAnalytics';
import SalesManagerLayout from './sales-manager/components/SalesManagerLayout';

// Sales Assistant Components
import SalesAssistantDashboard from './sales-assistant/pages/Dashboard';
import SalesAssistantOrders from './sales-assistant/pages/Orders';
import SalesAssistantOrderDetails from './sales-assistant/pages/OrderDetails';
import SalesAssistantDistributors from './sales-assistant/pages/Distributors';
import SalesAssistantDistributorDetails from './sales-assistant/pages/DistributorDetails';
import SalesAssistantProducts from './sales-assistant/pages/Products';
import SalesAssistantLayout from './sales-assistant/components/SalesAssistantLayout';

// Accountant Components
import AccountantDashboard from './accountant/pages/Dashboard';
import AccountantPayments from './accountant/pages/Payments';
import RecordPayment from './accountant/pages/RecordPayment';
import AccountantInvoices from './accountant/pages/Invoices';
import AccountantOrders from './accountant/pages/Orders';
import AccountantOrderDetails from './accountant/pages/OrderDetails';
import AccountantSettings from './accountant/pages/Settings';
import AccountantLayout from './accountant/components/AccountantLayout';

// Distributor Components
import DistributorDashboard from './distributor/pages/Dashboard';
import DistributorPlaceOrder from './distributor/pages/PlaceOrder';
import DistributorOrders from './distributor/pages/Orders';
import DistributorOrderDetails from './distributor/pages/OrderDetails';
import DistributorInvoices from './distributor/pages/Invoices';
import DistributorLayout from './distributor/components/DistributorLayout';

import NotFound from './pages/NotFound'
import RoleBasedRedirect from './components/RoleBasedRedirect'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import TenantRegister from './pages/auth/TenantRegister'
import SystemUserRegister from './pages/auth/SystemUserRegister'
import TenantSuccess from './pages/auth/TenantSuccess'
import UserSuccess from './pages/auth/UserSuccess'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOTP from './pages/auth/VerifyOTP'
import ResetPassword from './pages/auth/ResetPassword'
import Success from './pages/auth/Success'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
        <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/tenant-register" element={<TenantRegister />} />
        <Route path="/auth/system-user-register" element={<SystemUserRegister />} />
        <Route path="/auth/tenant-success" element={<TenantSuccess />} />
        <Route path="/auth/user-success" element={<UserSuccess />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/success" element={<Success />} />
        
        {/* Root Route - Redirect to login for unauthorized users */}
        <Route path="/" element={<ProtectedRoute><RoleBasedRedirect /></ProtectedRoute>} />
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
                <AdminDistributors />
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
        
        {/* Store Manager Routes */}
        <Route 
          path="/store-manager/dashboard" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <StoreManagerDashboard />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/my-stock" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <MyStock />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/reorder-cart" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <ReorderCart />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/product-history" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <ProductHistory />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/order-details/:orderId" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <StoreOrderDetails />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/place-order" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <PlaceOrder />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/order-cart" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <OrderCart />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Billing Routes */}
        <Route 
          path="/store-manager/billing" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <Billing />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/billing/invoice/:invoiceId" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <ViewInvoice />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/billing/pay-invoice/:invoiceId" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <PayInvoice />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/billing/payment-history" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <PaymentHistory />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/billing/order/:orderId" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <BillingOrderDetails />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/store-manager/billing/receipt/:receiptId" 
          element={
            <ProtectedRoute>
              <StoreManagerLayout>
                <PaymentReceipt />
              </StoreManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route path="/store-manager/settings" element={<ProtectedRoute><StoreManagerLayout><StoreManagerSettings /></StoreManagerLayout></ProtectedRoute>} />
        
        {/* Sales Manager Routes */}
        <Route 
          path="/sales-manager/dashboard" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <SalesManagerDashboard />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/my-team" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <MyTeam />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/my-team/profile/:memberId" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <TeamMemberProfile />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/my-team/add-new" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <AddNewSalesAssistant />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />

        {/* Orders Routes */}
        <Route 
          path="/sales-manager/orders" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <Orders />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/orders/:orderId" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <OrderDetails />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />

        {/* Distributors Routes */}
        <Route 
          path="/sales-manager/distributors" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <Distributors />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/distributors/:distributorId" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <DistributorDetails />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/distributors/add-new" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <OnboardDistributor />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />

        {/* Pricing & Catalog Routes */}
        <Route 
          path="/sales-manager/pricing-catalog" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <PricingCatalog />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/pricing-catalog/add-new" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <AddNewProduct />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/price-management" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <PriceManagement />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-manager/analytics" 
          element={
            <ProtectedRoute>
              <SalesManagerLayout>
                <SalesAnalytics />
              </SalesManagerLayout>
            </ProtectedRoute>
          } 
        />


        {/* Sales Assistant Routes */}
        <Route 
          path="/sales-assistant/dashboard" 
          element={
            <ProtectedRoute>
              <SalesAssistantLayout>
                <SalesAssistantDashboard />
              </SalesAssistantLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-assistant/orders" 
          element={
            <ProtectedRoute>
              <SalesAssistantLayout>
                <SalesAssistantOrders />
              </SalesAssistantLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-assistant/orders/:orderId" 
          element={
            <ProtectedRoute>
              <SalesAssistantLayout>
                <SalesAssistantOrderDetails />
              </SalesAssistantLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-assistant/distributors" 
          element={
            <ProtectedRoute>
              <SalesAssistantLayout>
                <SalesAssistantDistributors />
              </SalesAssistantLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-assistant/distributors/:distributorId" 
          element={
            <ProtectedRoute>
              <SalesAssistantLayout>
                <SalesAssistantDistributorDetails />
              </SalesAssistantLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales-assistant/products" 
          element={
            <ProtectedRoute>
              <SalesAssistantLayout>
                <SalesAssistantProducts />
              </SalesAssistantLayout>
            </ProtectedRoute>
          } 
        />

        {/* Accountant Routes */}
        <Route path="/accountant/dashboard" element={<ProtectedRoute><AccountantLayout><AccountantDashboard /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/payments" element={<ProtectedRoute><AccountantLayout><AccountantPayments /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/payments/record" element={<ProtectedRoute><AccountantLayout><RecordPayment /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/invoices" element={<ProtectedRoute><AccountantLayout><AccountantInvoices /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/orders" element={<ProtectedRoute><AccountantLayout><AccountantOrders /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/orders/:orderId" element={<ProtectedRoute><AccountantLayout><AccountantOrderDetails /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/sales-analytics" element={<ProtectedRoute><AccountantLayout><SalesAnalytics /></AccountantLayout></ProtectedRoute>} />
        <Route path="/accountant/settings" element={<ProtectedRoute><AccountantLayout><AccountantSettings /></AccountantLayout></ProtectedRoute>} />
        
        {/* Distributor Routes */}
        <Route path="/distributor/dashboard" element={<ProtectedRoute><DistributorLayout><DistributorDashboard /></DistributorLayout></ProtectedRoute>} />
        <Route path="/distributor/place-order" element={<ProtectedRoute><DistributorLayout><DistributorPlaceOrder /></DistributorLayout></ProtectedRoute>} />
        <Route path="/distributor/orders" element={<ProtectedRoute><DistributorLayout><DistributorOrders /></DistributorLayout></ProtectedRoute>} />
        <Route path="/distributor/orders/:orderId" element={<ProtectedRoute><DistributorLayout><DistributorOrderDetails /></DistributorLayout></ProtectedRoute>} />
        <Route path="/distributor/invoices" element={<ProtectedRoute><DistributorLayout><DistributorInvoices /></DistributorLayout></ProtectedRoute>} />
        
        {/* Warehouse Manager Routes */}
        <Route path="/warehouse-manager/dashboard" element={<ProtectedRoute><WarehouseManagerLayout><WarehouseManagerDashboard /></WarehouseManagerLayout></ProtectedRoute>} />
        <Route path="/warehouse-manager/process-orders" element={<ProtectedRoute><WarehouseManagerLayout><ProcessOrders /></WarehouseManagerLayout></ProtectedRoute>} />
        <Route path="/warehouse-manager/stock-management" element={<ProtectedRoute><WarehouseManagerLayout><StockManagement /></WarehouseManagerLayout></ProtectedRoute>} />
        <Route path="/warehouse-manager/stock-transfers" element={<ProtectedRoute><WarehouseManagerLayout><StockTransfers /></WarehouseManagerLayout></ProtectedRoute>} />
        
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
