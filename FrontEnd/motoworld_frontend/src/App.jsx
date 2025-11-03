import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// 🔹 Common Components
import Navbar from "./components/Header";
import Footer from "./components/Footer";

// 🔹 User & Public Pages
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import Bike from "./components/Bike";
import BikeDetail from "./components/BikeDetail";
import AddToCart from "./components/AddToCart";
import Checkout from "./components/Checkout";

// 🔹 Admin Dashboard Components (from Project 2)
import DashboardLayout from "./components/admindashboard/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import Bikes from "./components/pages/Bikes";
import Showrooms from "./components/pages/Showrooms";
import Bookings from "./components/pages/Bookings";
import Admins from "./components/pages/Admins";
import NotFound from "./components/pages/NotFound";

// 🔹 Styles
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* ===================== PUBLIC / USER ROUTES ===================== */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/bikes" element={<Bike />} />
                <Route path="/bike/:id" element={<BikeDetail />} />
                <Route path="/cart" element={<AddToCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* ===================== ADMIN DASHBOARD ROUTES ===================== */}
        <Route path="/admindashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bikes" element={<Bikes />} />
            <Route path="showrooms" element={<Showrooms />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="admins" element={<Admins />} />
</Route>

      </Routes>
    </Router>
  );
}

export default App;
