import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const navigation = [
  { name: "Dashboard", href: "/admindashboard", icon: "bi-grid-fill" },
  { name: "Manage Bikes", href: "/admindashboard/bikes", icon: "bi-bicycle" },
  { name: "Manage Showrooms", href: "/admindashboard/showrooms", icon: "bi-building" },
  { name: "View Bookings", href: "/admindashboard/bookings", icon: "bi-calendar-check" },
  { name: "Manage Admins", href: "/admindashboard/admins", icon: "bi-people" },
];

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // 🔹 Logout handler
  const handleLogout = () => {
    // Clear any saved admin data
    localStorage.removeItem("admin");
    alert("✅ Logged out successfully!");
    navigate("/"); // ✅ Redirect to Home page
  };

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}
    >
      {/* Sidebar */}
      <aside
        className="text-white p-3 vh-100 position-fixed shadow"
        style={{
          width: sidebarOpen ? "250px" : "0",
          backgroundColor: "#0e0d0dff",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-bicycle text-danger fs-4 me-2"></i>
            <h5 className="fw-bold text-uppercase m-0">Motoworld</h5>
          </div>
          <button
            className="btn btn-outline-light btn-sm d-md-none"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className="nav flex-column">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/admindashboard"}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center px-3 py-2 mb-2 rounded text-decoration-none ${
                  isActive
                    ? "bg-danger text-white fw-semibold"
                    : "text-light text-opacity-75"
                }`
              }
              style={{ transition: "0.2s ease" }}
            >
              <i className={`${item.icon} me-2 fs-5`}></i>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
          backgroundColor: "#1e1d1dff",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Topbar */}
        <nav
          className="navbar navbar-dark border-bottom border-secondary px-4 py-3 shadow-sm d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#d20808ff" }}
        >
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-light d-md-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
            <h5 className="fw-bold text-uppercase m-0">Admin Dashboard</h5>
          </div>

          {/* 🔹 Logout Button */}
          <button
            className="btn btn-outline-light fw-semibold d-flex align-items-center"
            onClick={handleLogout}
            style={{
              borderRadius: "8px",
              padding: "6px 12px",
              transition: "0.2s ease",
            }}
          >
            <i className="bi bi-box-arrow-right me-2 fs-5"></i>
            Logout
          </button>
        </nav>

        {/* Page content */}
        <main
          className="flex-grow-1 py-4 px-4"
          style={{ backgroundColor: "#181818" }}
        >
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          className="text-center py-3 border-top border-secondary small"
          style={{ backgroundColor: "#080808ff", color: "#928f8fff" }}
        >
          © {new Date().getFullYear()} MotoWorld Admin Panel — All Rights Reserved
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;
