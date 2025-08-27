import { useState } from 'react'
import axios from 'axios'
import './theme.css'

const API_BASE = import.meta.env.VITE_APP_API_URL || 'https://realtime-callapp.onrender.com'

function AddMembers() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  function normalizePhone(phone) {
    let cleaned = phone.replace(/\s|-/g, '')

    if (cleaned.startsWith('0')) {
      cleaned = cleaned.slice(1)
    }

    if (!cleaned.startsWith('+')) {
      cleaned = '+91' + cleaned
    }

    return cleaned
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    const normalized = normalizePhone(phone)

    if (!/^\+\d{10,15}$/.test(normalized)) {
      alert('Invalid phone number format. Use 10-digit Indian numbers.')
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_BASE}/members`, { name, phone: normalized })

      // ✅ Clear form after success
      setName('')
      setPhone('')

      alert('Member added successfully!')
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('This member is already registered.')
        setName('')
        setPhone('')
      } else {
        alert('Failed to add member. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Member</h2>

        <label className="label">
          <span>Name</span>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter member name"
          />
        </label>
        <label className="label">
          <span>Phone</span>
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91XXXXXXXXXX"
          />
        </label>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  )
}

export default AddMembers
