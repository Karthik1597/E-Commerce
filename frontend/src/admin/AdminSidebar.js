import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h3>ADMIN PANEL</h3>

      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/products">Products</Link>

      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
