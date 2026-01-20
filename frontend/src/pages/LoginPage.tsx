import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

interface ValidationErrors {
  username?: string
  password?: string
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const { login } = useAuth()
  const navigate = useNavigate()

  // Validation function
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}

    // Username validation
    if (!username.trim()) {
      errors.username = 'Username is required'
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    } else if (username.length > 50) {
      errors.username = 'Username must be less than 50 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores'
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    // Clear username error when user starts typing
    if (validationErrors.username) {
      setValidationErrors({ ...validationErrors, username: undefined })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    // Clear password error when user starts typing
    if (validationErrors.password) {
      setValidationErrors({ ...validationErrors, password: undefined })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await login(username, password)
      navigate('/home')
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="company-name">John Wick Audit Firm</h1>
          <p className="company-tagline">Excellence in Audit & Accounting</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className={validationErrors.username ? 'input-error' : ''}
              placeholder="Enter your username"
            />
            {validationErrors.username && (
              <span className="validation-error">{validationErrors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={validationErrors.password ? 'input-error' : ''}
              placeholder="Enter your password"
            />
            {validationErrors.password && (
              <span className="validation-error">{validationErrors.password}</span>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-footer">
          <p>Default Admin: username: <strong>admin</strong>, password: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
