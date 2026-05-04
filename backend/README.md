# Backend - Team Task Manager

Node.js/Express REST API with MongoDB database for team task management.

## 🚀 Quick Start

### Setup

```bash
npm install
cp .env.example .env
# Update .env with your database credentials
npm run migrate  # Initialize database
npm run dev      # Start development server
```

### Build & Deploy

```bash
npm start      # Start production server
```

## 📝 API Reference

### Auth Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "john"
}

Response: { user, token }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { user, token }
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>

Response: { id, username, email, role, created_at }
```

### Project Endpoints

#### List Projects
```
GET /api/projects
Authorization: Bearer <token>

Response: Array of projects
```

#### Create Project
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Project description"
}

Response: { id, name, description, owner_id, created_at }
```

#### Get Project Details
```
GET /api/projects/:projectId
Authorization: Bearer <token>

Response: { id, name, description, owner_id, created_at }
```

#### Update Project
```
PUT /api/projects/:projectId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}

Response: Updated project object
```

#### Delete Project
```
DELETE /api/projects/:projectId
Authorization: Bearer <token>

Response: { message: "Project deleted successfully" }
```

#### List Project Members
```
GET /api/projects/:projectId/members
Authorization: Bearer <token>

Response: Array of members with user details
```

#### Add Project Member
```
POST /api/projects/:projectId/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "user_id": 2,
  "role": "Member"
}

Response: { id, project_id, user_id, role, created_at }
```

#### Remove Project Member
```
DELETE /api/projects/:projectId/members/:memberId
Authorization: Bearer <token>

Response: { message: "Member removed successfully" }
```

### Task Endpoints

#### List Tasks
```
GET /api/tasks/:projectId?status=TODO&assigned_to=<userId>
Authorization: Bearer <token>

Query Parameters (optional):
- status: TODO, In Progress, Completed
- assigned_to: User ID

Response: Array of tasks
```

#### Create Task
```
POST /api/tasks/:projectId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description",
  "priority": "High",
  "status": "TODO",
  "assigned_to": "<userId>",
  "due_date": "2024-12-31T23:59:59Z"
}

Response: { id, project_id, title, description, status, priority, assigned_to, created_by, due_date, created_at }
```

#### Get Task Details
```
GET /api/tasks/task/:taskId
Authorization: Bearer <token>

Response: Task object with assigned user details
```

#### Update Task
```
PUT /api/tasks/task/:taskId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "Medium"
}

Response: Updated task object
```

#### Delete Task
```
DELETE /api/tasks/task/:taskId
Authorization: Bearer <token>

Response: { message: "Task deleted successfully" }
```

#### Get Dashboard Statistics
```
GET /api/tasks/dashboard/stats
Authorization: Bearer <token>

Response: {
  "stats": {
    "total_tasks": 10,
    "todo_count": 3,
    "in_progress_count": 4,
    "completed_count": 3,
    "overdue_count": 1
  },
  "overdue_tasks": [...]
}
```

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained via login/register and expire after 7 days (configurable via `JWT_EXPIRE`).

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js         # Database connection
├── controllers/
│   ├── authController.js   # Auth logic
│   ├── projectController.js # Project logic
│   └── taskController.js   # Task logic
├── middleware/
│   └── auth.js             # JWT & RBAC middleware
├── routes/
│   ├── auth.js             # Auth routes
│   ├── projects.js         # Project routes
│   └── tasks.js            # Task routes
├── migrations/
│   └── migrate.js          # Database migration script
├── server.js               # Express app & server
├── schema.sql              # Database schema
├── package.json
├── Dockerfile
├── app.json
└── .env.example
```

## 🔧 Configuration

### Environment Variables

```
NODE_ENV=development                                    # Environment
PORT=5000                                               # Server port
DATABASE_URL=mongodb://localhost:27017/task_manager
JWT_SECRET=your-secret-key                             # JWT signing key
JWT_EXPIRE=7d                                           # Token expiration
CORS_ORIGIN=http://localhost:3000                      # Frontend URL
```

## 🐳 Docker

### Build Image
```bash
docker build -t task-manager-api:latest .
```

### Run Container
```bash
docker run -p 5000:5000 \
  -e DATABASE_URL=mongodb://host:27017/task_manager \
  -e JWT_SECRET=your-secret \
  task-manager-api:latest
```

## 📊 Database

Uses MongoDB with Mongoose models for users, projects, project members, and tasks.

Run `npm run migrate` to sync MongoDB indexes.

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- CORS protection
- Input validation with Joi
- Request validation and document relationships through Mongoose
- Role-based access control (RBAC)

## 🚀 Deployment

### Railway

```bash
# Deploy backend service
railway up
```

See root README.md for complete Railway deployment guide.

### Docker Compose

```bash
docker-compose up backend
```

## 📝 Error Handling

All errors return appropriate HTTP status codes:
- `400` - Bad request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error

## 🧪 Testing

Use cURL, Postman, or similar tools with the API endpoints documented above.

Example with cURL:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"pass123"}'
```
