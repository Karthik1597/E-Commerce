import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activePage, setActivePage] = useState("");
  const [message, setMessage] = useState("");

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  /* ================= FETCH DATA ================= */
  const fetchProducts = async () => {
    setActivePage("products");
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/products`);
    setProducts(res.data);
  };

  const fetchUsers = async () => {
    setActivePage("users");
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`);
    setUsers(res.data);
  };

  const fetchOrders = async () => {
    setActivePage("orders");
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/orders`);
    setOrders(res.data);
  };

  /* ================= PRODUCT CRUD ================= */
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image_file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image_file") {
      setNewProduct({ ...newProduct, image_file: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      if (newProduct.image_file) {
        formData.append("image_file", newProduct.image_file);
      }

      await axios.post(
        axios.post(`${process.env.REACT_APP_API_URL}/api/admin/products/upload`),
        formData
      );

      setMessage("✅ Product added successfully");
      setNewProduct({ name: "", price: "", category: "", image_file: null });
      fetchProducts();
    } catch {
      setMessage("❌ Failed to add product");
    }
  };

  /* ================= EDIT PRODUCT (NEW) ================= */
  const editProduct = async (product) => {
    const name = prompt("Edit Product Name:", product.name);
    if (!name) return;

    const price = prompt("Edit Price (RM):", product.price);
    if (!price) return;

    const category = prompt("Edit Category:", product.category);

    try {
      await axios.put(
        (`${process.env.REACT_APP_API_URL}/api/admin/products/upload`),
        { name, price, category }
      );
      fetchProducts();
    } catch {
      alert("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/products/${id}`);
    fetchProducts();
  };

  /* ================= PAGES ================= */
  const ProductsPage = () => (
    <>
      <h2 className="page-title">Products</h2>

      <form className="product-form" onSubmit={addProduct}>
        <input
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (RM)"
          value={newProduct.price}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image_file"
          accept="image/*"
          onChange={handleChange}
          className="file-input"
        />

        <button className="btn-primary">Add Product</button>
        {message && <span className="inline-msg">{message}</span>}
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>RM {p.price}</td>
              <td>{p.category}</td>
              <td>
                {p.image_url && (
                  <img src={p.image_url} alt={p.name} className="product-img" />
                )}
              </td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => editProduct(p)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const UsersPage = () => (
    <>
      <h2 className="page-title">Users</h2>
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const OrdersPage = () => (
    <>
      <h2 className="page-title">Orders</h2>
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.full_name}</td>
              <td>{o.email}</td>
              <td>RM {o.total_amount}</td>
              <td>{o.payment_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="logo">ShopAdmin</h2>
        <button className="nav-link" onClick={fetchProducts}>Products</button>
        <button className="nav-link" onClick={fetchOrders}>Orders</button>
        <button className="nav-link" onClick={fetchUsers}>Users</button>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="admin-content">
        {!activePage && <p>Welcome to Admin Dashboard</p>}
        {activePage === "products" && <ProductsPage />}
        {activePage === "users" && <UsersPage />}
        {activePage === "orders" && <OrdersPage />}
      </main>
    </div>
  );
};

export default AdminDashboard;
