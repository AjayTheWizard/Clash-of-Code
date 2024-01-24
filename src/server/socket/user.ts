import { Server, Socket } from 'socket.io'

export function connectUser(io: Server, socket: Socket): void {
  console.log(`connect ${socket.id}`)

  socket.on('disconnect', (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`)
  })

  socket.on('message', (msg) => {
    console.log('message: ' + msg)
    io.emit('message', msg)
  })
}
