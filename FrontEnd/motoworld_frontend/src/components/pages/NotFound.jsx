import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{ animation: "fadeIn 0.8s ease-in-out" }}
    >
      <div className="text-center p-4 border rounded-4 shadow-sm bg-white">
        <h1 className="display-1 fw-bold text-danger mb-3">404</h1>
        <p className="fs-4 text-secondary mb-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
          style={{
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          Return to Home
        </Link>
      </div>

      {/* Inline animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
