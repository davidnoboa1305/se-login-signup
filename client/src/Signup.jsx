import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./form.css";
import "./style.css"

function Signup() {

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSignUp = (event) => {
        event.preventDefault();

        axios.post("http://localhost:9000/createUser", {
            fName: fName,
            lName: lName,
            username: username,
            password: password
        })
        .then(() => alert("User created"))
        .catch(() => alert("Error signing up"));
    };

    return (
        <>
            
            <div className="container">
                <h2>Signup</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                        placeholder="First Name"
                        className="input"
                    />

                    <input
                        type="text"
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                        placeholder="Last Name"
                        className="input"
                    />

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

                    <button className="button" type="submit">Signup</button>
                </form>
                <p className="redirect">Already have an account? <Link to="/login">Login here</Link></p>        
            </div>
        </>
    );
}

export default Signup;