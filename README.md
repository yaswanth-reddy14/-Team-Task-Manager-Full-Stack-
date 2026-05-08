# Team Task Manager - Full Stack Web Application

## Project Title

Team Task Manager

## Project Description

Team Task Manager is a full-stack web application built for managing team projects and tasks. It allows users to register, log in, create projects, add team members, assign tasks, update task status, and track progress using a dashboard.

The application includes secure authentication, protected routes, project management, team member management, task assignment, and dashboard statistics.

## Live Backend URL

https://team-task-manager-full-stack-3.onrender.com

## Live Frontend URL

Frontend URL will be added after frontend deployment.

## GitHub Repository

https://github.com/yaswanth-reddy14/-Team-Task-Manager-Full-Stack-

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Joi Validation
- CORS

### Deployment

- Backend deployed on Render
- Frontend can be deployed on Render Static Site
- Database hosted using MongoDB Atlas

## Main Features

- User registration
- User login
- JWT-based authentication
- Protected frontend routes
- Create projects
- View project list
- Edit and delete projects
- Add registered users as project members
- Create tasks inside projects
- Assign tasks to team members
- Update task status
- Set task priority
- Track overdue tasks
- Dashboard statistics
- Role-based project access

## API Base URL

https://team-task-manager-full-stack-3.onrender.com

## Important API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Projects

- GET /api/projects
- POST /api/projects
- GET /api/projects/:projectId
- PUT /api/projects/:projectId
- DELETE /api/projects/:projectId

### Project Members

- GET /api/projects/:projectId/members
- POST /api/projects/:projectId/members
- DELETE /api/projects/:projectId/members/:memberId

### Tasks

- GET /api/tasks/:projectId
- POST /api/tasks/:projectId
- GET /api/tasks/task/:taskId
- PUT /api/tasks/task/:taskId
- DELETE /api/tasks/task/:taskId
- GET /api/tasks/dashboard/stats

## Environment Variables

### Backend

NODE_ENV=production
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=your_frontend_url

### Frontend

REACT_APP_API_URL=https://team-task-manager-full-stack-3.onrender.com

## Local Setup Instructions

### Backend Setup

1. Open the backend folder.
2. Install dependencies:

   npm install

3. Create a .env file with the required backend environment variables.
4. Start the backend:

   npm run dev

Backend runs locally on:

http://localhost:5000

### Frontend Setup

1. Open the frontend folder.
2. Install dependencies:

   npm install

3. Create a .env file:

   REACT_APP_API_URL=http://localhost:5000

4. Start the frontend:

   npm start

Frontend runs locally on:

http://localhost:3000

## Deployment Details

The backend is deployed on Render as a Web Service.

Backend deployment URL:

https://team-task-manager-full-stack-3.onrender.com

For frontend deployment, Render Static Site can be used with the following settings:

Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: build

Frontend environment variable:

REACT_APP_API_URL=https://team-task-manager-full-stack-3.onrender.com

React Router rewrite rule:

Source Path: /*
Destination Path: /index.html
Action: Rewrite

After frontend deployment, the backend CORS_ORIGIN variable should be updated with the deployed frontend URL.

## How To Use The Application

1. Open the frontend URL.
2. Register a new user account.
3. Log in using the registered email and password.
4. Create a new project.
5. Add registered team members to the project.
6. Create tasks under the project.
7. Assign tasks to project members.
8. Update task status as work progresses.
9. View dashboard statistics and overdue tasks.

## Author

Yaswanth Reddy
