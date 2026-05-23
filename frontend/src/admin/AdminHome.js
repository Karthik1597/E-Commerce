import React from "react";

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin 👋</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="card">
          <h3>Total Users</h3>
          <p>View all registered users</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>Manage customer orders</p>
        </div>

        <div className="card">
          <h3>Products</h3>
          <p>Add / Edit products</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
