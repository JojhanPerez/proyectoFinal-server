const express = require("express");
const SubjectController = require("../controllers/subject")

const api = express.Router();

api.post("/addSubject", SubjectController.addSubject);
api.get("/subjects", SubjectController.getSubjects);
api.put("/updateSubject/:id", SubjectController.updateSubject);
api.delete("/deleteSubject/:id", SubjectController.deleteSubject)

module.exports = api;