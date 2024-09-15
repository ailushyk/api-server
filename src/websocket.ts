import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { WebSocketServer } from 'ws'

import { setupSprintPointWebSocket } from '@/apps/sprintpoint/api/sprintpoint-ws'

export async function setupWebSockets(
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
) {
  const wss = new WebSocketServer({ server })

  // Set up WebSocket connections for sprintpoint module
  await setupSprintPointWebSocket(wss)

  return wss
}
