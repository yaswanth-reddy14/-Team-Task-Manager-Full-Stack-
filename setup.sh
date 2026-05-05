#!/bin/bash

# Team Task Manager Setup Script

echo "🚀 Team Task Manager - Setup Script"
echo "===================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js >= 14"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚙️  Creating .env from template..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your database credentials"
fi

echo "📥 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd frontend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚙️  Creating .env from template..."
    cp .env.example .env
    echo "✅ Frontend .env created"
fi

echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🔧 Next Steps:"
echo "1. Configure database in backend/.env"
echo "2. Start backend: cd backend && npm run dev"
echo "3. In another terminal, start frontend: cd frontend && npm start"
echo "4. Open https://team-task-manager-full-stack-3.onrender.com in your browser"
echo ""
echo "📚 For more details, see README.md"
