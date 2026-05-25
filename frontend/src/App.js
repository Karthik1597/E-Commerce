import React from "react";
import { Routes, Route } from "react-router-dom";

// USER PAGES
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";

// ADMIN
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from './AdminRoute';

function App() {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/kids" element={<Kids />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/contact" element={<Contact />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} /> n h4+
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

// ✅ THIS IS CRITICAL: Default export
export default App;
