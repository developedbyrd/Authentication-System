# Authentication System

A full-stack authentication system with user management and todo functionality built with React, Express.js, and MongoDB.

## Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐    MongoDB    ┌─────────────────┐
│   React Client  │ ◄──────────────► │  Express Server │ ◄───────────► │    Database     │
│   (Frontend)    │                  │   (Backend)     │               │   (MongoDB)     │
└─────────────────┘                  └─────────────────┘               └─────────────────┘
```

## Technology Stack

**Frontend:**
- React 19.2.0 with Vite
- Redux Toolkit for state management
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API communication
- Lucide React for icons

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- Cookie-parser for cookie handling

## Project Structure

```
Authentication System/
├── Backend/
│   ├── config/
│   │   ├── config.js          # Environment variables
│   │   └── db.config.js       # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── todo.controller.js # Todo CRUD operations
│   ├── middleware/
│   │   └── auth.middleware.js # JWT validation
│   ├── models/
│   │   ├── user.model.js      # User schema
│   │   └── todo.model.js      # Todo schema
│   ├── routes/
│   │   ├── auth.route.js     # Auth endpoints
│   │   └── todo.route.js     # Todo endpoints
│   └── index.js               # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── TodoApp.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── todoSlice.js
│   │   │   └── store.js
│   │   └── utils/
│   │       └── api.js         # Axios configuration
│   └── vite.config.js
└── README.md
```

## Features Implemented

### Authentication
- User registration with name, email, password
- User login with JWT token generation
- Password hashing with bcryptjs (10 salt rounds)
- JWT middleware protection for routes
- User logout functionality
- Get current user profile

### Todo Management
- Create todos with title and description
- Read user's todos with search functionality
- Update existing todos
- Delete todos
- User isolation (users only see their own todos)

### Security Features
- Password validation (minimum 6 characters)
- Email format validation with regex
- JWT token authentication
- HTTP-only cookies for refresh tokens
- CORS configuration
- Password exclusion from queries by default
- User-specific data access

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Todo Routes (All Protected)
- `GET /api/todos` - Get user todos (with optional search)
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  createdAt: Date (default: now)
}
```

### Todo Model
```javascript
{
  title: String (required, trimmed),
  description: String (trimmed),
  completed: Boolean (default: false),
  userId: ObjectId (ref: User, required),
  timestamps: true
}
```

## Frontend State Management

### Auth Slice
- User login/register/logout actions
- Token management in localStorage
- Authentication state tracking
- Error handling for auth operations

### Todo Slice
- Fetch, create, update, delete todo actions
- Loading states for async operations
- Error handling for todo operations

## Quick Start

### Prerequisites
- Node.js
- MongoDB
- npm

### Backend Setup
```bash
cd Backend
npm install
# Create .env file with required variables
npm run dev
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### Environment Variables
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRE=7d
```

## Implementation Details

### Database Connection
- Connection retry mechanism (5 attempts)
- Connection pooling (maxPoolSize: 10)
- Graceful shutdown handling
- Error logging and monitoring

### Security Implementation
- bcrypt password hashing with salt
- JWT token verification middleware
- CORS with credentials support
- Input validation and sanitization
- Text indexing on todo title/description

### Frontend Features
- Axios interceptors for token attachment
- Redux async thunks for API calls
- Protected route components
- Local storage for token persistence
- Search functionality for todos

## Current Limitations
- Tokens stored in localStorage (security consideration)
- No email verification
- No password reset functionality
- No rate limiting
- Basic error handling
- No comprehensive logging