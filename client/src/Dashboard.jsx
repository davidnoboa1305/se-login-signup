import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./dashboard.css";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function Dashboard() {
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
    const openCreateProject = () => setIsCreateProjectOpen(true);
    const closeCreateProject = () => setIsCreateProjectOpen(false);

    const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
    const openCreateTeam = () => setIsCreateTeamOpen(true);
    const closeCreateTeam = () => setIsCreateTeamOpen(false);

    const[pname, setPname] = useState("");
    const[description, setDescription] = useState("");
    const[productOwnerID, setProductOwnerID] = useState("");
    const[managerID, setManagerID] = useState("");
    const[teamID, setTeamID] = useState("");

    const[teamName, setTeamName] = useState("");

    const [users, setUsers] = useState([])
    const [teams, setTeams] = useState([])

    const [selectedUsers, setSelectedUsers] = useState([])

    const navigate = useNavigate()

    const handleCreateProject = (event) => {
        event.preventDefault();

        axios.post("http://localhost:9000/createProject", {
            pname: pname,
            description: description,
            productOwnerID: productOwnerID,
            managerID: managerID,
            teamID: teamID
        })
        .then(() => {alert("Project created"); closeCreateProject();})
        .catch(() => alert("Error creating project"));
    };

    const handleCreateTeam = (event) => {
        event.preventDefault();
        const userIDs = selectedUsers.map(user => user.value);
        axios.post("http://localhost:9000/createTeam", {
            team_name: teamName,
            members: userIDs
        })
        .then(() => {alert("Team created"); closeCreateTeam();})
        .catch(() => alert("Error creating team"));
    };
    
    const userOptions = users.map((user) => {
        return {label: `${user.fName} ${user.lName}`, value: user._id}
    })

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
        .then(function (response) {
            setUsers(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
        }, []);

    useEffect(() => {
        axios.get('http://localhost:9000/getTeams')
        .then(function (response) {
            setTeams(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    return (
        <>
            <h1>Project Manager</h1>
            <p>Welcome to the Project Manager!</p>
            
            <button onClick={openCreateProject} className="button">
                Create Project
            </button>
            <button onClick={() => navigate("/Projects")} className="button">
                View Projects
            </button>
            <button onClick={openCreateTeam} className="button teams-button">
                Create Team
            </button>
            <button onClick={() => navigate("/Teams")} className="button teams-button">
                View Teams
            </button>


            {isCreateProjectOpen && (
                <div className="create-project-overlay">
                    <div className="create-project-content">
                        <h2>Create New Project</h2>
                        <form onSubmit={handleCreateProject}>
                            <label>Project Name:</label>
                            <input 
                                type="text" 
                                placeholder="Enter name..." 
                                value={pname}
                                onChange={(e) => setPname(e.target.value)}
                                className="input" />
                            <label>Project Description:</label>
                            <textarea 
                                placeholder="Enter description..." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input">

                            </textarea>
                            <label>Product Owner ID</label>
                            <input 
                                type="text" 
                                placeholder="Enter product owner..." 
                                value={productOwnerID}
                                onChange={(e) => setProductOwnerID(e.target.value)}
                                className="input" />
                            <label>Manager ID</label>
                            <select 
                                value={managerID} 
                                onChange={(e) => setManagerID(e.target.value)} 
                                className="input">
                                <option value="">Select Manager</option>
                                {users.map((user) => {
                                return <option key={user._id} value={user._id}>   
                                    {user.fName} {user.lName}
                                </option>
                                })}
                            </select>
                            <label>Team ID</label>
                            <select 
                                value={teamID} 
                                onChange={(e) => setTeamID(e.target.value)} 
                                className="input">
                                <option value="">Select Team</option>
                                {teams.map((team) => {
                                return <option key={team._id} value={team._id}>   
                                    {team.team_name}
                                </option>
                                })}
                            </select>

                            <div className="create-project-actions">
                                <button type="submit" className="button">Save</button>
                                <button type="button" onClick={closeCreateProject} className="button secondary">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isCreateTeamOpen && (
                <div className="create-project-overlay">
                    <div className="create-project-content">
                        <h2>Create New Team</h2>
                        <form onSubmit={handleCreateTeam}>
                            <label>Team Name:</label>
                            <input 
                                type="text" 
                                placeholder="Enter name..." 
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="input"
                                required
                            />
                            <label>Assign Members:</label>
                            <Select
                                isMulti
                                value={selectedUsers}
                                onChange={setSelectedUsers}
                                options={userOptions}
                                className="input"
                            />

                            <div className="create-project-actions">
                                <button type="submit" className="button">Save</button>
                                <button 
                                    type="button" 
                                    onClick={closeCreateTeam} 
                                    className="button secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;