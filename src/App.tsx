import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import LocationPage from "./pages/LocationPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ORDERING_ENABLED } from "./config/features";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/location" element={<LocationPage />} />
        {ORDERING_ENABLED && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/summary" element={<OrderSummaryPage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </>
        )}
        {/* Ordering routes vanish with the flag, so send old bookmarks and
            password-reset links home instead of a blank page. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
