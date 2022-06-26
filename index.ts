import { createWebSocketStream, WebSocketServer } from 'ws'
import { getMousePos } from 'robotjs'
import { httpServer } from './src/http_server/index'
import * as _ from './src/modules'

const HTTP_PORT = 3000
const SOCKET_PORT = 8080

httpServer.listen(HTTP_PORT, () => console.log(`Start static http server on the ${HTTP_PORT} port!\nStart web socket server on the ${SOCKET_PORT} port!`))

const wss = new WebSocketServer({ port: SOCKET_PORT })

wss.on('headers', (parameters: string[]) => console.log('Websocket parameters', parameters))

wss.on('connection', ws => {
  const duplex = createWebSocketStream(ws, {encoding: 'utf-8', decodeStrings: false})

  duplex.write('not_found\0', 'utf-8')

  duplex.on('data', async (data: Buffer) => {
    const [command, w, l] = data.toString().split(' ')

    let { x, y }: { x: number; y: number } = getMousePos()
    const width: number = Number(w)
    const length: number = Number(l)
    const x1: number = x
    const y1: number = y

    switch (command) {
      case 'mouse_up':
        _.mainWrapper(command, duplex, _.moveCursorUp(x, y, width))

        break
      case 'mouse_down':
        _.mainWrapper(command, duplex, _.moveCursorDown(x, y, width))

        break
      case 'mouse_left':
        _.mainWrapper(command, duplex, _.moveCursorLeft(x, y, width))

        break
      case 'mouse_right':
        _.mainWrapper(command, duplex, _.moveCursorRight(x, y, width))

        break
      case 'mouse_position':
        _.mainWrapper(command, duplex, undefined, duplex.write(`${command} ${x},${y}\0`, 'utf-8'))

        break
      case 'draw_circle':
        _.mainWrapper(command, duplex, _.drawCircle(x, x1, y, y1, width))

        break
      case 'draw_rectangle':
        _.mainWrapper(command, duplex, _.drawRectangle(x1, y, y1, width, length))

        break
      case 'draw_square':
        _.mainWrapper(command, duplex, _.drawSquare(x1, y, y1, width))

        break
      case 'prnt_scrn':
        _.mainWrapper(command, duplex, await _.takeScreenshot(x, y, duplex, command), undefined, true)

        break
    }
  })

  duplex.on('close', () => {
    process.stdout.write('Closing websocket connection...')
    ws.close()
  })
})

process.on('SIGINT', () => {
  process.stdout.write('Closing websocket connection...')
  wss.close()
  process.exit()
})
