# Running the Application Without Maven (Using IDE)

Since Maven is not installed on your system, here are the easiest ways to run the application:

## Option 1: IntelliJ IDEA (Recommended)

IntelliJ IDEA has built-in Maven support, so you don't need to install Maven separately!

### Steps:

1. **Open IntelliJ IDEA**

2. **Open the Project:**
   - File → Open
   - Navigate to: `D:\Work Space\Demo Management\backend`
   - Click OK
   - Select "Open as Project"

3. **Wait for Maven Sync:**
   - IntelliJ will automatically detect the `pom.xml` file
   - It will download all dependencies automatically
   - Wait for the sync to complete (check bottom-right corner)

4. **Run the Application:**
   - Navigate to: `src/main/java/com/johnwick/audit/AuditFirmApplication.java`
   - Right-click on the file → Run 'AuditFirmApplication.main()'
   - OR click the green play button next to the `main` method

5. **Verify:**
   - Check the console for: "Started AuditFirmApplication"
   - Backend runs on: http://localhost:8080

## Option 2: Eclipse IDE

1. **Open Eclipse**

2. **Import Maven Project:**
   - File → Import
   - Maven → Existing Maven Projects
   - Browse to: `D:\Work Space\Demo Management\backend`
   - Click Finish

3. **Run the Application:**
   - Right-click the project
   - Run As → Spring Boot App
   - OR: Right-click `AuditFirmApplication.java` → Run As → Java Application

## Option 3: VS Code (with Java Extension Pack)

1. **Install Extensions:**
   - Install "Extension Pack for Java" from VS Code marketplace
   - Install "Spring Boot Extension Pack"

2. **Open Folder:**
   - File → Open Folder
   - Select: `D:\Work Space\Demo Management\backend`

3. **Run:**
   - Open: `AuditFirmApplication.java`
   - Click "Run" above the `main` method
   - OR: F5 to debug/run

## After Backend is Running:

### Run Frontend (Same for all IDEs):

1. **Open Terminal in VS Code or any terminal:**
   ```powershell
   cd "D:\Work Space\Demo Management\frontend"
   npm install
   npm run dev
   ```

2. **Access Application:**
   - Open browser: http://localhost:3000
   - Login with: admin / admin123

## Quick Summary:

✅ **Backend:** Use IDE (IntelliJ/Eclipse/VS Code) - no Maven installation needed!
✅ **Frontend:** Use terminal with npm (Node.js is already installed)
