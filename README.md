# 📝 Blog API

A RESTful Blog API built with Node.js,Typescript, Express, and MongoDB.  
Supports **CRUD operations** for users and posts, with **JWT-based authentication**, **bcrypt password hashing**, and **Dockerized deployment**.

---

## 🚀 Features

- 🔐 User authentication using **JWT**
- 🔒 Passwords hashed with **bcrypt**
- 👤 CRUD operations for **Users**
- 📝 CRUD operations for **Blog Posts**
- 🐳 Fully **Dockerized** for easy deployment

---

## 📦 Tech Stack

- **Node.js**, **Express** , **Typescript**
- **MongoDB**, **Mongoose**
- **JWT**, **bcrypt**
- **Docker**, **Docker Compose** (optional)
- **Postman** for API testing

---

## 📁 Folder Structure

```
📦 blog-api
 ┣ 📂controllers
 ┣ 📂models
 ┣ 📂routes
 ┣ 📂middleware
 ┣ 📜app.js
 ┣ 📜.env
 ┣ 📜Dockerfile
 ┣ 📜.dockerignore
 ┗ 📜README.md
```

---

## 🔧 Setup & Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file and add:
   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Start the server**
   ```bash
   npm start
   ```

---

## 🐳 Run with Docker

1. **Build Docker image**
   ```bash
   docker compose up --build
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 final-app
   ```

> Make sure your MongoDB connection string is cloud-based (e.g., MongoDB Atlas) or your container has access to a local MongoDB.

---

## 🛠 API Endpoints

### 🔐 Auth
- `POST /auth/register` — Register user
- `POST /auth/login` — Login user (returns JWT)

### 👤 Users
- `GET /users` — Get all users (admin only)
- `POST /users` - create new user
- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user

### 📝 Posts
- `GET /posts` — Get all posts
- `POST /posts` — Create a post (auth required)
- `GET /posts/:id` — Get post by ID
- `PATCH /posts/:id` — Update post
- `DELETE /posts/:id` — Delete post

---

## 🔒 Auth Middleware

Protected routes require a valid JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## 🧪 Testing

Use **Postman** or **cURL** to test the endpoints.

---

## 📄 License

This project is licensed under the MIT License.