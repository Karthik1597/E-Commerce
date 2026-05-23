import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  const { setUser } = useContext(AuthContext);

  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isSignup
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }

      // signup success message
      if (isSignup) {
        setMessage("✅ Account created successfully. Please login.");
        setIsSignup(false);
        return;
      }

      // login success
      setUser(data);
      onClose();

    } catch (err) {
      setMessage("❌ Server not reachable");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {message && <p className="inline-msg">{message}</p>}

        <p onClick={() => {
          setIsSignup(!isSignup);
          setMessage("");
        }}>
          {isSignup
            ? "Already have an account? Login"
            : "New user? Create account"}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
