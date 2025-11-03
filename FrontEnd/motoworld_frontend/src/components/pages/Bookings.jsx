import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const bookings = [
  { id: 1, customerName: "Rahul Sharma", bikeName: "Yamaha R15 V4", showroom: "Downtown Branch", bookingDate: "2024-01-15", status: "Confirmed" },
  { id: 2, customerName: "Sneha Patel", bikeName: "KTM Duke 390", showroom: "North Plaza", bookingDate: "2024-01-16", status: "Pending" },
  { id: 3, customerName: "Vikram Singh", bikeName: "Royal Enfield Classic 350", showroom: "West End Store", bookingDate: "2024-01-17", status: "Confirmed" },
  { id: 4, customerName: "Anjali Verma", bikeName: "Honda CB350", showroom: "Downtown Branch", bookingDate: "2024-01-18", status: "Completed" },
  { id: 5, customerName: "Karan Mehta", bikeName: "Yamaha R15 V4", showroom: "North Plaza", bookingDate: "2024-01-19", status: "Pending" },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Confirmed":
      return "badge bg-primary";
    case "Pending":
      return "badge bg-warning text-dark";
    case "Completed":
      return "badge bg-success";
    default:
      return "badge bg-secondary";
  }
};

function Bookings() {
  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#000", color: "white", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-white">Bookings Management</h2>
          <p className="text-light mb-0">
            Track customer bookings and their current status.
          </p>
        </div>

        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-outline-light">
            <i className="bi bi-arrow-clockwise me-2"></i> Refresh
          </button>
          <button className="btn btn-danger">
            <i className="bi bi-plus-circle me-2"></i> New Booking
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "#111", color: "white" }}>
        <div className="card-body py-3 px-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-dark text-white border-0"
              placeholder="Search by customer, bike, or showroom..."
            />
            <button className="btn btn-danger" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card shadow-sm border-0" style={{ backgroundColor: "#111", color: "white" }}>
        <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "#E50914", color: "white" }}>
          <h5 className="mb-0 fw-semibold">Recent Bookings</h5>
          <span className="badge bg-light text-dark px-3 py-2">
            Total: {bookings.length}
          </span>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            {/* ✅ Table text color changed to black */}
            <table className="table align-middle mb-0" style={{ backgroundColor: "#fff", color: "#000" }}>
              <thead style={{ backgroundColor: "#E50914", color: "white" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Bike</th>
                  <th scope="col">Showroom</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold text-dark">{booking.customerName}</td>
                    <td className="text-dark">{booking.bikeName}</td>
                    <td className="text-dark">{booking.showroom}</td>
                    <td className="text-dark">
                      {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <span className={getStatusBadge(booking.status)}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer text-end" style={{ backgroundColor: "#111" }}>
          <small className="text-light">
            Showing {bookings.length} total bookings
          </small>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
