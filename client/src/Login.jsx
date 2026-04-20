import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        axios.get("http://localhost:9000/getUser", {
            params: {
                username: username,
                password: password
            }
        })
        .then((res) => {
            if (res.data) {
                localStorage.clear();
                localStorage.setItem("loggedInUser", res.data._id);
                navigate("/home");
            } else {
                alert("Invalid credentials");
            }
        })
        .catch(() => alert("Error logging in"));
    };

    return (
        <>
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="input"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input"
                    />

                    <button type="submit" className="button">Login</button>
                </form>
                <p className="redirect">Don't have an account? <Link to="/signup">Signup here</Link></p>
            </div>
        </>
    );
}

export default Login;