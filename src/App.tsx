import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import LocationPage from "./pages/LocationPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/summary" element={<OrderSummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
