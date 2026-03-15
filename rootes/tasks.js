const express = require("express");
const tasksController = require("../controller/tasks.js");
const authMiddleware = require("../middlewares/auth.js");

const userRouter = express.Router();

userRouter.get("/list", authMiddleware, tasksController.listTasks);
userRouter.post("/add", authMiddleware, tasksController.addTask);
userRouter.post("/delete/:id", authMiddleware, tasksController.removeTask);
userRouter.post("/update/:id", authMiddleware, tasksController.updateTask);

module.exports = userRouter;
