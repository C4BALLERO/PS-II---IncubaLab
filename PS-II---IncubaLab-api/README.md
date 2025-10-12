# IncuvaLab API

API service for IncuvaLab project built with Next.js and MySQL using MVC architecture.

## Features

- MVC Architecture
- MySQL Database Integration
- JWT Authentication
- Password Hashing with bcrypt
- Input Validation with Joi
- Rate Limiting
- Security Headers with Helmet
- CORS Support

## Database Schema

The API supports the following entities:
- Users (with roles)
- Projects
- Comments
- User-Project relationships
- Audit history for users and projects

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Configure your MySQL database connection in `.env.local`

4. Run the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Comments
- `GET /api/comments/project/:projectId` - Get comments for a project
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

## Project Structure

```
src/
├── controllers/     # Business logic
├── models/         # Database models
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── config/         # Configuration files
└── pages/api/      # API routes
```
