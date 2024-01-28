import express from 'express'
import http from 'http'
import cors from 'cors'

import { Server } from 'socket.io'
import { connectUser } from './socket/user'

const app = express()

// Middlewares
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Socket.io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

export type IO = ReturnType<typeof io.of>

io.on('connection', (socket) => {
  // Registering socket events
  connectUser(io, socket)
})

// Routes

app.get('/', (_req, res) => {
  res.send('<h1>Hello world</h1>')
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
