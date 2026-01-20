import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

interface User {
  id: number
  username: string
  email: string
  fullName: string
  role: string
  position?: string
  department?: string
  phone?: string
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'USER',
    position: '',
    department: '',
    phone: '',
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${id}`)
      fetchUsers()
    } catch (error) {
      alert('Error deleting user')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      fullName: user.fullName,
      role: user.role,
      position: user.position || '',
      department: user.department || '',
      phone: user.phone || '',
    })
    setShowModal(true)
  }

  const handleCreate = () => {
    setEditingUser(null)
    setFormData({
      username: '',
      email: '',
      password: '',
      fullName: '',
      role: 'USER',
      position: '',
      department: '',
      phone: '',
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await axios.put(`http://localhost:8080/api/admin/users/${editingUser.id}`, formData)
      } else {
        await axios.post('http://localhost:8080/api/admin/users', formData)
      }
      setShowModal(false)
      fetchUsers()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error saving user')
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
    <div className="admin-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-logo">John Wick Audit Firm - Admin</h1>
          <div className="nav-actions">
            <button onClick={() => navigate('/home')} className="nav-button">
              Home
            </button>
            <button onClick={() => navigate('/profile')} className="nav-button">
              Profile
            </button>
            <button onClick={handleLogout} className="nav-button logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-content">
        <div className="admin-header">
          <h2>User Management</h2>
          <button onClick={handleCreate} className="create-button">
            + Add New User
          </button>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>{u.position || '-'}</td>
                  <td>{u.department || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(u)} className="edit-button">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(u.id)} className="delete-button">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{editingUser ? 'Edit User' : 'Create New User'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username *</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password {!editingUser && '*'}</label>
                  <input
                    type="password"
                    value={formData.password}
                    //.....
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    ///...
                  />
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="save-button">
                    {editingUser ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
