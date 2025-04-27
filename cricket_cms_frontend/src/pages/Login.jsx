import React, { useState, useContext } from "react";
import { login, registerUser } from "../services/api"; // Ensure registerUser is defined and exported in api.js
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "user", // Default role for signup
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // For signup success
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const { accessToken } = await login(formData.email, formData.password);
      setToken(accessToken);
      setError(null);
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      await registerUser(formData); // Call the signup API
      setError(null);
      setSuccess("Signup successful! Please login.");
      setTimeout(() => setIsLogin(true), 2000); // Auto-switch to login after success
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/cricket-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
          textAlign: "center",
        }}
      >
        {/* 🏏 Cricket icon */}
        <div style={{ fontSize: "50px", marginBottom: "10px" }}>🏏</div>
        <h2
          style={{ color: "#0d47a1", marginBottom: "20px", fontWeight: "bold" }}
        >
          {isLogin ? "Login" : "Signup"}
        </h2>

        {/* Signup Name Field */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            style={inputStyle}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          style={inputStyle}
        />

        {/* Role Selector for Signup */}
        {!isLogin && (
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button
          style={buttonStyle}
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
        )}

        <p style={{ marginTop: "20px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccess(null);
            }}
            style={{
              color: "#0d47a1",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

// 🌟 Input and Button Styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#0d47a1",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow: "0 4px 12px rgba(13, 71, 161, 0.4)",
};

export default Login;
