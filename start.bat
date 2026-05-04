@echo off
REM Start backend and frontend for development

echo 🚀 Starting Team Task Manager...
echo.

REM Start backend
echo Starting Backend (http://localhost:5000)...
start cmd /k "cd backend && npm run dev"

REM Wait a bit before starting frontend
timeout /t 2 /nobreak

REM Start frontend
echo Starting Frontend (http://localhost:3000)...
start cmd /k "cd frontend && npm start"

echo.
echo ✅ Services started!
echo.
echo 📌 Frontend will open automatically at http://localhost:3000
echo 📌 Backend API at http://localhost:5000
echo.
echo Close the terminal windows to stop the services
