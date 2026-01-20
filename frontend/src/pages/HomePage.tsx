import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './HomePage.css'

interface OrganizationDetails {
  id: number
  companyName: string
  description: string
  address: string
  phone: string
  email: string
  establishedYear: number
  totalEmployees: number
}

const HomePage: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [orgDetails, setOrgDetails] = useState<OrganizationDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrganizationDetails()
  }, [])

  const fetchOrganizationDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/organization/details')
      setOrgDetails(response.data)
    } catch (error) {
      console.error('Error fetching organization details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-logo">John Wick Audit Firm</h1>
          <div className="nav-actions">
            <span className="welcome-text">Welcome, {user?.fullName}!</span>
            <button onClick={() => navigate('/profile')} className="nav-button">
              Profile
            </button>
            {user?.role === 'ADMIN' && (
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

      <div className="home-content">
        <div className="hero-section">
          <h2 className="hero-title">Welcome to John Wick Audit Firm</h2>
          <p className="hero-subtitle">Your Trusted Partner in Financial Excellence</p>
        </div>

        {orgDetails && (
          <div className="org-details-card">
            <h3 className="card-title">About Our Organization</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Company Name:</span>
                <span className="detail-value">{orgDetails.companyName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Established:</span>
                <span className="detail-value">{orgDetails.establishedYear}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Employees:</span>
                <span className="detail-value">{orgDetails.totalEmployees}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{orgDetails.description}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{orgDetails.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{orgDetails.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{orgDetails.email}</span>
              </div>
            </div>
          </div>
        )}

        <div className="quick-actions">
          <button onClick={() => navigate('/profile')} className="action-card">
            <h4>View My Profile</h4>
            <p>See your personal details and information</p>
          </button>
          {user?.role === 'ADMIN' && (
            <button onClick={() => navigate('/admin')} className="action-card">
              <h4>Manage Users</h4>
              <p>Admin dashboard for user management</p>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
