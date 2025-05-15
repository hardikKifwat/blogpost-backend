const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

// Create blog - authenticated users only
router.post("/create-category", createCategory);

// Get all blogs of the authenticated user (with optional search by title or category)
router.get("/get-categorys", getCategories);

module.exports = router;
