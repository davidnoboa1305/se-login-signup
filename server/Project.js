const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    pname: String,
    description: String,
    productOwnerID: String,
    managerID: mongoose.Schema.Types.ObjectId,
    teamID: mongoose.Schema.Types.ObjectId
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;