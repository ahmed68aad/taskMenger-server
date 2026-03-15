const userModel = require("../models/user.js");
const taskModel = require("../models/tasks.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// register user
const registerUser = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    // check if user exists
    const exist = await userModel.findOne({ email });

    if (exist) {
      return response.json({
        success: false,
        message: "User already exists",
      });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return response.json({
        success: false,
        message: "Please enter valid email",
      });
    }

    // validate password
    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // create user
    const newUser = new userModel({
      name,
      email,
      password,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    response.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    response.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// login user
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return response.json({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = createToken(user._id);

    response.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    response.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//list tasks
const listTasks = async (request, response) => {
  try {
    const list = await taskModel.find({
      user: request.userId,
    });

    response.json({
      success: true,
      tasks: list,
    });
  } catch (error) {
    console.log(error);
    response.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { loginUser, registerUser, listTasks };
