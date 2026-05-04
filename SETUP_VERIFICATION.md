# Setup Verification Checklist

Use this checklist to verify that your Team Task Manager is properly set up.

## ✅ Pre-Installation

- [ ] Node.js >= 14.0.0 installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] PostgreSQL installed and running
- [ ] Git installed (for version control)
- [ ] Code editor ready (VS Code, Sublime, etc.)

## ✅ Project Setup

- [ ] Project cloned or extracted to `Assignment` folder
- [ ] All files present (check README.md exists)
- [ ] `.gitignore` file exists

## ✅ Backend Setup

### Installation
- [ ] `backend/package.json` exists
- [ ] `backend/node_modules/` created (after `npm install`)
- [ ] Dependencies installed without errors
- [ ] `backend/.env` created from `.env.example`

### Configuration
- [ ] `DATABASE_URL` set in `backend/.env`
- [ ] `JWT_SECRET` set in `backend/.env`
- [ ] `PORT` set to 5000
- [ ] `CORS_ORIGIN` set to `http://localhost:3000`

### Database
- [ ] PostgreSQL database `task_manager` created
- [ ] User created (if using custom user)
- [ ] Database migrations run (`npm run migrate`)
- [ ] Tables visible in PostgreSQL

### Server
- [ ] `backend/server.js` starts without errors
- [ ] Server listening on port 5000
- [ ] No port conflict warnings
- [ ] All routes initialized

## ✅ Frontend Setup

### Installation
- [ ] `frontend/package.json` exists
- [ ] `frontend/node_modules/` created (after `npm install`)
- [ ] Dependencies installed without errors
- [ ] `frontend/.env` created from `.env.example`

### Configuration
- [ ] `REACT_APP_API_URL` set correctly
- [ ] Value matches backend URL

### App
- [ ] `frontend/src/App.js` exists
- [ ] React app starts without errors
- [ ] App accessible at `http://localhost:3000`
- [ ] No console errors on startup

## ✅ API Testing

### Health Check
- [ ] Backend health endpoint works: `curl http://localhost:5000/api/health`
- [ ] Returns `{"status": "Server is running"}`

### Authentication
- [ ] Register endpoint works: `POST /api/auth/register`
- [ ] Login endpoint works: `POST /api/auth/login`
- [ ] Can obtain JWT token
- [ ] Token is valid

### Projects
- [ ] Create project endpoint works
- [ ] List projects endpoint works
- [ ] Get project endpoint works
- [ ] Update project endpoint works
- [ ] Delete project endpoint works

### Tasks
- [ ] Create task endpoint works
- [ ] List tasks endpoint works
- [ ] Update task endpoint works
- [ ] Delete task endpoint works
- [ ] Dashboard stats endpoint works

## ✅ Frontend Features

### Navigation
- [ ] Navigation bar displays correctly
- [ ] Home link works
- [ ] Logout button visible
- [ ] Current user email shown

### Authentication
- [ ] Registration page loads
- [ ] Can create new account
- [ ] Redirects to dashboard after signup
- [ ] Login page loads
- [ ] Can login with credentials
- [ ] Redirects to dashboard after login
- [ ] Logout clears session

### Dashboard
- [ ] Dashboard page loads
- [ ] Statistics cards display
- [ ] Task counts shown
- [ ] Overdue tasks list displays
- [ ] No errors in console

### Projects
- [ ] Projects page loads
- [ ] Create project form works
- [ ] New project appears in list
- [ ] Can click on project to view details
- [ ] Can delete project (if owner)
- [ ] Delete confirmation shows

### Project Detail
- [ ] Project name and description display
- [ ] Tasks tab shows tasks
- [ ] Can create new task
- [ ] Task form shows all fields
- [ ] Can update task status
- [ ] Team tab shows members
- [ ] Can add members (if owner)
- [ ] Can remove members (if owner)

## ✅ Data Validation

- [ ] Empty email rejected on registration
- [ ] Invalid email rejected
- [ ] Password < 6 characters rejected
- [ ] Empty password rejected
- [ ] Duplicate email rejected
- [ ] Required fields enforce validation
- [ ] Error messages display clearly

## ✅ Responsive Design

- [ ] App looks good on desktop (1920px+)
- [ ] App looks good on tablet (768px)
- [ ] App looks good on mobile (375px)
- [ ] Buttons are clickable on touch
- [ ] Text is readable on all sizes
- [ ] Navigation adapts to screen size

## ✅ Performance

- [ ] Page loads in < 3 seconds
- [ ] No lag on interactions
- [ ] Task list loads quickly
- [ ] Dashboard loads quickly
- [ ] No memory leaks in console
- [ ] No pending requests after navigation

## ✅ Error Handling

- [ ] 404 error shows proper message
- [ ] 401 error redirects to login
- [ ] 403 error shows permission denied
- [ ] Network errors show user-friendly message
- [ ] Validation errors are clear
- [ ] No JavaScript errors in console

## ✅ Database

- [ ] Can connect to PostgreSQL
- [ ] All tables created:
  - [ ] `users` table
  - [ ] `projects` table
  - [ ] `project_members` table
  - [ ] `tasks` table
- [ ] Relationships are correct
- [ ] Indexes created
- [ ] Constraints enforced

## ✅ Docker (If Using)

- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] `docker-compose.yml` exists
- [ ] Can build images
- [ ] Services start with `docker-compose up`
- [ ] Can access frontend and backend
- [ ] Database service runs

## ✅ Security

- [ ] Passwords are hashed
- [ ] JWT tokens work correctly
- [ ] Protected routes require login
- [ ] CORS properly configured
- [ ] No sensitive data in logs
- [ ] No hardcoded secrets

## ✅ Documentation

- [ ] README.md is readable
- [ ] QUICK_START.md is helpful
- [ ] API_TESTING.md has examples
- [ ] FEATURES.md is comprehensive
- [ ] RAILWAY_DEPLOYMENT.md is clear
- [ ] All docs are accessible

## ✅ Deployment (Railway)

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Connected to GitHub
- [ ] PostgreSQL service created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables set
- [ ] Services connected
- [ ] Production URLs working

## 🚨 Troubleshooting Checklist

If something doesn't work:

- [ ] Check terminal for error messages
- [ ] Check browser console (F12)
- [ ] Verify all environment variables
- [ ] Verify PostgreSQL is running
- [ ] Verify ports aren't in use
- [ ] Try clearing node_modules and reinstalling
- [ ] Try clearing browser cache
- [ ] Check README.md Troubleshooting section
- [ ] Check logs: `docker-compose logs -f`

## 📋 Feature Verification

### Authentication
- [ ] Signup works
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes work
- [ ] Tokens expire

### Projects
- [ ] Can create project
- [ ] Can view projects
- [ ] Can update project
- [ ] Can delete project
- [ ] Projects persist in database

### Team
- [ ] Can add members
- [ ] Can view members
- [ ] Can remove members
- [ ] Roles are assigned
- [ ] Access control works

### Tasks
- [ ] Can create task
- [ ] Can view tasks
- [ ] Can update task status
- [ ] Can delete task
- [ ] Tasks persist in database
- [ ] Can assign to members
- [ ] Priority levels work
- [ ] Due dates work

### Dashboard
- [ ] Task stats show correctly
- [ ] Overdue tasks display
- [ ] Stats update on task changes
- [ ] No data leakage between users

## ✅ Final Sign-Off

- [ ] All features working
- [ ] No console errors
- [ ] Database operations successful
- [ ] API endpoints responsive
- [ ] Frontend responsive
- [ ] Ready for production
- [ ] Documentation reviewed
- [ ] Deployment tested

---

**If all checkboxes are checked, your Team Task Manager is ready to use! 🎉**

For any unchecked items, refer to:
1. QUICK_START.md - Setup help
2. README.md - General documentation
3. Specific service README files
4. API_TESTING.md - API troubleshooting
5. RAILWAY_DEPLOYMENT.md - Deployment help
