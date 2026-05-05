#!/bin/bash

# Start both backend and frontend in development mode

echo "🚀 Starting Team Task Manager..."
echo ""

# Check if processes can run in parallel
if ! command -v tmux &> /dev/null; then
    echo "⚠️  tmux not found. Starting services sequentially."
    echo ""
    echo "📌 Backend (https://team-task-manager-full-stack-3.onrender.com)"
    cd backend
    npm run dev &
    BACKEND_PID=$!
    
    sleep 2
    
    echo ""
    echo "📌 Frontend (http://localhost:3000)"
    cd ../frontend
    npm start &
    FRONTEND_PID=$!
    
    echo ""
    echo "✅ Services started!"
    echo "   - Backend PID: $BACKEND_PID"
    echo "   - Frontend PID: $FRONTEND_PID"
    echo ""
    echo "Press Ctrl+C to stop both services"
    
    wait
else
    # Use tmux for better management
    tmux new-session -d -s taskmanager
    
    # Backend
    tmux send-keys -t taskmanager "cd backend && npm run dev" C-m
    tmux split-window -h -t taskmanager
    
    # Frontend
    sleep 2
    tmux send-keys -t taskmanager "cd frontend && npm start" C-m
    
    echo "✅ Services started in tmux session 'taskmanager'"
    echo ""
    echo "📌 Attach to session: tmux attach -t taskmanager"
    echo "📌 Backend (https://team-task-manager-full-stack-3.onrender.com)"
    echo "📌 Frontend (http://localhost:3000)"
    
    tmux attach -t taskmanager
fi
