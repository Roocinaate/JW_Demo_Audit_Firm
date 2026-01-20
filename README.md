# John Wick Audit Firm - Organization Management System

A full-stack web application for managing an organization with role-based access control (Admin and User roles). Built with Java Spring Boot backend and React TypeScript frontend.

## Features

- **Dual Login System**: Separate login for Admin and User roles
- **Role-Based Access Control**: Different views and permissions for Admin and User
- **User Management (Admin)**: Create, Read, Update, and Delete users
- **User Profile**: Users can view their own profile details
- **Organization Details**: Home page displaying company information
- **Modern UI**: Interactive and responsive design with gradient themes
- **Secure Authentication**: JWT-based authentication system

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security (JWT Authentication)
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React 18
- TypeScript
- React Router
- Axios
- Vite
- CSS3 (Modern styling with gradients)

## Prerequisites

- Java JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 16+ and npm
- Your IDE (IntelliJ IDEA, Eclipse, VS Code)

## Database Setup

1. Install and start MySQL server
2. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/johnwick_audit?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```
3. The database and tables will be created automatically on first run
4. Default admin user will be created automatically:
   - Username: `admin`
   - Password: `admin123`

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   Or run the `AuditFirmApplication.java` class directly from your IDE.

4. The backend will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:3000`

## Default Credentials

### Admin Login
- **Username**: `admin`
- **Password**: `admin123`

### User Login
- Create users through the Admin Dashboard after logging in as admin

## Application Structure

```
Demo Management/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/johnwick/audit/
│   │       │   ├── config/          # Security, JWT, Data initialization
│   │       │   ├── controller/      # REST API endpoints
│   │       │   ├── dto/             # Data Transfer Objects
│   │       │   ├── model/           # Entity models
│   │       │   ├── repository/      # JPA repositories
│   │       │   └── service/         # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── context/                 # React Context (Auth)
│   │   ├── pages/                   # Page components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── database/
    └── schema.sql                   # Database schema (optional reference)
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Organization
- `GET /api/organization/details` - Get organization details

### User (Authenticated)
- `GET /api/users/me` - Get current user profile

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

## Features by Role

### User Role
- View organization details on home page
- View own profile
- Cannot access admin functions

### Admin Role
- All user permissions
- Access to Admin Dashboard
- Create, view, edit, and delete users
- Manage all user accounts

## Development Notes

- The application uses JWT tokens for authentication
- Tokens are stored in localStorage
- CORS is configured for `http://localhost:3000`
- Database schema is managed by Hibernate (DDL auto: update)
- Passwords are encrypted using BCrypt

## Troubleshooting

1. **Database Connection Error**: Ensure MySQL is running and credentials are correct
2. **Port Already in Use**: Change port in `application.properties` (backend) or `vite.config.ts` (frontend)
3. **CORS Issues**: Verify CORS configuration in `SecurityConfig.java`
4. **Build Errors**: Ensure Java 17+ and Node.js 16+ are installed

## License

This project is for demonstration purposes.

## Author

Created for John Wick Audit Firm organization management system.
