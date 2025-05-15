// src/models/blogModel.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    blog_image_url: { type: String, required: true },
    category_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // reference to Category model
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
