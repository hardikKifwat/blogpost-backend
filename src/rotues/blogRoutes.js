const express = require("express");
const router = express.Router();
const { createBlog, getBlogs } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

// Create blog - authenticated users only
router.post("/create-blog", upload.single("blog_image_url"), createBlog);

// Get all blogs of the authenticated user (with optional search by title or category)
router.get("/get-blogs", authMiddleware, getBlogs);

module.exports = router;
