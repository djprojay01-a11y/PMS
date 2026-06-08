import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import VehicleForm from './pages/VehicleForm';
import Customers from './pages/Customers';
import CustomerForm from './pages/CustomerForm';
import Promotions from './pages/Promotions';
import PromotionForm from './pages/PromotionForm';
import PromotionVehicles from './pages/PromotionVehicles';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Vehicles Routes */}
              <Route
                path="/vehicles"
                element={
                  <ProtectedRoute>
                    <Vehicles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vehicles/create"
                element={
                  <ProtectedRoute>
                    <VehicleForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vehicles/edit/:id"
                element={
                  <ProtectedRoute>
                    <VehicleForm />
                  </ProtectedRoute>
                }
              />

              {/* Customers Routes */}
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers/create"
                element={
                  <ProtectedRoute>
                    <CustomerForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers/edit/:id"
                element={
                  <ProtectedRoute>
                    <CustomerForm />
                  </ProtectedRoute>
                }
              />

              {/* Promotions Routes */}
              <Route
                path="/promotions"
                element={
                  <ProtectedRoute>
                    <Promotions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promotions/create"
                element={
                  <ProtectedRoute>
                    <PromotionForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promotions/edit/:id"
                element={
                  <ProtectedRoute>
                    <PromotionForm />
                  </ProtectedRoute>
                }
              />

              {/* Promotion-Vehicle Routes */}
              <Route
                path="/promotion-vehicles"
                element={
                  <ProtectedRoute>
                    <PromotionVehicles />
                  </ProtectedRoute>
                }
              />

              {/* Reports Routes */}
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
