import React, { useState } from 'react'
import SupaNoteIcon from "../assets/SupaNoteIcon.jpeg";
import RegisterImg from "../assets/undraw_welcoming_42an.svg";
import { Link, useNavigate } from 'react-router-dom';
import { AuthResponse } from '../types/Auth';
import { register } from '../services/authService';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response: AuthResponse = await register({ username, email, password });

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            navigate("/login");
        } catch (err: any) {
            setError("Something went wrong. Try again.");
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
                <h2 className="text-center mb-4">Create new account</h2>
                <p className="text-center mb-4">Already a member? <Link to={"/login"} className="text-primary text-decoration-none">Log in</Link></p>
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
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            placeholder="Username"
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

                    {error && <div className="alert alert-danger py-1">{error}</div>}

                    <div className="text-center">
                        <button type="submit" className="btn btn-dark mt-4 w-50 text-white rounded-pill" disabled={loading}>
                            {loading ? "Loading..." : "Create account"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-end">
                <img src={RegisterImg} alt="" style={{ width: '70%', }} />
            </div>

        </div>


    );
};

export default Register;