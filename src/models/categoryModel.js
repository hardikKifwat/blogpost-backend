// src/models/categoryModel.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
