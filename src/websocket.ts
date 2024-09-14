import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { WebSocketServer } from 'ws'

import { setupSprintPointWebSocket } from '@/modules/sprintpoint/sprintpoint-app'

export async function setupWebSocketServer(
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
) {
  const wss = new WebSocketServer({ server })

  // Set up WebSocket connections for sprintpoint module
  await setupSprintPointWebSocket(wss)

  // Handle other WebSocket connections or setups if needed

  return wss
}
