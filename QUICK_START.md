# Quick Start Guide

Get the Team Task Manager up and running in minutes!

## 🚀 Fastest Way to Get Started

### Option 1: Automatic Setup (Recommended)

**Windows:**
```batch
setup.bat
```

**Linux/Mac:**
```bash
bash setup.sh
```

This will:
- ✅ Check Node.js and npm
- ✅ Install all dependencies
- ✅ Create environment files
- ✅ Prepare database

### Option 2: Manual Setup

**1. Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
```

**2. Configure database**
```bash
# Edit backend/.env
# Update DATABASE_URL with your PostgreSQL connection
DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
```

**3. Run database migrations**
```bash
cd backend
npm run migrate
```

**4. Start services**

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

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: https://team-task-manager-full-stack-3.onrender.com
- **API Health Check**: https://team-task-manager-full-stack-3.onrender.com/api/health

## 👤 Create Your First Account

1. Open http://localhost:3000
2. Click "Register here"
3. Fill in your details:
   - First Name
   - Last Name
   - Email
   - Password (minimum 6 characters)
4. Click Register

## 📋 Try the Features

### 1. Create a Project
1. Click "Projects" in navigation
2. Click "+ New Project"
3. Enter project details
4. Click "Create"

### 2. Create a Task
1. Click on your project
2. Click "+ New Task" in Tasks tab
3. Fill in:
   - Task Title
   - Description
   - Priority (Low/Medium/High)
   - Due Date (optional)
4. Click "Create Task"

### 3. Add Team Members
1. In project detail, go to Team tab
2. Add members by their email
3. Set their role (Admin/Member)

### 4. View Dashboard
1. Click "Dashboard" in navigation
2. See your task statistics:
   - Total tasks
   - Todo/In Progress/Done counts
   - Overdue tasks
3. Get alerts for overdue tasks

## 🗄️ Database Setup Details

### PostgreSQL Installation

**Windows:**
- Download: https://www.postgresql.org/download/windows/
- During setup, remember the password you set
- Default port: 5432

**Mac (with Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE task_manager;

# Create user (optional, for security)
CREATE USER taskuser WITH PASSWORD 'your_password';
ALTER ROLE taskuser SET client_encoding TO 'utf8';
ALTER ROLE taskuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE taskuser SET default_transaction_deferrable TO on;
ALTER ROLE taskuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE task_manager TO taskuser;

# Exit
\q
```

### Update .env

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/task_manager
```

Or if using custom user:
```
DATABASE_URL=postgresql://taskuser:your_password@localhost:5432/task_manager
```

## 🐳 Docker Setup

### Prerequisite: Install Docker
- Windows/Mac: https://www.docker.com/products/docker-desktop
- Linux: https://docs.docker.com/engine/install/

### Run with Docker Compose

```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start all services
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migrate

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access at: http://localhost:3000

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database connection fails
```bash
# Check PostgreSQL is running
# Windows: Services app or Windows Menu
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Verify DATABASE_URL in backend/.env
# Test connection:
psql "postgresql://user:password@localhost:5432/task_manager"
```

### Port already in use
```bash
# Backend (port 5000)
npx lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Frontend (port 3000)
npx lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### CORS errors in frontend
- Verify backend is running
- Check `CORS_ORIGIN` in backend/.env
- Restart backend after .env changes

## 📚 Next Steps

1. **Read Full Documentation**: See [README.md](README.md)
2. **Backend API**: See [backend/README.md](backend/README.md)
3. **Frontend App**: See [frontend/README.md](frontend/README.md)
4. **Deploy**: See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

## 🎯 Common Tasks

### Add Admin User (in database)
```sql
UPDATE users SET role = 'Admin' WHERE email = 'your_email@example.com';
```

### Reset Database
```bash
cd backend
# Remove all tables (careful!)
# Then run migrations again
npm run migrate
```

### View Database
```bash
# Connect to database
psql "postgresql://user:password@localhost:5432/task_manager"

# List tables
\dt

# View users
SELECT id, email, role FROM users;

# Exit
\q
```

## 🚀 Ready for Production?

See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for deployment to Railway!

## 📞 Need Help?

- Check error messages in browser console (F12)
- View backend logs in terminal
- Read README files in each directory
- Review API endpoints in backend/README.md

Enjoy your Team Task Manager! 🎉
