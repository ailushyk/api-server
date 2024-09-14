import http from 'node:http'

import { setupWebSocketServer } from '@/websocket'

import app from './app'

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

await setupWebSocketServer(server)

server.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
