const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
const SingleTask = require("../models/singleComment.model");

async function addTask(req, res, next) {
  const { task } = req.body;
  const singleTask = new SingleTask({ task, deadline: "Add deadline", checked: false });

  await User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json("There is no user.");
    }
    user.tasks.push(singleTask);
    user.save((err) => {
      if (err) return res.json(err);
    });
    return res.json("Task added successfull");
  });
}

async function removeTask(req, res, next) {

  const { taskID } = req.body;

  await User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res.json(err);
    }
    if (!user) {
      return res.json("There is no user.");
    }
    user.tasks.splice([user.tasks.findIndex(e => e._id.toString() === taskID)], 1)
    user.save((err) => {
      if (err) return res.json(err);
    });
    return res.json("Task removed successfull");
  });
}

async function editTask(req, res, next) {

  const { changedTask } = req.body;
  await User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return res.json(err);
    }
    if (!user) {
      return res.json("There is no user.");
    }
    user.tasks[user.tasks.findIndex(e => {
      return e._id.toString() === changedTask.taskID

    })] = changedTask;
    user.save((err) => {
      if (err) return res.json(err);
    });
    return res.json("Task changed successfull");
  });
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

module.exports = { addTask, removeTask, editTask, getAllTasks };
