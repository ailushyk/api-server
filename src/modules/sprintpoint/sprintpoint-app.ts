import { Server as WebSocketServer } from 'ws'

export const setupSprintPointWebSocket = async (wss: WebSocketServer) => {
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message)
    })

    ws.send('Sprint Point WebSocket Connected')
  })
}
