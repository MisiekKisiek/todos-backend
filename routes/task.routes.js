const { Router } = require("express");
const TaskController = require("../controllers/taskController");
const passport = require("passport");

module.exports = () => {
  const api = Router();

  api.post("/addTask", TaskController.addTask);
  api.get("/getTasks", TaskController.getAllTasks);

  return api;
};
