import axios from "axios";
import { useEffect, useState } from "react";
import "./projects.css";
import { Link } from "react-router-dom";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/getProjects")
            .then((res) => {
                console.log(res.data);
                setProjects(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="projects-container">
            <h1 className="projects-title">Projects</h1>

            {projects.length === 0 ? (
                <p className="no-projects">No projects available.</p>
            ) : (
                projects.map((proj, index) => (
                    <div key={index} className="project-card">
                        <h3 className="project-title">{proj.pname}</h3>
                        <p className="project-description">{proj.description}</p>

                        <div className="project-info">
                            <p><span>Manager:</span> {proj.manager_details?.fName || "N/A"}</p>
                            <p><span>Owner:</span> {proj.productOwner_details?.fName || "N/A"}</p>
                            <p><span>Team:</span> {proj.team_details?.team_name || "N/A"}</p>
                        </div>
                    </div>
                ))
            )}
            <Link to="/dashboard" className="pm-return">Back to Project Manager</Link>
        </div>
    );
}

export default Projects;