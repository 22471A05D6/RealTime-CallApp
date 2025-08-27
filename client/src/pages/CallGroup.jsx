import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import BackButton from '../components/BackButton.jsx'
import './theme.css'

const API_BASE = import.meta.env.VITE_APP_API_URL || 'https://realtime-callapp.onrender.com'

function CallGroup() {
  const [members, setMembers] = useState([])
  const [allMuted, setAllMuted] = useState(false)

  // ✅ Load members from backend
  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data } = await axios.get(`${API_BASE}/members`, { withCredentials: true })

        // Normalize phone numbers
        const formatted = data.map(m => {
          let phone = m.phone.trim()
          if (/^\d{10}$/.test(phone)) {
            phone = `+91${phone}`
          } else if (/^91\d{10}$/.test(phone)) {
            phone = `+${phone}`
          }
          return { ...m, phone, lastCallStatus: m.lastCallStatus || 'idle', isMuted: m.isMuted || false }
        })
        setMembers(formatted)
      } catch (err) {
        console.error(err)
        alert('Error fetching members')
      }
    }
    fetchMembers()
  }, [])

  // ✅ Setup socket connection once
  const socket = useMemo(() => io(API_BASE, { transports: ['websocket'] }), [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to socket server')
    })

    socket.on('callStatusUpdate', (payload) => {
      setMembers((prev) =>
        prev.map((m) =>
          m._id === payload.memberId ? { ...m, lastCallStatus: payload.status } : m
        )
      )
    })

    socket.on('muteUpdate', (payload) => {
      if (payload.memberId === 'all') {
        setAllMuted(payload.isMuted)
        setMembers((prev) => prev.map((m) => ({ ...m, isMuted: payload.isMuted })))
      } else {
        setMembers((prev) =>
          prev.map((m) =>
            m._id === payload.memberId ? { ...m, isMuted: payload.isMuted } : m
          )
        )
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [socket])

  // ✅ Corrected API paths (consistent with GroupList.jsx)
  async function startGroupCall() {
    try {
      await axios.post(`${API_BASE}/calls/group`, {}, { withCredentials: true })
    } catch (err) {
      console.error(err)
      alert('Error starting group call')
    }
  }

  async function callAgain(id) {
    try {
      await axios.post(`${API_BASE}/call/${id}`, {}, { withCredentials: true })
    } catch (err) {
      console.error(err)
      alert('Error retrying call')
    }
  }

  async function toggleMuteAll() {
    const targetMute = !allMuted
    try {
      await axios.post(`${API_BASE}/mute-all`, { isMuted: targetMute }, { withCredentials: true })
      setAllMuted(targetMute)
      setMembers((prev) => prev.map((m) => ({ ...m, isMuted: targetMute })))
    } catch (err) {
      console.error(err)
      alert('Error updating mute for all members')
    }
  }

  async function toggleMute(id, current) {
    try {
      await axios.post(`${API_BASE}/mute/${id}`, { isMuted: !current }, { withCredentials: true })
      setMembers((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isMuted: !current } : m))
      )
    } catch (err) {
      console.error(err)
      alert('Error updating member mute status')
    }
  }

  // ✅ Formatting functions
  function formatDisplay(phone) {
    return phone.replace(/^\+91/, '+91 ').replace(/(\d{5})(\d{5})$/, '$1 $2')
  }

  function statusColor(status) {
    switch (status) {
      case 'ringing': return '🟡 Ringing'
      case 'picked': return '🟢 Picked'
      case 'not-picked': return '🔴 Not Picked'
      case 'completed': return '⚪ Completed'
      default: return '⚫ Idle'
    }
  }

  return (
    <div className="page">
      <BackButton />
      <h2 className="subtitle">Call Group</h2>

      <div className="toolbar">
        <button className="primary-button" onClick={startGroupCall}>
          📞 Start Group Call
        </button>
        <button className="secondary-button" onClick={toggleMuteAll}>
          {allMuted ? 'Unmute All' : 'Mute All'}
        </button>
      </div>

      <div className="list">
        {members.map((m) => (
          <div className="list-item" key={m._id}>
            <div className="info">
              <span className="name">{m.name} ({formatDisplay(m.phone)})</span>
              <span className="status">{statusColor(m.lastCallStatus)}</span>
            </div>
            <div className="actions">
              {m.lastCallStatus === 'not-picked' && (
                <button
                  className="secondary-button"
                  onClick={() => callAgain(m._id)}
                >
                  Retry Call
                </button>
              )}
              {m.lastCallStatus === 'picked' && (
                <button
                  className="icon-button"
                  onClick={() => toggleMute(m._id, m.isMuted)}
                >
                  {m.isMuted ? '🔊 Unmute' : '🔇 Mute'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CallGroup
