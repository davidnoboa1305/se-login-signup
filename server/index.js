const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./UserSchema')
const Project = require('./Project')
const Team = require('./TeamName')

app.use(express.json());
app.use(cors())
app.listen(9000, ()=> {
    console.log('Server Started at ${9000}')
})
const mongoose = require('mongoose');
const mongoString = "mongodb://davidnoboa1305_admin:DNM.1305!dnm@ac-944pnqn-shard-00-00.jip4eim.mongodb.net:27017,ac-944pnqn-shard-00-01.jip4eim.mongodb.net:27017,ac-944pnqn-shard-00-02.jip4eim.mongodb.net:27017/?ssl=true&replicaSet=atlas-bo2axd-shard-0&authSource=admin&appName=icsi418y"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))

database.once('connected', () => console.log('Databased Connected'))

app.get('/getUser', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    
    console.log(username)
    console.log(password)
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {fName:1, lName:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getTeams', async (req, res) => {
    try {
        const teamList = await Team.find({}).populate("members");        
        res.send(teamList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find()
        let responseDetails = []
        for (const project of projects) {
           const manager = await User.findById(project.managerID)
           const team = await Team.findById(project.teamID)
           responseDetails.push({
             pname: project.pname,
             description: project.description,
             manager_details: manager,
             product_owner_details: project.productOwnerID,
             team_details: team
           })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.fName} ${req.body.lName}`)
    const un = req.body.username
    try {
        //Check if username already exists in database
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.post('/createProject', async (req, res) => {
    try {
            const project = new Project(req.body);
            project.save()
            console.log(`Project created! ${project}`)
            res.send(project)
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.post('/createTeam', async (req, res) => {
    try {
            const team = new Team(req.body);
            team.save()
            console.log(`Team created! ${team}`)
            res.send(team)
    }
    catch (error){
        res.status(500).send(error)
    }
})
