import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { setupSprintPointWebSocket } from '#sprintpoint/sprintpoint-ws.ts'
import { WebSocketServer } from 'ws'

export async function setupWebSockets(
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
) {
  const wss = new WebSocketServer({ server })

  // Set up WebSocket connections for sprintpoint module
  await setupSprintPointWebSocket(wss)

  return wss
}
