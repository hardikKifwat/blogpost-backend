const Blog = require("../models/blogModel");

// Get all blogs of the authenticated author only
exports.getBlogs = async (req, res) => {
  try {
    const authorId = req.user.userId; // from auth middleware


    console.log(authorId);
    // Get query params with defaults
    const { search = "", page = 1, limit = 6 } = req.query;

    // Build search filter
    const searchFilter = {
      author: authorId,
      $or: [
        { title: { $regex: search, $options: "i" } }, // case-insensitive title search
        { content: { $regex: search, $options: "i" } }, // case-insensitive content search
      ],
    };

    // Convert page and limit to numbers
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));

    // Count total documents matching the filter
    const totalBlogs = await Blog.countDocuments(searchFilter);

    // Query with pagination
    const blogs = await Blog.find(searchFilter)
      .populate("author", "fullName email")
      .populate("category_name", "name")
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    return res.status(200).json({
      status: 200,
      error: false,
      message: "Blogs fetched successfully",
      data: blogs,
      pagination: {
        total: totalBlogs,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalBlogs / limitNum),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      // changed to 500 status code for server error
      status: 500,
      error: true,
      message: "Server error",
      data: null,
    });
  }
};

// Create blog
exports.createBlog = async (req, res) => {
  const { title, content, category_name, author } = req.body;
  const file = req.file;

  if (!title || !content || !category_name || !author) {
    return res.status(200).json({
      status: 400,
      error: true,
      message:
        "All fields (title, content, category_name, author) are required",
      data: null,
    });
  }

  if (!file) {
    return res.status(200).json({
      status: 400,
      error: true,
      message: "Blog image is required",
      data: null,
    });
  }

  try {
    const blog_image_url = `/uploads/${file.filename}`;

    const newBlog = new Blog({
      title,
      content,
      blog_image_url,
      category_name,
      author,
    });

    await newBlog.save();

    return res.status(200).json({
      status: 200,
      error: false,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      status: 500,
      error: true,
      message: "Server error",
      data: null,
    });
  }
};
