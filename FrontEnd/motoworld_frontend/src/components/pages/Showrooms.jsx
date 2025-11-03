import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const initialShowrooms = [
  {
    id: 1,
    name: "Downtown Branch",
    location: "123 Main St, City Center",
    phone: "+91 98765 43210",
    manager: "Rajesh Kumar",
  },
  {
    id: 2,
    name: "North Plaza",
    location: "456 North Ave, District 2",
    phone: "+91 98765 43211",
    manager: "Priya Singh",
  },
  {
    id: 3,
    name: "West End Store",
    location: "789 West Blvd, Zone 3",
    phone: "+91 98765 43212",
    manager: "Amit Patel",
  },
];

function Showrooms() {
  const [showrooms, setShowrooms] = useState(initialShowrooms);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    manager: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setFormData({ name: "", location: "", phone: "", manager: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (showroom) => {
    setFormData(showroom);
    setEditingId(showroom.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this showroom?")) {
      setShowrooms(showrooms.filter((s) => s.id !== id));
      alert("Showroom deleted successfully!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setShowrooms(
        showrooms.map((s) =>
          s.id === editingId ? { ...formData, id: editingId } : s
        )
      );
      alert("Showroom updated successfully!");
    } else {
      const newShowroom = {
        ...formData,
        id: Math.max(...showrooms.map((s) => s.id), 0) + 1,
      };
      setShowrooms([...showrooms, newShowroom]);
      alert("Showroom added successfully!");
    }
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div
      className="container-fluid py-4 px-3 px-md-4"
      style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold text-white">Manage Showrooms</h2>
          <p className="text-white mb-0">
            Add, update, or remove showroom locations.
          </p>
        </div>
        <button
          className="btn d-flex align-items-center gap-2 mt-3 mt-md-0 shadow-sm"
          onClick={handleAdd}
          style={{
            backgroundColor: "#ff0000",
            color: "#fff",
            border: "1px solid #ff0000",
          }}
        >
          <i className="bi bi-plus-circle"></i> Add Showroom
        </button>
      </div>

      {/* Showroom Cards */}
      <div className="row g-4">
        {showrooms.map((showroom) => (
          <div className="col-12 col-md-6 col-lg-4" key={showroom.id}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{ backgroundColor: "#111", color: "#fff" }}
            >
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#ff0000", color: "#fff" }}
              >
                <h5 className="mb-0 fw-semibold">{showroom.name}</h5>
                <div>
                  <button
                    className="btn btn-sm"
                    style={{ border: "1px solid #ff0000", color: "#ff0000" }}
                    onClick={() => handleEdit(showroom)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm ms-2 text-danger border border-danger"
                    onClick={() => handleDelete(showroom.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-2 d-flex align-items-start gap-2">
                  <i className="bi bi-geo-alt text-danger"></i>
                  <span>{showroom.location}</span>
                </div>
                <div className="mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-telephone text-danger"></i>
                  <span>{showroom.phone}</span>
                </div>
                <div className="border-top pt-2 mt-2">
                  <p className="text-light mb-0">Manager</p>
                  <strong>{showroom.manager}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white border border-danger">
              <form onSubmit={handleSubmit}>
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#ff0000", color: "#fff" }}
                >
                  <h5 className="modal-title mb-0">
                    {editingId ? "Edit Showroom" : "Add New Showroom"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-white">
                      Showroom Name
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border border-secondary"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-white">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border border-secondary"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-white">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border border-secondary"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-white">
                      Manager
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border border-secondary"
                      value={formData.manager}
                      onChange={(e) =>
                        setFormData({ ...formData, manager: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer bg-black border-top border-danger">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-danger">
                    {editingId ? "Update" : "Add"} Showroom
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Showrooms;
