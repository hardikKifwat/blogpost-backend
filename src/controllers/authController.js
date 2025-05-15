const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password || !fullName || !phoneNumber) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "Please provide all fields",
        data: null,
      });
    }

    // Validate phone number (assuming 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "Invalid phone number",
        data: null,
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "Please enter a valid email address",
        data: null,
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "User already exists",
        data: null,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      fullName: fullName.trim().toLowerCase(),
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: 200,
      error: false,
      message: "User registered successfully",
      data: { token, user: newUser },
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      status: 500,
      error: true,
      message: `Register : ${err.message}`,
      data: null,
    });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "Please enter a valid email address",
        data: null,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "User does not exist",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        status: 404,
        error: true,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: 200,
      error: false,
      message: "Login successful",
      data: { token, user },
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      status: 500,
      error: true,
      message: `Login : ${err.message}`,
      data: null,
    });
  }
};
