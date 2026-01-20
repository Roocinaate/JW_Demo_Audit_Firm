-- John Wick Audit Firm Database Schema

CREATE DATABASE IF NOT EXISTS johnwick_audit;
USE johnwick_audit;

-- Users Table (for authentication and user management)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    position VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Organization Details Table
CREATE TABLE IF NOT EXISTS organization_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL DEFAULT 'John Wick Audit Firm',
    description TEXT,
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100),
    established_year INT,
    total_employees INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Note: Admin user and organization details are initialized automatically by Spring Boot DataInitializer
-- Default admin credentials: username: admin, password: admin123
