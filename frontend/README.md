# Frontend - Team Task Manager

React application for team task management with modern UI and real-time state management.

## 🚀 Quick Start

### Setup

```bash
npm install
cp .env.example .env
# Update .env with backend API URL
npm start
```

Browser will open at `http://localhost:3000`

### Build & Deploy

```bash
npm run build  # Build for production
npm start      # Serve production build
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── pages/
│   │   ├── Dashboard.js    # Dashboard with stats
│   │   ├── Login.js        # Login page
│   │   ├── Register.js     # Registration page
│   │   ├── Projects.js     # Projects list
│   │   └── ProjectDetail.js # Project detail & tasks
│   ├── context/
│   │   └── AuthContext.js  # Auth state management
│   ├── styles/
│   │   ├── Auth.css        # Auth pages styling
│   │   ├── Dashboard.css   # Dashboard styling
│   │   └── global.css      # Global styles
│   ├── App.js              # Main app component
│   ├── index.js            # React entry point
│   ├── ProtectedRoute.js   # Route protection
│   └── api.js              # API client
├── package.json
├── Dockerfile
└── .env.example
```

## 🔐 Authentication

### Context-Based State Management

The app uses React Context API for global auth state:

```javascript
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
  const { user, token, login, logout, isAuthenticated } = useAuth();
  // Use auth context
};
```

### Protected Routes

Components wrapped in `<ProtectedRoute>` require authentication:

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 📦 Dependencies

- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **react-scripts**: Build tools

## 🎨 Features

### Dashboard
- Task statistics (total, todo, in-progress, done, overdue)
- Overdue tasks list with alerts
- Quick navigation to projects

### Projects
- Create new projects
- View all projects
- Delete projects (owner only)
- View project details

### Project Details
- Task management (create, update, delete)
- Team member management
- Task status tracking
- Task filtering and sorting

### Authentication
- User registration
- User login
- Profile management
- JWT token management
- Automatic token refresh

## 🔧 Configuration

### Environment Variables

```
REACT_APP_API_URL=https://team-task-manager-full-stack-3.onrender.com
```

## 🎯 Pages

### /login
User login page with email and password fields.

### /register
User registration with name, email, and password.

### /dashboard
Main dashboard showing:
- Task statistics
- Overdue tasks
- Quick links to projects

### /projects
List of all projects with:
- Create project form
- Project cards
- Delete option

### /projects/:projectId
Project detail page with:
- Tasks tab (create, view, update, delete tasks)
- Team tab (view project members)

## 🧩 Component Architecture

### App Component
Main entry point that:
- Sets up routing
- Provides authentication context
- Renders navigation bar
- Manages protected routes

### Pages
Each page is a functional component that:
- Uses hooks for state management
- Calls API endpoints via axios
- Handles error states
- Displays data in appropriate format

### Context
AuthContext provides:
- User authentication state
- Token management
- Login/logout functions
- Protected route checking

## 🌐 API Integration

### API Client Setup

```javascript
// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Available Endpoints

See backend README.md for complete API reference.

## 🎨 Styling

### Global Styles (global.css)
- Base styles
- Common components (buttons, forms)
- Responsive utilities

### Auth Styles (Auth.css)
- Login/Register page styling
- Form styling
- Gradient background

### Dashboard Styles (Dashboard.css)
- Dashboard grid layout
- Stats cards
- Task list items
- Member cards
- Tab styling

## 📱 Responsive Design

The app is mobile-responsive with:
- Flexible grid layouts
- Mobile-friendly buttons
- Touch-friendly elements
- Responsive typography

## 🚀 Performance Optimizations

- Component memoization
- Lazy loading with React.lazy
- Optimized API calls
- Minimal re-renders
- Efficient state management

## 🐳 Docker

### Build Image
```bash
docker build -t task-manager-ui:latest .
```

### Run Container
```bash
docker run -p 3000:3000 \
  -e REACT_APP_API_URL=http://backend:5000 \
  task-manager-ui:latest
```

## 🔒 Security

- JWT token stored in localStorage
- CORS protection
- Secure API endpoints
- XSS protection via React
- CSRF protection via API

## 🧪 Testing

Test the app with:

1. **Registration**: Create a new account
2. **Login**: Sign in with credentials
3. **Create Project**: Add a new project
4. **Add Tasks**: Create tasks in project
5. **Update Status**: Change task status
6. **Dashboard**: View statistics and overdue tasks

## 🚀 Deployment

### Railway

```bash
# Deploy frontend service
railway up
```

### Docker Compose

```bash
docker-compose up frontend
```

### Vercel/Netlify

```bash
npm run build
# Deploy build/ directory
```

## 📝 Troubleshooting

### API Connection Issues
- Verify `REACT_APP_API_URL` in .env
- Check backend is running
- Review browser console for errors

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Re-login with credentials
- Check token expiration

### CORS Errors
- Verify backend CORS_ORIGIN setting
- Check frontend URL matches

## 🤝 Contributing

1. Create a feature branch
2. Make changes and test
3. Commit with meaningful messages
4. Push to origin
5. Create Pull Request

## 📄 License

MIT License - See LICENSE file
