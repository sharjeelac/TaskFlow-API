# TaskFlow API

A powerful and flexible Node.js-based RESTful API for managing collaborative projects, tasks, subtasks, and team notes. Built with Express.js, MongoDB, and modern authentication practices.

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express.js](https://img.shields.io/badge/Express-5.2+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-9.2+-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🚀 Features

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ JWT-based authentication with refresh token mechanism
- ✅ Password management (change, forgot, reset)
- ✅ Email verification with temporary tokens
- ✅ Role-based access control (Admin, Project Admin, Member)

### Project Management
- ✅ Create, read, update, and delete projects
- ✅ Project member management with role assignment
- ✅ Hierarchical access control for team members
- ✅ Real-time member count and project information

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Task assignment and status tracking
- ✅ File attachments for tasks
- ✅ Subtask support for task breakdown
- ✅ Task status management (Todo, In Progress, Done)

### Additional Features
- ✅ Project notes/comments system
- ✅ Error handling and validation
- ✅ Async/await error wrapper
- ✅ API response standardization
- ✅ CORS enabled for cross-origin requests
- ✅ Cookie-based session management

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow-api.git
   cd taskflow-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration))

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
SERVER_URL=http://localhost:5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskflow
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow

# JWT Tokens
ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRY=30d

# Email Configuration (using Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@taskflow.com

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The API will start on `http://localhost:5000`

### Production Mode
```bash
npm start
```

## 📚 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/logout` | Logout user | ✅ |
| GET | `/current-user` | Get current user info | ✅ |
| GET | `/verify-email/:token` | Verify email | ❌ |
| POST | `/resend-email-verification` | Resend verification email | ✅ |
| POST | `/refresh-token` | Refresh access token | ❌ |
| POST | `/forgot-password` | Request password reset | ❌ |
| POST | `/reset-password/:token` | Reset password | ❌ |
| POST | `/change-password` | Change current password | ✅ |

### Project Routes (`/api/v1/projects`)

| Method | Endpoint | Description | Auth | Permissions |
|--------|----------|-------------|------|-------------|
| GET | `/` | Get all projects | ✅ | All users |
| POST | `/` | Create project | ✅ | All users |
| GET | `/:projectId` | Get project details | ✅ | Project members |
| PUT | `/:projectId` | Update project | ✅ | Admin only |
| DELETE | `/:projectId` | Delete project | ✅ | Admin only |
| GET | `/:projectId/members` | Get project members | ✅ | Project members |
| POST | `/:projectId/members` | Add member | ✅ | Admin only |
| PUT | `/:projectId/members/:userId` | Update member role | ✅ | Admin only |
| DELETE | `/:projectId/members/:userId` | Remove member | ✅ | Admin only |

### Task Routes (`/api/v1/tasks`)

| Method | Endpoint | Description | Auth | Permissions |
|--------|----------|-------------|------|-------------|
| GET | `/:projectId` | Get all tasks | ✅ | Project members |
| POST | `/:projectId` | Create task | ✅ | Project members |
| GET | `/:projectId/:taskId` | Get task details | ✅ | Project members |
| PUT | `/:projectId/:taskId` | Update task | ✅ | Project members |
| DELETE | `/:projectId/:taskId` | Delete task | ✅ | Project members |
| POST | `/:taskId/subtasks` | Create subtask | ✅ | Task creator |
| PUT | `/:taskId/subtasks/:subTaskId` | Update subtask | ✅ | Task creator |
| DELETE | `/:taskId/subtasks/:subTaskId` | Delete subtask | ✅ | Task creator |

### Notes Routes (`/api/v1/notes`)

| Method | Endpoint | Description | Auth | Permissions |
|--------|----------|-------------|------|-------------|
| GET | `/:projectId` | Get all notes | ✅ | Project members |
| POST | `/:projectId` | Create note | ✅ | Project members |
| GET | `/:projectId/:noteId` | Get note details | ✅ | Project members |
| PUT | `/:noteId` | Update note | ✅ | Note creator |
| DELETE | `/:noteId` | Delete note | ✅ | Note creator |

### Health Check (`/api/v1/health`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/check` | Server health status |

## 📁 Project Structure

```
taskflow-api/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── index.js               # Application entry point
│   ├── controllers/           # Route handlers
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── task.controller.js
│   │   ├── note.controller.js
│   │   └── healthcheck.controller.js
│   ├── models/                # Database schemas
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   ├── task.model.js
│   │   ├── subtask.model.js
│   │   ├── note.model.js
│   │   └── projectMember.model.js
│   ├── routes/                # API routes
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   ├── note.routes.js
│   │   └── healthcheck.routes.js
│   ├── middlewares/           # Custom middlewares
│   │   ├── auth.middleware.js
│   │   ├── multer.middleware.js
│   │   └── validator.middleware.js
│   ├── utils/                 # Utility functions
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   ├── validators/            # Input validators
│   │   └── index.js
│   └── db/                    # Database connection
│       └── db.js
├── public/                    # Static files
│   └── images/
├── .env.example               # Environment variables template
├── package.json               # Project dependencies
├── README.md                  # This file
└── PRD.md                     # Product requirements document
```

## 🛠️ Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js 5.2+
- **Database:** MongoDB 9.2+ with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer with Mailgen
- **File Upload:** Multer
- **Utilities:** dotenv, cors, cookie-parser

## 📖 Usage Examples

### Register a User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "john_doe",
    "password": "SecurePass123",
    "fullName": "John Doe"
  }'
```

### Create a Project
```bash
curl -X POST http://localhost:5000/api/v1/projects \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Project Alpha",
    "description": "A collaborative project"
  }'
```

### Create a Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks/:projectId \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Homepage",
    "description": "Create mockups for the landing page",
    "status": "todo"
  }'
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Email verification tokens
- ✅ Password reset tokens
- ✅ CORS protection
- ✅ HTTP-only cookies
- ✅ Role-based access control
- ✅ Request validation

## 📝 API Response Format

All responses follow a standardized format:

### Success Response
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "username": "john_doe",
      "fullName": "John Doe"
    }
  },
  "message": "User fetched successfully"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Email and password are required",
  "errors": []
}
```

## 🐛 Error Handling

The API uses consistent error handling with the following error codes:

- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication error)
- `403` - Forbidden (permission error)
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow Express.js best practices
- Use async/await instead of callbacks
- Write clear, descriptive commit messages
- Add validation for all user inputs
- Test your changes before submitting a PR

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 📞 Support

For support, email support@taskflow.com or open an issue on GitHub.

## 🙏 Acknowledgments

- MongoDB documentation
- Express.js community
- Mongoose documentation
- JWT best practices

---

**Happy coding! 🚀**
