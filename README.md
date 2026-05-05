# Team Task Manager - Full Stack Application

A comprehensive web application for team project management with task assignment, progress tracking, and role-based access control.

## 🚀 Features

- **Authentication**: Secure signup/login with JWT tokens
- **Project Management**: Create, manage, and organize projects
- **Team Management**: Add team members with role-based access (Admin/Member)
- **Task Management**: Create tasks, assign to team members, track status and priority
- **Dashboard**: Overview of tasks, status breakdown, and overdue task alerts
- **Role-Based Access Control**: Admin and Member roles with specific permissions
- **Real-time Status Tracking**: Update task status (To Do/In Progress/Completed)
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js >= 14.0.0
- MongoDB locally, in Docker, or a MongoDB Atlas/Railway connection string
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Navigate to project
cd Assignment

# Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Database Setup

```bash
# Copy environment variables
cp backend/.env.example backend/.env

# Update backend/.env with your MongoDB connection string
DATABASE_URL=mongodb://localhost:27017/task_manager

# Run migrations
cd backend
npm run migrate
cd ..
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Access the app at `http://localhost:3000`

## 🐳 Docker Setup

### Using Docker Compose

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start all services
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migrate

# Access
# Frontend: http://localhost:3000
# API: https://team-task-manager-full-stack-3.onrender.com
# Database: localhost:27017
```

## 🚢 Railway Deployment

### Prerequisites
- Railway account (https://railway.app)
- GitHub repository

### Step 1: Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Connect your GitHub repository

### Step 2: Add MongoDB Service

1. Click "Add Services"
2. Select "Database" -> "MongoDB"
3. Railway will automatically set `DATABASE_URL`

### Step 3: Deploy Backend

1. Add "New Service"
2. Select "GitHub Repo" (select this repo)
3. Set root directory to `backend`
4. Configure environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRE=7d
   CORS_ORIGIN=<frontend-railway-url>
   ```

### Step 4: Deploy Frontend

1. Add "New Service"
2. Select "GitHub Repo"
3. Set root directory to `frontend`
4. Build command: `npm run build`
5. Start command: `npm start`
6. Configure environment variables:
   ```
   REACT_APP_API_URL=<backend-railway-url>
   ```

### Step 5: Connect Services

1. In Railway dashboard, link Frontend to Backend
2. Update CORS_ORIGIN to frontend Railway URL
3. Deploy all services

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)

### Projects
- `GET /api/projects` - List user projects (Protected)
- `POST /api/projects` - Create project (Protected)
- `GET /api/projects/:projectId` - Get project details (Protected)
- `PUT /api/projects/:projectId` - Update project (Protected)
- `DELETE /api/projects/:projectId` - Delete project (Protected)
- `GET /api/projects/:projectId/members` - Get project members (Protected)
- `POST /api/projects/:projectId/members` - Add member (Protected)
- `DELETE /api/projects/:projectId/members/:memberId` - Remove member (Protected)

### Tasks
- `GET /api/tasks/:projectId` - List tasks (Protected)
- `POST /api/tasks/:projectId` - Create task (Protected)
- `GET /api/tasks/task/:taskId` - Get task details (Protected)
- `PUT /api/tasks/task/:taskId` - Update task (Protected)
- `DELETE /api/tasks/task/:taskId` - Delete task (Protected)
- `GET /api/tasks/dashboard/stats` - Get dashboard statistics (Protected)

## 🔐 Role-Based Access Control

### Admin Role
- Create projects
- Manage project members
- Delete projects
- Assign tasks
- View all team tasks

### Member Role
- Create tasks in assigned projects
- Update own task status
- View assigned tasks
- Collaborate on projects

## 📊 Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email
- `password`: Hashed password
- `username`: Unique display name
- `role`: Admin or Member
- `created_at`: Account creation timestamp

### Projects Table
- `id`: Primary key
- `name`: Project name
- `description`: Project description
- `owner_id`: Reference to user (project owner)
- `created_at`: Creation timestamp

### Project Members Table
- `id`: Primary key
- `project_id`: Reference to project
- `user_id`: Reference to user
- `role`: Admin or Member

### Tasks Table
- `id`: Primary key
- `project_id`: Reference to project
- `title`: Task title
- `description`: Task description
- `status`: TODO/In Progress/Completed
- `priority`: Low/Medium/High
- `assigned_to`: Reference to assigned user
- `created_by`: Reference to creator
- `due_date`: Task deadline
- `created_at`: Creation timestamp

## 🧪 Testing API Locally

### Using cURL

```bash
# Register
curl -X POST https://team-task-manager-full-stack-3.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "username": "john"
  }'

# Login
curl -X POST https://team-task-manager-full-stack-3.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Create Project (replace TOKEN with actual token)
curl -X POST https://team-task-manager-full-stack-3.onrender.com/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Q4 Planning",
    "description": "Q4 roadmap and planning"
  }'
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running
- Verify `DATABASE_URL` in `.env`
- Check MongoDB credentials

### JWT Errors
- Verify `JWT_SECRET` is set
- Check token hasn't expired
- Ensure token is in Authorization header: `Bearer <token>`

### CORS Issues
- Update `CORS_ORIGIN` in backend .env
- Ensure frontend URL matches

### Docker Issues
```bash
# Clear Docker cache
docker system prune -a

# Rebuild images
docker-compose build --no-cache

# View logs
docker-compose logs -f backend
```

## 📚 Project Structure

```
Assignment/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── migrations/
│   │   └── migrate.js
│   ├── server.js
│   ├── schema.sql
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Projects.js
│   │   │   ├── ProjectDetail.js
│   │   │   └── Register.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   └── global.css
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── ProtectedRoute.js
│   │   └── api.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── railway.yml
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review API documentation
3. Check logs: `docker-compose logs -f`

## ✅ Deployment Checklist

Before deploying to production:
- [ ] Set strong `JWT_SECRET`
- [ ] Configure production database
- [ ] Set correct `CORS_ORIGIN`
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Review security settings
- [ ] Test all API endpoints
- [ ] Test authentication flow
- [ ] Verify role-based access control
- [ ] Set up monitoring/logging
