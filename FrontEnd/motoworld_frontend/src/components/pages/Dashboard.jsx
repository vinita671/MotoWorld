import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const stats = [
  { name: "Total Bikes", value: "24", icon: "bi-bicycle", color: "text-primary" },
  { name: "Showrooms", value: "8", icon: "bi-building", color: "text-success" },
  { name: "Bookings", value: "156", icon: "bi-calendar-check", color: "text-warning" },
  { name: "Admins", value: "5", icon: "bi-people", color: "text-danger" },
];

function Dashboard() {
  return (
    <div
      className="container-fluid py-4 px-3 px-md-4"
      style={{ backgroundColor: "#181818", color: "white", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="mb-4 border-bottom border-secondary pb-3">
        <h2 className="fw-bold text-white">Dashboard Overview</h2>
        <p className="text-white-50 mb-0">
          Welcome back to the MotoWorld Admin Panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat) => (
          <div key={stat.name} className="col-12 col-md-6 col-lg-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                backgroundColor: "#242424",
                color: "white",
                transition: "all 0.3s ease",
              }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 text-uppercase small mb-1">
                    {stat.name}
                  </h6>
                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                </div>
                <div className={`${stat.color}`}>
                  <i className={`${stat.icon} fs-2`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div
        className="card shadow-sm border-0 mb-4"
        style={{ backgroundColor: "#242424", color: "white" }}
      >
        <div className="card-header bg-danger text-white fw-semibold">
          <i className="bi bi-activity me-2"></i> Recent Activity
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            <div className="list-group-item bg-transparent border-0 d-flex align-items-start gap-3 text-white">
              <i className="bi bi-bicycle text-primary fs-5 mt-1"></i>
              <div>
                <p className="mb-1 fw-semibold">
                  New bike added: Yamaha R15 V4
                </p>
                <small className="text-white-50">2 hours ago</small>
              </div>
            </div>
            <div className="list-group-item bg-transparent border-0 d-flex align-items-start gap-3 text-white">
              <i className="bi bi-calendar-check text-warning fs-5 mt-1"></i>
              <div>
                <p className="mb-1 fw-semibold">New booking received</p>
                <small className="text-white-50">5 hours ago</small>
              </div>
            </div>
            <div className="list-group-item bg-transparent border-0 d-flex align-items-start gap-3 text-white">
              <i className="bi bi-building text-success fs-5 mt-1"></i>
              <div>
                <p className="mb-1 fw-semibold">
                  New showroom added: Downtown Branch
                </p>
                <small className="text-white-50">1 day ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Note */}
      <div className="text-center text-white-50 small mt-4">
        © {new Date().getFullYear()} MotoWorld Admin Dashboard
      </div>
    </div>
  );
}

export default Dashboard;
