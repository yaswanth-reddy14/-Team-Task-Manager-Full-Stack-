# Project Structure Overview

Complete directory structure of the Team Task Manager application.

```
Assignment/
│
├── 📄 README.md                          # Main project documentation
├── 📄 QUICK_START.md                     # Quick start guide
├── 📄 FEATURES.md                        # Features & implementation details
├── 📄 API_TESTING.md                     # API testing guide
├── 📄 RAILWAY_DEPLOYMENT.md              # Railway deployment guide
├── 📄 docker-compose.yml                 # Docker Compose configuration
├── 📄 railway.yml                        # Railway configuration
├── 📄 setup.sh                           # Automated setup (Linux/Mac)
├── 📄 setup.bat                          # Automated setup (Windows)
├── 📄 start.sh                           # Start services (Linux/Mac)
├── 📄 start.bat                          # Start services (Windows)
├── 📄 .gitignore                         # Git ignore rules
│
├── 📁 backend/                           # Backend Node.js/Express server
│   │
│   ├── 📄 server.js                      # Express app entry point
│   ├── 📄 schema.sql                     # Database schema
│   ├── 📄 package.json                   # Node dependencies
│   ├── 📄 .env.example                   # Environment template
│   ├── 📄 .gitignore                     # Backend git ignore
│   ├── 📄 Dockerfile                     # Docker image config
│   ├── 📄 app.json                       # App manifest
│   ├── 📄 README.md                      # Backend documentation
│   │
│   ├── 📁 config/
│   │   └── 📄 database.js                # PostgreSQL connection pool
│   │
│   ├── 📁 middleware/
│   │   └── 📄 auth.js                    # JWT & RBAC middleware
│   │
│   ├── 📁 controllers/
│   │   ├── 📄 authController.js          # Authentication logic
│   │   ├── 📄 projectController.js       # Project management logic
│   │   └── 📄 taskController.js          # Task management logic
│   │
│   ├── 📁 routes/
│   │   ├── 📄 auth.js                    # Authentication routes
│   │   ├── 📄 projects.js                # Project routes
│   │   └── 📄 tasks.js                   # Task routes
│   │
│   └── 📁 migrations/
│       └── 📄 migrate.js                 # Database migration script
│
├── 📁 frontend/                          # React web application
│   │
│   ├── 📄 package.json                   # React dependencies
│   ├── 📄 .env.example                   # Environment template
│   ├── 📄 .gitignore                     # Frontend git ignore
│   ├── 📄 Dockerfile                     # Docker image config
│   ├── 📄 README.md                      # Frontend documentation
│   │
│   ├── 📁 public/
│   │   └── 📄 index.html                 # Main HTML file
│   │
│   └── 📁 src/
│       │
│       ├── 📄 App.js                     # Main app component
│       ├── 📄 index.js                   # React entry point
│       ├── 📄 api.js                     # API client (axios)
│       ├── 📄 ProtectedRoute.js          # Route protection component
│       │
│       ├── 📁 context/
│       │   └── 📄 AuthContext.js         # Auth state management
│       │
│       ├── 📁 pages/
│       │   ├── 📄 Login.js               # Login page
│       │   ├── 📄 Register.js            # Registration page
│       │   ├── 📄 Dashboard.js           # Dashboard page
│       │   ├── 📄 Projects.js            # Projects list page
│       │   └── 📄 ProjectDetail.js       # Project detail page
│       │
│       └── 📁 styles/
│           ├── 📄 global.css             # Global styles
│           ├── 📄 Auth.css               # Auth pages styling
│           └── 📄 Dashboard.css          # Dashboard styling
```

## 📋 File Descriptions

### Root Level Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation with setup, features, and deployment |
| `QUICK_START.md` | Fast setup guide for getting started quickly |
| `FEATURES.md` | Detailed feature list and technical implementation |
| `API_TESTING.md` | API endpoint testing guide with examples |
| `RAILWAY_DEPLOYMENT.md` | Step-by-step Railway deployment guide |
| `docker-compose.yml` | Docker Compose for local multi-container development |
| `railway.yml` | Railway platform configuration |
| `setup.sh` | Automated setup script for Linux/Mac |
| `setup.bat` | Automated setup script for Windows |
| `start.sh` | Start both services (Linux/Mac) |
| `start.bat` | Start both services (Windows) |
| `.gitignore` | Git ignore patterns |

### Backend Files

| Directory/File | Purpose |
|---|---|
| `server.js` | Express app initialization and routing |
| `schema.sql` | PostgreSQL database schema with tables and indexes |
| `package.json` | Node.js dependencies and scripts |
| `.env.example` | Template for environment variables |
| `Dockerfile` | Docker image definition for backend |
| `app.json` | App manifest for deployment |
| `README.md` | Backend-specific documentation |
| `config/database.js` | PostgreSQL connection pool setup |
| `middleware/auth.js` | JWT token validation and RBAC middleware |
| `controllers/authController.js` | User registration, login, profile logic |
| `controllers/projectController.js` | Project CRUD and team management |
| `controllers/taskController.js` | Task CRUD and dashboard stats |
| `routes/auth.js` | Authentication endpoints |
| `routes/projects.js` | Project and team endpoints |
| `routes/tasks.js` | Task and dashboard endpoints |
| `migrations/migrate.js` | Database initialization script |

### Frontend Files

| Directory/File | Purpose |
|---|---|
| `package.json` | React dependencies and scripts |
| `.env.example` | API URL environment variable template |
| `Dockerfile` | Docker image definition for frontend |
| `README.md` | Frontend-specific documentation |
| `public/index.html` | Main HTML file |
| `src/App.js` | Main app component with routing |
| `src/index.js` | React DOM render entry point |
| `src/api.js` | Axios API client with interceptors |
| `src/ProtectedRoute.js` | Protected route wrapper component |
| `context/AuthContext.js` | Global authentication state (Context API) |
| `pages/Login.js` | User login page |
| `pages/Register.js` | User registration page |
| `pages/Dashboard.js` | Dashboard with task statistics |
| `pages/Projects.js` | Projects list and creation |
| `pages/ProjectDetail.js` | Project details with tasks and team |
| `styles/global.css` | Global CSS styles |
| `styles/Auth.css` | Authentication pages styles |
| `styles/Dashboard.css` | Dashboard and project pages styles |

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │  Pages       │  │  Context     │  │  Components    │   │
│  │  (Login,     │→ │  (AuthCtx)   │→ │  (Protected)   │   │
│  │   Projects)  │  │              │  │                │   │
│  └──────────────┘  └──────────────┘  └────────────────┘   │
└──────────────────────┬─────────────────────────────────────┘
                       │ API Calls (axios)
                       │ http://localhost:5000
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Express)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │  Routes      │  │  Middleware  │  │  Controllers   │   │
│  │  (/api/...)  │→ │  (auth.js)   │→ │  (business     │   │
│  │              │  │              │  │   logic)       │   │
│  └──────────────┘  └──────────────┘  └────────────────┘   │
└──────────────────────┬─────────────────────────────────────┘
                       │ SQL Queries
                       │ pg library
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  users   │ │projects  │ │ project_ │ │  tasks   │      │
│  │  table   │ │  table   │ │members   │ │  table   │      │
│  │          │ │          │ │  table   │ │          │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Key Relationships

```
User (1)
  ├── (1:N) Projects Created (owner_id)
  ├── (N:N) Projects Member Of (project_members)
  ├── (1:N) Tasks Created (created_by)
  └── (1:N) Tasks Assigned (assigned_to)

Project (1)
  ├── (N:1) Owner (user)
  ├── (1:N) Team Members (project_members)
  └── (1:N) Tasks

Task (1)
  ├── (N:1) Project
  ├── (N:1) Assigned To (user)
  └── (N:1) Created By (user)
```

## 📦 Dependencies

### Backend
- **express**: Web framework
- **pg**: PostgreSQL client
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **joi**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **nodemon**: Development server reload

### Frontend
- **react**: UI library
- **react-dom**: React rendering
- **react-router-dom**: Client routing
- **axios**: HTTP client

## 🚀 Deployment Structure

```
Project
├── GitHub Repository
└── Railway Deployment
    ├── PostgreSQL Service (Database)
    ├── Backend Service (API)
    └── Frontend Service (Web App)
```

## 📊 Database Tables

1. **users** - User accounts and roles
2. **projects** - Projects owned by users
3. **project_members** - Team membership
4. **tasks** - Project tasks with assignments

All tables have proper indexes for performance.

## 🔐 API Endpoints Structure

```
/api/auth
├── POST   /register        - Register new user
├── POST   /login           - User login
└── GET    /profile         - Get user profile

/api/projects
├── GET    /                - List user projects
├── POST   /                - Create project
├── GET    /:projectId      - Get project details
├── PUT    /:projectId      - Update project
├── DELETE /:projectId      - Delete project
├── GET    /:projectId/members      - List members
├── POST   /:projectId/members      - Add member
└── DELETE /:projectId/members/:id  - Remove member

/api/tasks
├── POST   /:projectId      - Create task
├── GET    /:projectId      - List tasks
├── GET    /dashboard/stats - Get statistics
├── GET    /task/:taskId    - Get task details
├── PUT    /task/:taskId    - Update task
└── DELETE /task/:taskId    - Delete task
```

## 💾 Environment Configuration

### Backend
```
NODE_ENV                    # development/production
PORT                        # Server port (default 5000)
DATABASE_URL               # PostgreSQL connection string
JWT_SECRET                 # Secret for JWT signing
JWT_EXPIRE                 # Token expiration time
CORS_ORIGIN                # Frontend URL
```

### Frontend
```
REACT_APP_API_URL          # Backend API URL
```

## 📝 Development Workflow

```
1. Develop locally with npm run dev
2. Test APIs with cURL or Postman
3. Commit to Git repository
4. Push to GitHub
5. Railway automatically deploys
6. Test on production Railway URL
```

## 🎯 Project Features Summary

✅ User authentication with JWT
✅ Project management (CRUD)
✅ Team member management
✅ Task management (CRUD)
✅ Role-based access control
✅ Dashboard with statistics
✅ Overdue task alerts
✅ Responsive design
✅ Input validation
✅ Error handling
✅ Docker support
✅ Railway deployment ready

---

This comprehensive structure ensures maintainability, scalability, and clean separation of concerns between frontend, backend, and database layers.
