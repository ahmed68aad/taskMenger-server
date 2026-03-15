const express = require("express");
const userRouter = require("./rootes/user.js");
const tasksRouter = require("./rootes/tasks.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", tasksRouter);

module.exports = app;
