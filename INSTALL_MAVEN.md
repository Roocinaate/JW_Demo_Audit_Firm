# Installing Maven on Windows

## Option A: Using Chocolatey (Easiest)

If you have Chocolatey package manager installed:

```powershell
choco install maven
```

## Option B: Manual Installation

1. **Download Maven:**
   - Go to: https://maven.apache.org/download.cgi
   - Download: `apache-maven-3.9.5-bin.zip` (or latest version)

2. **Extract:**
   - Extract to: `C:\Program Files\Apache\maven` (or any location)

3. **Add to PATH:**
   - Right-click "This PC" → Properties
   - Advanced System Settings → Environment Variables
   - Under "System Variables", find "Path" → Edit
   - Add: `C:\Program Files\Apache\maven\bin`
   - Click OK on all dialogs

4. **Verify Installation:**
   - Open NEW PowerShell window
   - Run: `mvn -version`

## Option C: Quick Install Script (PowerShell as Administrator)

```powershell
# Download Maven
$mavenUrl = "https://dlcdn.apache.org/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.zip"
$downloadPath = "$env:TEMP\maven.zip"
$installPath = "C:\Program Files\Apache\maven"

Invoke-WebRequest -Uri $mavenUrl -OutFile $downloadPath
Expand-Archive -Path $downloadPath -DestinationPath "C:\Program Files\Apache\" -Force
Remove-Item $downloadPath

# Add to PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
$mavenBinPath = "$installPath\bin"
if ($currentPath -notlike "*$mavenBinPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$mavenBinPath", "Machine")
    $env:Path += ";$mavenBinPath"
}

# Verify
mvn -version
```
