import { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton.jsx'
import './theme.css'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

function GroupList() {
  const [members, setMembers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')

  // Load members from backend
  async function load() {
    try {
      const { data } = await axios.get(`${API_BASE}/members`, { withCredentials: true })
      setMembers(data)
    } catch (err) {
      console.error(err)
      alert('Error loading members')
    }
  }

  useEffect(() => {
    load()
  }, [])

  function startEdit(m) {
    setEditingId(m._id)
    setEditName(m.name)
    setEditPhone(m.phone)
  }

  async function saveEdit(id) {
    if (!window.confirm('Are you sure you want to update this member?')) return
    try {
      await axios.put(
        `${API_BASE}/members/${id}`,
        { name: editName, phone: editPhone },
        { withCredentials: true }
      )
      setEditingId(null)
      setEditName('')
      setEditPhone('')
      load()
    } catch (err) {
      console.error(err)
      alert('Error saving member update')
    }
  }

  // ✅ Fixed: use /calls/:id
  async function callMember(id) {
    try {
      await axios.post(`${API_BASE}/calls/${id}`, {}, { withCredentials: true })
    } catch (err) {
      console.error(err)
      alert('Error making the call')
    }
  }

  // ✅ Fixed: use /calls/group
  async function callGroup() {
    try {
      await axios.post(`${API_BASE}/calls/group`, {}, { withCredentials: true })
    } catch (err) {
      console.error(err)
      alert('Error starting group call')
    }
  }

  async function deleteMember(id) {
    if (!window.confirm('Are you sure you want to delete this member?')) return
    try {
      await axios.delete(`${API_BASE}/members/${id}`, { withCredentials: true })
      load()
    } catch (err) {
      console.error(err)
      alert('Error deleting member')
    }
  }

  return (
    <div className="page">
      <BackButton />
      <h2 className="subtitle">Group List</h2>

      <button className="primary-button" onClick={callGroup}>
        📞 Call Entire Group
      </button>

      <div className="list">
        {members.map((m) => (
          <div className="list-item" key={m._id}>
            {editingId === m._id ? (
              <div className="edit-row">
                <input
                  className="input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  className="input"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
                <div className="actions">
                  <button
                    className="secondary-button"
                    onClick={() => saveEdit(m._id)}
                  >
                    Save
                  </button>
                  <button
                    className="link-button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="name">{m.name}</span>
                <div className="actions">
                  <button
                    className="secondary-button"
                    onClick={() => startEdit(m)}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-button"
                    title="Call from Admin Number"
                    onClick={() => callMember(m._id)}
                  >
                    📞
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteMember(m._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupList
