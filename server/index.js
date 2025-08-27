const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')

// Socket.IO
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
})

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://realtime-callapp.onrender.com',
      
      'https://real-time-call-app-gzoz.vercel.app/',
    ],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// DB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kkm'

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  })

// Socket.IO events
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id)
  })
})

// Expose io to controllers
app.set('io', io)

// Routes
app.get('/', (req, res) => res.json({ message: 'API running 🚀' }))

const memberRoutes = require('./routes/memberRoutes')
const callRoutes = require('./routes/callRoutes')

app.use('/members', memberRoutes)
app.use('/calls', callRoutes) // TwiML route should be inside callRoutes.js

// Start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
)
