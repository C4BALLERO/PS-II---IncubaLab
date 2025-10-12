# IncuvaLab API - Database Setup Script

This script creates the complete database structure for the IncuvaLab project.

## Database Schema

The database includes the following tables:

### Core Tables
- **Rol**: User roles (Admin, User, etc.)
- **Usuario**: User accounts with authentication
- **Proyecto**: Project information and details
- **Comentario**: Comments on projects
- **Usuario_Proyecto**: Many-to-many relationship between users and projects

### Audit Tables
- **Usuario_Historial**: Audit trail for user changes
- **Proyecto_Historial**: Audit trail for project changes

## Features

- **User Management**: Complete user registration, authentication, and profile management
- **Project Management**: Create, read, update, delete projects
- **Comment System**: Users can comment on projects
- **Contributor System**: Users can contribute to projects
- **Audit Trail**: Complete history tracking for users and projects
- **Role-based Access**: Different user roles with appropriate permissions

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation
- SQL injection protection
- CORS configuration
- Security headers

## API Endpoints

### Authentication
- `POST /api/auth?action=register` - User registration
- `POST /api/auth?action=login` - User login
- `GET /api/auth` - Get user profile (requires auth)
- `PUT /api/auth` - Update user profile (requires auth)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users?id={id}` - Get user by ID
- `PUT /api/users?id={id}` - Update user
- `DELETE /api/users?id={id}` - Delete user (admin only)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?search={query}` - Search projects
- `POST /api/projects` - Create project (requires auth)
- `GET /api/projects/[id]` - Get project by ID
- `PUT /api/projects/[id]` - Update project (requires auth)
- `DELETE /api/projects/[id]` - Delete project (requires auth)
- `GET /api/projects/[id]?action=contributors` - Get project contributors
- `POST /api/projects/[id]?action=add-contributor` - Add contributor (requires auth)

### Comments
- `GET /api/comments?projectId={id}` - Get project comments
- `GET /api/comments?userId={id}` - Get user comments
- `POST /api/comments` - Create comment (requires auth)
- `GET /api/comments/[id]` - Get comment by ID
- `PUT /api/comments/[id]` - Update comment (requires auth)
- `DELETE /api/comments/[id]` - Delete comment (requires auth)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your database credentials.

3. **Run the database script**:
   Execute the SQL script in your MySQL database to create the schema.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Test the API**:
   Visit `http://localhost:3000/health` to check if the API is running.

## Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=incuvalab
DB_USER=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── database.js  # Database connection
│   └── index.js     # Main config
├── controllers/     # Business logic
│   ├── UserController.js
│   ├── ProjectController.js
│   └── CommentController.js
├── middleware/      # Custom middleware
│   ├── auth.js
│   ├── validation.js
│   ├── rateLimit.js
│   └── errorHandler.js
├── models/          # Database models
│   ├── User.js
│   ├── Project.js
│   ├── Comment.js
│   └── Role.js
├── utils/           # Utility functions
│   ├── auth.js
│   └── validation.js
└── pages/api/       # API routes
    ├── auth/
    ├── users/
    ├── projects/
    └── comments/
```

## Technologies Used

- **Next.js**: React framework for API routes
- **MySQL**: Database with mysql2 driver
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Joi**: Input validation
- **Express**: Additional middleware support
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting

## Contributing

1. Follow the MVC architecture pattern
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation

## License

MIT License - see LICENSE file for details
