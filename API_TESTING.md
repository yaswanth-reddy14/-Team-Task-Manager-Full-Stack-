# API Testing Guide

Complete guide for testing the Team Task Manager REST API using cURL, Postman, or similar tools.

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header.

### How to Get a Token

1. Register a new user or login
2. Copy the token from the response
3. Use it in future requests:
   ```
   Authorization: Bearer <your_token_here>
   ```

## 📝 Test Scenarios

### Scenario 1: User Registration & Login

#### 1.1 Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "Member"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 1.2 Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "Member"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 1.3 Get Profile
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "Member",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### Scenario 2: Project Management

#### 2.1 Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Q1 Planning",
    "description": "Q1 2024 roadmap and milestones"
  }'
```

**Response (201):**
```json
{
  "id": 1,
  "name": "Q1 Planning",
  "description": "Q1 2024 roadmap and milestones",
  "owner_id": 1,
  "created_at": "2024-01-15T10:32:00Z",
  "updated_at": "2024-01-15T10:32:00Z"
}
```

#### 2.2 List All Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Q1 Planning",
    "description": "Q1 2024 roadmap and milestones",
    "owner_id": 1,
    "created_at": "2024-01-15T10:32:00Z"
  }
]
```

#### 2.3 Get Project Details
```bash
curl -X GET http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Q1 Planning",
  "description": "Q1 2024 roadmap and milestones",
  "owner_id": 1,
  "created_at": "2024-01-15T10:32:00Z"
}
```

#### 2.4 Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Q1 Planning - Updated",
    "description": "Updated Q1 roadmap"
  }'
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Q1 Planning - Updated",
  "description": "Updated Q1 roadmap",
  "owner_id": 1,
  "updated_at": "2024-01-15T10:35:00Z"
}
```

#### 2.5 Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
{
  "message": "Project deleted successfully"
}
```

---

### Scenario 3: Team Management

#### 3.1 Add Project Member

First, create or get another user's ID. Register another user and get their ID.

```bash
curl -X POST http://localhost:5000/api/projects/1/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "user_id": 2,
    "role": "Member"
  }'
```

**Response (201):**
```json
{
  "id": 1,
  "project_id": 1,
  "user_id": 2,
  "role": "Member",
  "created_at": "2024-01-15T10:40:00Z"
}
```

#### 3.2 List Project Members
```bash
curl -X GET http://localhost:5000/api/projects/1/members \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
[
  {
    "id": 1,
    "project_id": 1,
    "user_id": 2,
    "role": "Member",
    "email": "user2@example.com",
    "first_name": "Jane",
    "last_name": "Smith"
  }
]
```

#### 3.3 Remove Project Member
```bash
curl -X DELETE http://localhost:5000/api/projects/1/members/2 \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
{
  "message": "Member removed successfully"
}
```

---

### Scenario 4: Task Management

#### 4.1 Create Task
```bash
curl -X POST http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Design Dashboard",
    "description": "Create responsive dashboard layout",
    "priority": "High",
    "status": "Todo",
    "assigned_to": 2,
    "due_date": "2024-01-30T23:59:59Z"
  }'
```

**Response (201):**
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Design Dashboard",
  "description": "Create responsive dashboard layout",
  "status": "Todo",
  "priority": "High",
  "assigned_to": 2,
  "created_by": 1,
  "due_date": "2024-01-30T23:59:59Z",
  "created_at": "2024-01-15T10:45:00Z",
  "updated_at": "2024-01-15T10:45:00Z"
}
```

#### 4.2 List Tasks
```bash
curl -X GET http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
[
  {
    "id": 1,
    "project_id": 1,
    "title": "Design Dashboard",
    "description": "Create responsive dashboard layout",
    "status": "Todo",
    "priority": "High",
    "assigned_to": 2,
    "created_by": 1,
    "due_date": "2024-01-30T23:59:59Z",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "created_at": "2024-01-15T10:45:00Z"
  }
]
```

#### 4.3 Filter Tasks by Status
```bash
curl -X GET "http://localhost:5000/api/tasks/1?status=In%20Progress" \
  -H "Authorization: Bearer TOKEN"
```

#### 4.4 Filter Tasks by Assignee
```bash
curl -X GET "http://localhost:5000/api/tasks/1?assigned_to=2" \
  -H "Authorization: Bearer TOKEN"
```

#### 4.5 Get Task Details
```bash
curl -X GET http://localhost:5000/api/tasks/task/1 \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Design Dashboard",
  "description": "Create responsive dashboard layout",
  "status": "Todo",
  "priority": "High",
  "assigned_to": 2,
  "created_by": 1,
  "due_date": "2024-01-30T23:59:59Z",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "created_at": "2024-01-15T10:45:00Z"
}
```

#### 4.6 Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/task/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "status": "In Progress",
    "priority": "Medium"
  }'
```

**Response (200):**
```json
{
  "id": 1,
  "project_id": 1,
  "title": "Design Dashboard",
  "description": "Create responsive dashboard layout",
  "status": "In Progress",
  "priority": "Medium",
  "assigned_to": 2,
  "created_by": 1,
  "due_date": "2024-01-30T23:59:59Z",
  "updated_at": "2024-01-15T10:50:00Z"
}
```

#### 4.7 Update Task Status Only
```bash
curl -X PUT http://localhost:5000/api/tasks/task/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "status": "Done"
  }'
```

#### 4.8 Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/task/1 \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

### Scenario 5: Dashboard Statistics

#### 5.1 Get Dashboard Stats
```bash
curl -X GET http://localhost:5000/api/tasks/dashboard/stats \
  -H "Authorization: Bearer TOKEN"
```

**Response (200):**
```json
{
  "stats": {
    "total_tasks": 10,
    "todo_count": 3,
    "in_progress_count": 4,
    "done_count": 3,
    "overdue_count": 1
  },
  "overdue_tasks": [
    {
      "id": 5,
      "project_id": 1,
      "title": "Implement API",
      "description": "REST API implementation",
      "status": "Todo",
      "priority": "High",
      "assigned_to": 1,
      "created_by": 1,
      "due_date": "2024-01-10T00:00:00Z",
      "project_name": "Q1 Planning",
      "created_at": "2024-01-05T10:00:00Z"
    }
  ]
}
```

---

## 🔑 Using Environment Variables

Save your token to reuse in multiple requests:

```bash
# Get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  | jq -r '.token')

# Use token in requests
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "name is required"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Project not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error"
}
```

---

## 🧪 Testing Tools

### Command Line
- **cURL**: Pre-installed on most systems
- **wget**: Alternative HTTP client
- **httpie**: User-friendly HTTP client

### GUI Tools
- **Postman**: Popular API testing tool
- **Insomnia**: Modern API client
- **Thunder Client**: VS Code extension
- **REST Client**: VS Code extension

### Example Postman Collection

Create a collection with these variables:
```
{{base_url}} = http://localhost:5000
{{token}} = <your_jwt_token>
{{project_id}} = 1
{{task_id}} = 1
{{user_id}} = 2
```

Then use in requests:
```
GET {{base_url}}/api/projects
Authorization: Bearer {{token}}
```

---

## 📊 Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Get user profile
- [ ] Create project
- [ ] List projects
- [ ] Get project details
- [ ] Update project
- [ ] Add project member
- [ ] List project members
- [ ] Create task
- [ ] List tasks
- [ ] Filter tasks by status
- [ ] Filter tasks by assignee
- [ ] Get task details
- [ ] Update task status
- [ ] Delete task
- [ ] Get dashboard stats
- [ ] Check overdue tasks
- [ ] Delete project
- [ ] Test error scenarios (401, 403, 404)

---

## 🚀 Load Testing

Test with multiple requests:

```bash
# 10 parallel requests
for i in {1..10}; do
  curl -X GET http://localhost:5000/api/projects \
    -H "Authorization: Bearer TOKEN" &
done

wait
```

---

## 📝 Logging & Debugging

### View Backend Logs
Terminal where backend is running will show:
```
Server running on port 5000
GET /api/projects 200 15.234 ms
POST /api/tasks/1 201 23.456 ms
```

### Debug Requests

Enable debug mode in cURL:
```bash
curl -v -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN"
```

This shows request/response headers and timing.

---

## 💾 API Rate Limits

Currently no rate limiting implemented. In production, consider adding:
- Max requests per minute
- Max requests per user
- Slow down large data transfers

---

Happy testing! 🧪🎉
