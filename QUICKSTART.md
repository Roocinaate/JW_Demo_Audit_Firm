# Quick Start Guide - John Wick Audit Firm

## Prerequisites Check
Make sure you have installed:
- ✅ Java JDK 17 or higher (`java -version`)
- ✅ Maven (`mvn -version`)
- ✅ MySQL Server running (`mysql --version`)
- ✅ Node.js 16+ and npm (`node -v` and `npm -v`)

## Step-by-Step Setup

### 1. Database Setup
1. **Start MySQL Server** (if not already running)
   - On Windows: Start MySQL service from Services
   - Or run: `net start MySQL` (if installed as service)

2. **Verify Database Configuration**
   - Database password is already set in `backend/src/main/resources/application.properties`
   - The database `johnwick_audit` will be created automatically on first run
   - Tables will be created automatically
   - Default admin user will be created automatically

### 2. Run Backend (Spring Boot)

Open a **Terminal/Command Prompt** and run:

```bash
# Navigate to backend directory
cd backend

# Build the project (first time only, or when dependencies change)
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

**Expected Output:**
- You should see Spring Boot starting up
- Look for: "Started AuditFirmApplication in X.XXX seconds"
- Backend runs on: `http://localhost:8080`

**If you see errors:**
- Check MySQL is running
- Verify database credentials in `application.properties`
- Check if port 8080 is already in use

### 3. Run Frontend (React)

Open a **NEW Terminal/Command Prompt** window (keep backend running) and run:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

**Expected Output:**
- Vite dev server starting
- Look for: "Local: http://localhost:3000"
- Frontend runs on: `http://localhost:3000`

**If you see errors:**
- Make sure backend is running first
- Try deleting `node_modules` and run `npm install` again
- Check if port 3000 is already in use

### 4. Access the Application

1. Open your browser
2. Navigate to: **http://localhost:3000**
3. You should see the login page

### 5. Login Credentials

**Default Admin Account:**
- Username: `admin`
- Password: `admin123`

After logging in as admin, you can:
- View organization details on the home page
- Access Admin Dashboard to create/manage users
- View your profile

## Running in IDE (Alternative)

### Backend (IntelliJ IDEA / Eclipse)
1. Open the `backend` folder as a Maven project
2. Navigate to: `src/main/java/com/johnwick/audit/AuditFirmApplication.java`
3. Right-click → Run 'AuditFirmApplication'

### Frontend (VS Code)
1. Open the `frontend` folder
2. Open integrated terminal
3. Run: `npm install` (first time)
4. Run: `npm run dev`

## Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```properties
# Change port in backend/src/main/resources/application.properties
server.port=8081
```

**MySQL Connection Error:**
- Verify MySQL is running: `mysql -u root -p`
- Check password in `application.properties` matches your MySQL root password
- Ensure MySQL is listening on port 3306

**Build Errors:**
```bash
# Clean and rebuild
cd backend
mvn clean
mvn install
```

### Frontend Issues

**Port 3000 already in use:**
```typescript
// Change port in frontend/vite.config.ts
server: {
  port: 3001,
  ...
}
```

**npm install fails:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors:**
- Make sure backend is running on port 8080
- Check CORS configuration in `SecurityConfig.java`

### Database Issues

**Tables not created:**
- Check `spring.jpa.hibernate.ddl-auto=update` in `application.properties`
- Check database exists: `USE johnwick_audit;`
- Check application logs for errors

**Admin user not created:**
- Check `DataInitializer.java` is running (look for logs on startup)
- Manually insert admin user if needed (see database/schema.sql)

## Next Steps

1. ✅ Backend running on http://localhost:8080
2. ✅ Frontend running on http://localhost:3000
3. ✅ Login with admin/admin123
4. ✅ Create users via Admin Dashboard
5. ✅ Test user login and profile view

## Application Structure

- **Backend API**: http://localhost:8080/api
- **Frontend UI**: http://localhost:3000
- **Database**: MySQL (localhost:3306/johnwick_audit)

Enjoy using the John Wick Audit Firm Management System! 🎯
