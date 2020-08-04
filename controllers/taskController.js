const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
const SingleTask = require("../models/singleComment.model");

async function addTask(req, res, next) {
  const { task } = req.body;
  const singleTask = new SingleTask({ task, deadline: "Add deadline" });

  await User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json("There is no user.");
    }
    user.tasks.push(singleTask);
    user.save((err) => {
      if (err) return next(err);
    });
    return res.json("Task added successfull");
  });
}

async function editTask(req, res, next) {
  const { task, date } = req.body;
  await User.findOne({ _id: req.user._id }, (err, user) => {});
}

async function getAllTasks(req, res, next) {
  await User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json("There is no user.");
    }
    return res.json(user.tasks);
  });
}

module.exports = { addTask, editTask, getAllTasks };
