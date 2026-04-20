import axios from "axios";
import { useEffect, useState } from "react";
import "./teams.css";
import { Link } from "react-router-dom";

function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/getTeams")
            .then((res) => {
                console.log(res.data);
                setTeams(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="teams-container">
            <h1 className="teams-title">Teams</h1>

            {teams.length === 0 ? (
                <p className="no-teams">No teams available.</p>
            ) : (
                teams.map((team, index) => (
                    <div key={index} className="team-card">
                        <h3 className="team-title">{team.team_name}</h3>
                        <ul>
                            {team.members?.map((member) => (
                                <li key={member._id}>
                                    {member.fName} {member.lName}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            <Link to="/dashboard" className="pm-return">Back to Project Manager</Link>
        </div>
    );
}

export default Teams;