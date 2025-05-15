// src/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./rotues/authRoutes");
const blogRoutes = require("./rotues/blogRoutes");
const categoryRoutes = require("./rotues/categoryRoutes");
const path = require("path");

dotenv.config();

// Routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Since __dirname is src/, uploads folder is inside __dirname/uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
