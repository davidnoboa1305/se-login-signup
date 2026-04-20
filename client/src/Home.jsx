import { useNavigate, Link } from "react-router-dom"; // Added Link
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react"; // Added useState

function Home() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/Login");
    }

    useEffect(() => {
        if (loggedInUser) {
            axios.get('http://localhost:9000/getTeams', { params: { user_id: loggedInUser } })
                .then((res) => setTeams(res.data))
                .catch((err) => console.error("Error fetching teams:", err));
        }
    }, [loggedInUser]);
    return (
        <>
            {loggedInUser ? (
                <>
                    <h1>Welcome, {loggedInUser}!</h1>
                    {teams.map((team) => {
                        return (
                            <div key={team._id}>
                                <Link to={"/team/${team._id}"}>{team.team_name}</Link>
                            </div>
                        );
                    })}
                    <br />
                    <button onClick={handleSignOut} className="button">Sign Out</button>
                    <button onClick={() => navigate("/Dashboard")} className="button">Go to Dashboard</button>
                </>
            ) : (
                <>
                    <h1>Welcome!</h1>
                    <div className="container">
                        <p>Already have an account?</p>
                        <button onClick={() => navigate("/Login")} className="button">Sign In</button>
                        <p>Don't have an account?</p>
                        <button onClick={() => navigate("/Signup")} className="button">Sign Up</button>
                    </div>
                </>
            )}
        </>
    );
}

export default Home;