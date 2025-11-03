  import { useState, useEffect } from "react";
  import axios from "axios";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";

  const API_URL = "http://localhost:8080/api/bikes";

  function Bikes() {
    const [bikes, setBikes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBike, setEditingBike] = useState(null);
    const [formData, setFormData] = useState({
      name: "",
      model: "",
      price: "",
      status: "Available",
      image: "", // now stores URL instead of file
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
      fetchBikes();
    }, []);

    const fetchBikes = async () => {
      try {
        const response = await axios.get(API_URL);
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
        showAlert("Failed to load bikes", "danger");
      }
    };

    const showAlert = (message, type = "success") => {
      setAlert({ message, type });
      setTimeout(() => setAlert(null), 2000);
    };

    const handleAdd = () => {
      setEditingBike(null);
      setFormData({ name: "", model: "", price: "", status: "Available", image: "" });
      setShowModal(true);
    };

    const handleEdit = (bike) => {
      setEditingBike(bike);
      setFormData({
        name: bike.name,
        model: bike.model,
        price: bike.price,
        status: bike.status,
        image: bike.image,
      });
      setShowModal(true);
    };

    const handleDelete = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showAlert("Bike deleted successfully");
        fetchBikes();
      } catch (error) {
        console.error("Error deleting bike:", error);
        showAlert("Failed to delete bike", "danger");
      }
    };

    const handleSubmit = async () => {
      if (!formData.name || !formData.model || !formData.price || !formData.image) {
        showAlert("Please fill in all fields", "danger");
        return;
      }

      try {
        if (editingBike) {
          await axios.put(`${API_URL}/${editingBike.id}`, formData);
          showAlert("Bike updated successfully");
        } else {
          await axios.post(API_URL, formData);
          showAlert("Bike added successfully");
        }

        setShowModal(false);
        fetchBikes();
        setEditingBike(null);
        setFormData({ name: "", model: "", price: "", status: "Available", image: "" });
      } catch (error) {
        console.error("Error saving bike:", error);
        showAlert("Failed to save bike", "danger");
      }
    };

    return (
      <div className="container-fluid py-4 text-light" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
        {/* ✅ Alert */}
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show position-fixed top-0 end-0 m-3`}
            style={{ zIndex: 1055 }}
            role="alert"
          >
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
          </div>
        )}

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <div>
            <h2 className="fw-bold text-white mb-1">Manage Bikes</h2>
            <p className="text-secondary mb-0">Add, edit, or remove bikes from inventory</p>
          </div>
          <button
            className="btn btn-danger px-3 py-2 fw-semibold shadow-sm"
            onClick={handleAdd}
            style={{ backgroundColor: "#E50914", border: "none" }}
          >
            <i className="bi bi-plus-circle me-2"></i> Add Bike
          </button>
        </div>

        {/* Table Section */}
        <div className="card bg-dark text-white shadow-lg border-0">
          <div className="card-header bg-danger fw-semibold d-flex align-items-center">
            <i className="bi bi-bicycle me-2"></i> Bikes Inventory
          </div>
          <div className="card-body table-responsive">
            <table className="table table-dark table-hover align-middle text-center mb-0">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr key={bike.id}>
                    <td>
                      {bike.image ? (
                        <img
                          src={bike.image}
                          alt={bike.name}
                          width="80"
                          height="50"
                          className="rounded"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span className="text-secondary">No Image</span>
                      )}
                    </td>
                    <td>{bike.name}</td>
                    <td>{bike.model}</td>
                    <td>{bike.price}</td>
                    <td>
                      <span
                        className={`badge ${
                          bike.status === "Available" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {bike.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-light me-2"
                        onClick={() => handleEdit(bike)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(bike.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {bikes.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-secondary py-3">
                      No bikes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <>
            <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-0 shadow-lg">
                  <div className="modal-header border-secondary">
                    <h5 className="modal-title">{editingBike ? "Edit Bike" : "Add New Bike"}</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Bike Name</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Model Year</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Enter image URL (e.g. https://example.com/bike.jpg)"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="img-fluid mt-3 rounded shadow"
                          style={{ maxHeight: "150px", objectFit: "cover" }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="modal-footer border-secondary">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ backgroundColor: "#E50914", border: "none" }}
                      onClick={handleSubmit}
                    >
                      {editingBike ? "Update" : "Add"} Bike
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  export default Bikes;
