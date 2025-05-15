
# Blogpost Backend API

This is a simple backend API for managing user authentication, blog posts, and categories for a blog platform.

## API Endpoints

### Authentication Routes

1. **POST /register**  
   Registers a new user.  
   - **Request Body**:
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     - 201: User created successfully.
     - 400: Validation error.

2. **POST /login**  
   Logs in a user and generates a token.  
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     - 200: Login successful, returns JWT token.
     - 401: Unauthorized, invalid credentials.

### Blog Routes

1. **POST /create-blog**  
   Creates a new blog post (only authenticated users).  
   - **Request Body** (multipart/form-data):
     ```json
     {
       "title": "string",
       "content": "string",
       "category": "string",
       "blog_image_url": "image file"
     }
     ```
   - **Response**:
     - 201: Blog created successfully.
     - 400: Validation error.

2. **GET /get-blogs**  
   Retrieves all blogs of the authenticated user (supports search by title/category).  
   - **Query Parameters**:
     - `title` (optional): Search blogs by title.
     - `category` (optional): Filter blogs by category.
   - **Response**:
     - 200: List of blogs.

### Category Routes

1. **POST /create-category**  
   Creates a new blog category.  
   - **Request Body**:
     ```json
     {
       "name": "string"
     }
     ```
   - **Response**:
     - 201: Category created successfully.
     - 400: Validation error.

2. **GET /get-categorys**  
   Retrieves all available categories.  
   - **Response**:
     - 200: List of categories.

## Installation

1. Clone the repository.
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Set up environment variables.
   - Create a `.env` file at the root of the project and add the following:
     ```
     PORT=3000
     DB_URI=<Your MongoDB URI>
     JWT_SECRET=<Your JWT Secret>
     ```
4. Start the server.
   ```bash
   npm start
   ```

## Dependencies

- express
- mongoose
- multer
- dotenv
- jsonwebtoken
- bcryptjs

## License

This project is licensed under the MIT License.
