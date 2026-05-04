@echo off
REM Team Task Manager Setup Script for Windows

echo.
echo 🚀 Team Task Manager - Setup Script
echo ====================================
echo.

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js ^>= 14
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected

REM Check npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm not found
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% detected

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd backend

if not exist .env (
    echo ⚙️  Creating .env from template...
    copy .env.example .env
    echo ⚠️  Please update backend\.env with your database credentials
)

echo 📥 Installing backend dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed
cd ..

REM Setup Frontend
echo.
echo 🎨 Setting up Frontend...
cd frontend

if not exist .env (
    echo ⚙️  Creating .env from template...
    copy .env.example .env
    echo ✅ Frontend .env created
)

echo 📥 Installing frontend dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed
cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 🔧 Next Steps:
echo 1. Configure database in backend\.env
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. In another terminal, start frontend: cd frontend ^&^& npm start
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📚 For more details, see README.md
echo.
pause
