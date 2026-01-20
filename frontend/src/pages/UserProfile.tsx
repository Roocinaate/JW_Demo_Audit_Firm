import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './UserProfile.css'

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-logo">John Wick Audit Firm</h1>
          <div className="nav-actions">
            <button onClick={() => navigate('/home')} className="nav-button">
              Home
            </button>
            {user.role === 'ADMIN' && (
              <button onClick={() => navigate('/admin')} className="nav-button admin-button">
                Admin Dashboard
              </button>
            )}
            <button onClick={handleLogout} className="nav-button logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>
            <p className="profile-subtitle">Your personal information</p>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{user.fullName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{user.username}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Role:</span>
              <span className="detail-value role-badge">{user.role}</span>
            </div>
            {user.position && (
              <div className="detail-row">
                <span className="detail-label">Position:</span>
                <span className="detail-value">{user.position}</span>
              </div>
            )}
            {user.department && (
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{user.department}</span>
              </div>
            )}
            {user.phone && (
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{user.phone}</span>
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button onClick={() => navigate('/home')} className="action-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
