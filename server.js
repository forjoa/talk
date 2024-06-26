import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';
const hostname = process.env.NEXT_PUBLIC_HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('a user is connected')

    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('chat message', ({ room, msg }) => {
      io.to(room).emit('chat message', msg)
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
