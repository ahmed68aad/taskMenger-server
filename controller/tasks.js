const taskModel = require("../models/tasks.js");

//list tasks
const listTasks = async (request, response) => {
  try {
    const list = await taskModel.find();

    response.json({
      success: true,
      tasks: list,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//add a new task
const addTask = async (request, response) => {
  const { title, description, completed } = request.body;

  try {
    if (!title) {
      return response.json({
        success: false,
        message: "Title is required",
      });
    }

    const newTask = await taskModel.create({
      title,
      description,
      completed,
      user: request.userId,
    });

    response.json({
      success: true,
      message: "Task Added Successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//remove a task

const removeTask = async (request, response) => {
  try {
    const { id } = request.params;

    const deletedTask = await taskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return response.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update task
const updateTask = async (request, response) => {
  const { id } = request.params;
  const { title, description, completed } = request.body;

  try {
    if (!title) {
      return response.json({
        success: false,
        message: "Title is required",
      });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        user: request.userId,
      },
      { new: true },
    );

    if (!updatedTask) {
      return response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    response.json({
      success: true,
      message: "Task updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { addTask, removeTask, updateTask, listTasks };
