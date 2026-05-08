# Team Task Manager

Team Task Manager is a full-stack web application for managing team projects and tasks. Users can register, log in, create projects, add team members, assign tasks, update task status, and track progress through a dashboard.

## Live Links

- Backend: https://team-task-manager-full-stack-3.onrender.com
- Frontend: https://team-task-manager-full-stack-4.onrender.com/
- Repository: https://github.com/yaswanth-reddy14/-Team-Task-Manager-Full-Stack-

## Tech Stack

**Frontend**

- React.js
- React Router
- Axios
- CSS

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Joi Validation
- CORS

**Deployment**

- Render
- MongoDB Atlas

## Features

- User registration and login
- JWT-based authentication
- Protected frontend routes
- Create, view, edit, and delete projects
- Add registered users as project members
- Role-based project access
- Create, assign, update, and delete tasks
- Set task priority and due date
- Update task status
- Track overdue tasks
- Dashboard statistics

## Project Structure

```text
Team-Task-Manager/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- server.js
|   `-- package.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- styles/
|   |   |-- api.js
|   |   `-- App.js
|   `-- package.json
`-- README.md
```

## Environment Variables

### Backend

Create a `.env` file inside the `backend` folder.

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend

Create a `.env` file inside the `frontend` folder.

```env
REACT_APP_API_URL=http://localhost:5000
```

For production, set `REACT_APP_API_URL` to the deployed backend URL.

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Projects

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:projectId
PUT    /api/projects/:projectId
DELETE /api/projects/:projectId
```

### Project Members

```text
GET    /api/projects/:projectId/members
POST   /api/projects/:projectId/members
DELETE /api/projects/:projectId/members/:memberId
```

### Tasks

```text
GET    /api/tasks/:projectId
POST   /api/tasks/:projectId
GET    /api/tasks/task/:taskId
PUT    /api/tasks/task/:taskId
DELETE /api/tasks/task/:taskId
GET    /api/tasks/dashboard/stats
```

## Deployment

The backend is deployed on Render and uses MongoDB Atlas for the database.

For frontend deployment on Render Static Site:

```text
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: build
```

Set the frontend environment variable: https://team-task-manager-full-stack-4.onrender.com/

```env
REACT_APP_API_URL=https://team-task-manager-full-stack-3.onrender.com
```

For React Router, add this rewrite rule:

```text
Source Path: /*
Destination Path: /index.html
Action: Rewrite
```

After frontend deployment, update the backend `CORS_ORIGIN` value with the deployed frontend URL.

## Author

Yaswanth Reddy
