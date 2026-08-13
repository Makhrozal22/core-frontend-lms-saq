import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

import { LoginPage } from '../modules/auth/pages/LoginPage';
import ProfilePage from "@/modules/auth/pages/ProfilePage";
import { SppDashboardPage } from '../modules/finance/pages/SppDashboardPage';
import { SppDetailPage } from '../modules/finance/pages/SppDetailPage';
import { SppHistoryPage } from '../modules/finance/pages/SppHistoryPage';

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Root Path Handler */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/beranda" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />

      {/* Auth Public Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route index element={<Navigate to="/auth/login" replace />} />
      </Route>

      {/* Shortcut route /login redirects to /auth/login */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Bottom Nav: Beranda */}
          <Route path="/beranda" element={<SppDashboardPage />} />
          {/* Legacy /spp route => redirect to /beranda */}
          <Route path="/spp" element={<Navigate to="/beranda" replace />} />

          {/* Bottom Nav: Tagihan */}
          <Route path="/tagihan" element={<SppDetailPage />} />

          {/* Bottom Nav: Riwayat */}
          <Route path="/riwayat" element={<SppHistoryPage />} />
          {/* Legacy /spp/history route */}
          <Route path="/spp/history" element={<Navigate to="/riwayat" replace />} />

          {/* Bottom Nav: Profil */}
          <Route path="/profil" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
