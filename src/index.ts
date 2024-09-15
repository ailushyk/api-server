import http from 'node:http'

import { setupWebSockets } from '@/websocket'

import { setupApp } from './app'

const PORT = process.env.PORT || 3000
const app = setupApp()
const server = http.createServer(app)
await setupWebSockets(server)

server.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
