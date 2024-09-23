import http from 'node:http'
import { setupApp } from '#app.ts'

const PORT = process.env.PORT || 3000
const app = setupApp()
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
