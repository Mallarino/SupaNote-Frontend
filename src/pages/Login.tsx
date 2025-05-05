
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/Auth";
import { login } from "../api/authService";
import loginImg from "../assets/undraw_creative-flow_t3kz.svg";
import SupaNoteIcon from "../assets/SupaNoteIcon.jpeg";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response: AuthResponse = await login({ email, password });
      
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/");
    } catch (err: any) {
      setError("Wrong Email or password");
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="container d-flex align-items-center vh-100">

        <div className="p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="text-center mb-4">
            <img src={SupaNoteIcon} alt="SupaNote Icon" style={{ width: '60px', height: '60px' }} />
          </div>
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <p className="text-center mb-4">Simple notes, big results. <b>SupaNote</b></p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <p className="text-end mb-4 fw-bold small">Forgot password?</p>

            {error && <div className="alert alert-danger py-1">{error}</div>}

            <div className="text-center">
              <button type="submit" className="btn btn-dark w-50 text-white rounded-pill" disabled={loading}>
                {loading ? "Cargando..." : "Login"}
              </button>
            </div>
          </form>
          <p className="text-center mt-4 fw-bold small">Not a member? <Link to="/register" className="text-primary text-decoration-none">Register now</Link></p>
        </div>

        <div className="d-flex justify-content-end">
          <img src={loginImg} alt="" style={{ width: '90%', }} />
        </div>

      </div>


  );
};

export default Login;