import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { connectUser } from './socket/user'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

export type IO = ReturnType<typeof io.of>

app.get('/', (_req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
  // Registering socket events
  connectUser(io, socket)
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
