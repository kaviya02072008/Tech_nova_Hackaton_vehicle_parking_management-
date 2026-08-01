import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactPage from "@/pages/ContactPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import Dashboard from "@/pages/Dashboard";
import QRCodePage from "@/pages/QRCodePage";
import SecurityScanner from "@/pages/SecurityScanner";
import BookingHistory from "@/pages/BookingHistory";
import ProfilePage from "@/pages/ProfilePage";
import NotificationPage from "@/pages/NotificationPage";
import AdminDashboard from "@/pages/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminAnalytics from "@/pages/AdminAnalytics";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Customer Dashboard */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* QR Code */}
      <Route
        path="/customer/qr"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <QRCodePage />
          </ProtectedRoute>
        }
      />

      {/* Booking History */}
      <Route
        path="/customer/history"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <BookingHistory />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
  path="/customer/contact"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <ContactPage />
    </ProtectedRoute>
  }
/>

      {/* Notifications */}
      <Route
        path="/customer/notifications"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <NotificationPage />
          </ProtectedRoute>
        }
      />

      {/* Security Dashboard */}
      <Route
        path="/security/dashboard"
        element={
          <ProtectedRoute allowedRoles={["SECURITY"]}>
            <SecurityScanner />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin/analytics"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminAnalytics />
    </ProtectedRoute>
  }
/>

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={
          <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
            You are not authorized to access this page.
          </div>
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
    
  );
};

export default AppRoutes;