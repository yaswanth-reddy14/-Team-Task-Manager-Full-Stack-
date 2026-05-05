@echo off
REM Start backend and frontend for development

echo 🚀 Starting Team Task Manager...
echo.

REM Start backend
echo Starting Backend (https://team-task-manager-full-stack-3.onrender.com)...
start cmd /k "cd backend && npm run dev"

REM Wait a bit before starting frontend
timeout /t 2 /nobreak

REM Start frontend
echo Starting Frontend (https://team-task-manager-full-stack-3.onrender.com)...
start cmd /k "cd frontend && npm start"

echo.
echo ✅ Services started!
echo.
echo 📌 Frontend will open automatically at https://team-task-manager-full-stack-3.onrender.com
echo 📌 Backend API at https://team-task-manager-full-stack-3.onrender.com
echo.
echo Close the terminal windows to stop the services
