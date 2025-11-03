import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  // Fetch admins from backend
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admins");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditingAdmin(null);
    setFormData({ name: "", email: "", password: "", role: "Admin" });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
    });
    setShowModal(true);
  };

  // Delete Admin
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admins/${id}`);
        setAdmins(admins.filter((a) => a.id !== id));
        alert("Admin deleted successfully!");
      } catch (error) {
        console.error("Error deleting admin:", error);
        alert("Failed to delete admin!");
      }
    }
  };

  // Save (Add or Update)
  const handleSubmit = async () => {
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      (!editingAdmin && formData.password.trim() === "")
    ) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      if (editingAdmin) {
        await axios.put(
          `http://localhost:8080/api/admins/${editingAdmin.id}`,
          formData
        );
        alert("Admin updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/admins", formData);
        alert("Admin added successfully!");
      }
      fetchAdmins();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving admin:", error);
      alert("Failed to save admin!");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#000", color: "#fff" }}
    >
      <div className="flex-grow-1 w-100 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <div>
            <h2 className="fw-bold text-white mb-1">Manage Admins</h2>
            <p className="text-light mb-0">Add, edit, or remove admin users</p>
          </div>
          <button className="btn btn-danger btn-lg shadow-sm" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i> Add Admin
          </button>
        </div>

        {/* Admins Table */}
        <div
          className="card border-0 shadow-lg flex-grow-1"
          style={{ backgroundColor: "#111", color: "white" }}
        >
          <div
            className="card-header fw-semibold fs-5"
            style={{ backgroundColor: "#E50914", color: "white" }}
          >
            <i className="bi bi-people-fill me-2"></i> Admin Users
          </div>
          <div className="card-body p-0">
            <table
              className="table table-hover align-middle mb-0 w-100"
              style={{ backgroundColor: "#000", color: "white" }}
            >
              <thead style={{ backgroundColor: "#E50914", color: "white" }}>
                <tr>
                  <th style={{ width: "25%" }}>Name</th>
                  <th style={{ width: "35%" }}>Email</th>
                  <th style={{ width: "20%" }}>Role</th>
                  <th className="text-end" style={{ width: "20%" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin.id} style={{ borderBottom: "1px solid #222" }}>
                      <td className="fw-semibold">{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            admin.role === "Super Admin"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {admin.role}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm me-2"
                          style={{
                            border: "1px solid #E50914",
                            color: "#E50914",
                            background: "transparent",
                          }}
                          onClick={() => handleEdit(admin)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(admin.id)}
                          disabled={admin.role === "Super Admin"}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== MODAL FORM (Center) ===== */}
      {showModal && (
        <div
          className="modal show fade"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light rounded-3 shadow-lg">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  {editingAdmin ? "Edit Admin" : "Add New Admin"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email"
                  />
                </div>
                {!editingAdmin && (
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Enter password"
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSubmit}
                >
                  {editingAdmin ? "Save Changes" : "Add Admin"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="text-white text-center py-3 mt-auto"
        style={{ backgroundColor: "#111" }}
      >
        <small>© 2025 MotoWorld Admin Panel. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Admins;
